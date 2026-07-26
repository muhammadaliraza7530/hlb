import { animate, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { celebrate } from "@/lib/confetti";
import { LogoWatermark } from "./LogoMark";
import { PROJECTS } from "@/data/hlb";

const slides = PROJECTS;
const N = slides.length;
const getDragUnit = (gap: number) => Math.max(54, gap * 0.84);
const getNearestTarget = (current: number, index: number) => {
  const loop = Math.round(current / N) * N;
  return [loop + index - N, loop + index, loop + index + N].reduce((b, t) =>
    Math.abs(t - current) < Math.abs(b - current) ? t : b);
};

function Card({ slide, index, posMV, gap, onSelect }: {
  slide: (typeof slides)[number]; index: number;
  posMV: ReturnType<typeof useMotionValue<number>>; gap: number;
  onSelect: (i: number) => void;
}) {
  const rawOffset = useTransform(posMV, (p) => {
    let d = index - p;
    d = ((d + N / 2) % N + N) % N - N / 2;
    return d;
  });
  const x = useTransform(rawOffset, (d) => d * gap);
  const rotate = useTransform(rawOffset, (d) => d * 4.2);
  const scale = useTransform(rawOffset, (d) => Math.max(0.58, 1 - Math.abs(d) * 0.085));
  const yShift = useTransform(rawOffset, (d) => Math.abs(d) * 13);
  const opacity = useTransform(rawOffset, (d) => Math.max(0.82, 1 - Math.max(0, Math.abs(d) - 2.7) * 0.08));
  const zIndex = useTransform(rawOffset, (d) => Math.round(100 - Math.abs(d) * 10));
  const blur = useTransform(rawOffset, (d) => `blur(${Math.min(2.5, Math.max(0, Math.abs(d) - 1.2) * 0.9)}px)`);
  const centerT = useTransform(rawOffset, (d) => Math.max(0, 1 - Math.abs(d) * 1.6));
  const shadow = useTransform(centerT, (t) =>
    `0 0 0 1px oklch(0.86 0.13 88 / ${0.45 * t}), 0 0 34px -3px oklch(0.86 0.13 88 / ${0.62 * t})`);

  return (
    <motion.button
      type="button"
      onClick={(e) => { onSelect(index); celebrate(e.clientX, e.clientY); }}
      className="absolute left-1/2 top-1/2 rounded-2xl outline-none"
      style={{ x, y: yShift, rotate, scale, opacity, zIndex, filter: blur,
        translateX: "-50%", translateY: "-50%", willChange: "transform, filter, opacity" }}
    >
      <div className="relative h-[68vw] max-h-[360px] min-h-[265px] w-[68vw] max-w-[300px] sm:h-[400px] sm:w-[310px] sm:max-w-[330px] md:h-[460px] md:w-[350px] md:max-w-[350px]">
        <motion.div aria-hidden className="pointer-events-none absolute -inset-[10px] rounded-[22px]"
          style={{ opacity: centerT,
            background: "radial-gradient(60% 55% at 50% 50%, oklch(0.86 0.13 88 / 0.58), transparent 72%)",
            filter: "blur(18px)" }} />
        <motion.div className="relative h-full w-full overflow-hidden rounded-2xl" style={{ boxShadow: shadow }}>
          <img src={slide.img} alt={slide.title}
            className="h-full w-full select-none object-cover" draggable={false}
            loading={index === 0 ? "eager" : "lazy"} decoding="async" />
          <LogoWatermark size={26} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-center">
            <div className="font-display text-lg font-bold leading-tight text-white sm:text-xl">{slide.title}</div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[oklch(0.86_0.13_88)] sm:text-[11px] sm:tracking-[0.28em]">
              {slide.tag}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
}

export function HeroCarousel() {
  const pos = useMotionValue(2);
  const smooth = useSpring(pos, { damping: 42, stiffness: 280, mass: 0.48 });
  const [active, setActive] = useState(2);
  const [gap, setGap] = useState(72);
  const draggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const activeRef = useRef(2);
  const autoTimerRef = useRef<number | undefined>(undefined);
  const autoControlsRef = useRef<ReturnType<typeof animate> | undefined>(undefined);
  const queueAutoRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const syncGap = () => setGap(window.innerWidth < 640 ? 68 : window.innerWidth < 1024 ? 82 : 92);
    syncGap();
    window.addEventListener("resize", syncGap, { passive: true });
    return () => window.removeEventListener("resize", syncGap);
  }, []);

  useEffect(() => {
    let stopped = false;
    const queueNext = () => {
      if (stopped) return;
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = window.setTimeout(() => {
        if (stopped) return;
        if (draggingRef.current) { queueNext(); return; }
        const target = Math.round(pos.get()) + 1;
        autoControlsRef.current?.stop();
        autoControlsRef.current = animate(pos, target, {
          duration: 1.52, ease: [0.25, 0.1, 0.25, 1], onComplete: queueNext,
        });
      }, 720);
    };
    queueAutoRef.current = queueNext;
    queueNext();
    return () => { stopped = true; window.clearTimeout(autoTimerRef.current); autoControlsRef.current?.stop(); };
  }, [pos]);

  useMotionValueEvent(smooth, "change", (v) => {
    const idx = ((Math.round(v) % N) + N) % N;
    if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); }
  });

  const onSelect = (i: number) => {
    if (draggingRef.current || i === active) return;
    autoControlsRef.current?.stop();
    animate(pos, getNearestTarget(pos.get(), i), { type: "spring", damping: 34, stiffness: 120, mass: 0.7 });
    queueAutoRef.current();
  };

  return (
    <div className="relative h-[58vh] min-h-[410px] w-full select-none sm:h-[68vh] sm:min-h-[520px]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(50%_60%_at_50%_100%,oklch(0.86_0.13_88_/_0.2),transparent_70%)]" />
      <motion.div
        className="absolute inset-0 touch-pan-y cursor-grab active:cursor-grabbing"
        drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.08} dragMomentum={false}
        onDragStart={() => { draggingRef.current = true; window.clearTimeout(autoTimerRef.current);
          autoControlsRef.current?.stop(); dragStartRef.current = pos.get(); }}
        onDrag={(_, info) => {
          const raw = -info.offset.x / getDragUnit(gap);
          const capped = Math.max(-N * 1.2, Math.min(N * 1.2, raw));
          pos.set(dragStartRef.current + capped);
        }}
        onDragEnd={(_, info) => {
          const dx = info.offset.x; const vx = info.velocity.x;
          const direction = dx < 0 || vx < 0 ? 1 : -1;
          const unit = getDragUnit(gap);
          const dragSteps = -dx / unit; const velocitySteps = -vx / 1250;
          const wantsMove = Math.abs(dx) > 28 || Math.abs(vx) > 260;
          let target = Math.round(dragStartRef.current + dragSteps + velocitySteps);
          if (wantsMove && target === Math.round(dragStartRef.current)) target += direction;
          const maxTravel = wantsMove
            ? Math.min(N - 1, Math.max(1, Math.ceil(Math.abs(dx) / unit) + Math.floor(Math.abs(vx) / 850)))
            : 0;
          const start = Math.round(dragStartRef.current);
          target = start + Math.max(-maxTravel, Math.min(maxTravel, target - start));
          animate(pos, target, { type: "spring", damping: 40, stiffness: 260, mass: 0.48,
            restDelta: 0.001, restSpeed: 0.001,
            onComplete: () => { draggingRef.current = false; queueAutoRef.current(); } });
        }}
      >
        {slides.map((s, i) => (
          <Card key={i} slide={s} index={i} posMV={smooth} gap={gap} onSelect={onSelect} />
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center gap-1.5">
        {slides.map((_, i) => (
          <span key={i} className={`h-[3px] rounded-full transition-all duration-700 ${
            i === active ? "w-10 bg-[oklch(0.86_0.13_88)]" : "w-3 bg-white/20"
          }`} />
        ))}
      </div>
    </div>
  );
}
