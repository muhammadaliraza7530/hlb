import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { celebrate } from "@/lib/confetti";
import { LogoWatermark } from "./LogoMark";

export type Project = { img: string; title: string; tag: string };

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [cardW, setCardW] = useState(300);
  const gap = 20;
  const step = cardW + gap;
  const singleLen = step * projects.length;
  const x = useMotionValue(0);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);
  const speedPxPerSec = 150;

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 640) setCardW(260);
      else if (w < 1024) setCardW(320);
      else setCardW(380);
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      if (!draggingRef.current) {
        let v = x.get() - speedPxPerSec * dt;
        if (v <= -singleLen) v += singleLen;
        x.set(v);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastTsRef.current = null; };
  }, [x, singleLen]);

  const doubled = [...projects, ...projects];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[oklch(0.14_0.03_265)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[oklch(0.14_0.03_265)] to-transparent sm:w-24" />
      <motion.div
        className="flex touch-pan-y select-none"
        style={{ x, gap: `${gap}px`, willChange: "transform" }}
        drag="x" dragMomentum={false} dragElastic={0.04}
        onDragStart={() => { draggingRef.current = true; }}
        onDrag={() => {
          let v = x.get();
          if (v <= -singleLen * 1.5) v += singleLen;
          if (v > singleLen * 0.5) v -= singleLen;
          x.set(v);
        }}
        onDragEnd={(_, info) => {
          const vx = info.velocity.x;
          const target = x.get() + vx * 0.25;
          animate(x, target, {
            type: "inertia", velocity: vx, power: 0.32, timeConstant: 320, restDelta: 0.5,
            onComplete: () => { draggingRef.current = false; },
          });
        }}
      >
        {doubled.map((p, i) => (
          <button
            key={`${p.title}-${i}`}
            onClick={(e) => celebrate(e.clientX, e.clientY)}
            className="group relative shrink-0 overflow-hidden rounded-2xl border border-[oklch(0.78_0.15_85)]/30 bg-[oklch(0.19_0.04_265)] text-left transition-shadow duration-500 hover:border-[oklch(0.78_0.15_85)]/70 hover:shadow-[0_0_40px_-6px_oklch(0.78_0.15_85/0.55)]"
            style={{ width: cardW, height: cardW * 1.25 }}
          >
            <img src={p.img} alt={p.title} loading="lazy" decoding="async" draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.08]" />
            <LogoWatermark size={32} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.86_0.13_88)]">{p.tag}</div>
              <div className="mt-2 font-display text-lg leading-tight text-white sm:text-xl">{p.title}</div>
              <div className="mt-3 h-px w-0 bg-[oklch(0.78_0.15_85)] transition-all duration-700 group-hover:w-16" />
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
