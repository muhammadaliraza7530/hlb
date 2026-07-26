import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { celebrate } from "@/lib/confetti";
import { LogoWatermark } from "./LogoMark";

export type Project = { img: string; title: string; tag: string; alt?: string };

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [cardW, setCardW] = useState(320);
  const gap = 24;
  const step = cardW + gap;
  const singleLen = step * projects.length;
  const x = useMotionValue(0);
  
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false); // Pauses auto-scroll on hover
  const lastTsRef = useRef<number | null>(null);
  
  const speedPxPerSec = 120; // Slightly slower for a more cinematic feel

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 640) setCardW(280);
      else if (w < 1024) setCardW(340);
      else setCardW(400);
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts; // Always update timestamp to prevent jumping after pause
      
      if (!draggingRef.current && !pausedRef.current) {
        let v = x.get() - speedPxPerSec * dt;
        if (v <= -singleLen) v += singleLen;
        x.set(v);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { 
      if (rafRef.current) cancelAnimationFrame(rafRef.current); 
      lastTsRef.current = null; 
    };
  }, [x, singleLen]);

  const doubled = [...projects, ...projects];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Widened, smoother fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[oklch(0.13_0.03_265)] via-[oklch(0.13_0.03_265)]/80 to-transparent sm:w-40 md:w-52" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[oklch(0.13_0.03_265)] via-[oklch(0.13_0.03_265)]/80 to-transparent sm:w-40 md:w-52" />
      
      <motion.div
        className="flex touch-pan-y select-none"
        style={{ x, gap: `${gap}px`, willChange: "transform" }}
        drag="x" 
        dragMomentum={false} 
        dragElastic={0.04}
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
            type: "inertia", 
            velocity: vx, 
            power: 0.32, 
            timeConstant: 320, 
            restDelta: 0.5,
            onComplete: () => { draggingRef.current = false; },
          });
        }}
      >
        {doubled.map((p, i) => (
          <button
            key={`${p.title}-${i}`}
            onClick={(e) => celebrate(e.clientX, e.clientY)}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
            className="group relative shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[oklch(0.13_0.03_265)] text-left shadow-[0_24px_80px_-40px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[oklch(0.78_0.15_85)]/50 hover:shadow-[0_28px_90px_-34px_rgba(0,0,0,0.6)]"
            style={{ width: cardW, height: cardW * 1.25 }}
          >
            <div className="absolute inset-0 bg-[oklch(0.14_0.03_265)]/75" />
            <img 
              src={p.img} 
              alt={p.alt ?? p.title} 
              loading="lazy" 
              decoding="async" 
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain object-center bg-[oklch(0.14_0.03_265)] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" 
            />
            
            {/* Inner Border Ring for premium depth */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
            
            <LogoWatermark size={28} />
            
            {/* Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[oklch(0.86_0.13_88)] backdrop-blur-sm">
                {p.tag}
              </div>
              <div className="mt-3 font-display text-xl font-black leading-tight tracking-tight text-white drop-shadow-lg sm:text-2xl">
                {p.title}
              </div>
              <div className="mt-4 h-[2px] w-14 rounded-full bg-[oklch(0.78_0.15_85)] transition-all duration-500 ease-out" />
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
}