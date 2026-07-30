import { animate, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { celebrate } from "@/lib/confetti";
import { LogoWatermark } from "./LogoWatermark";
import { PROJECTS } from "@/data/hlb";

const slides = PROJECTS;
const N = slides.length;
const getDragUnit = (gap: number) => Math.max(54, gap * 0.84);
const getNearestTarget = (current: number, index: number) => {
  const loop = Math.round(current / N) * N;
  return [loop + index - N, loop + index, loop + index + N].reduce((b, t) =>
    Math.abs(t - current) < Math.abs(b - current) ? t : b);
};

function Card({ slide, index, posMV, gap, onSelect, isActive }: {
  slide: (typeof slides)[number]; index: number;
  posMV: ReturnType<typeof useMotionValue<number>>; gap: number;
  onSelect: (i: number) => void; isActive: boolean;
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
  
  // Enhanced shadow to make the active card pop more dramatically
  const shadow = useTransform(centerT, (t) =>
    `0 0 0 1px oklch(0.72 0.12 245 / ${0.5 * t}), 0 20px 50px -12px oklch(0.72 0.12 245 / ${0.5 * t}), 0 30px 60px -20px black/70`);

  return (
    <motion.button
      type="button"
      onClick={(e) => { onSelect(index); celebrate(e.clientX, e.clientY); }}
      className="absolute left-1/2 top-1/2 rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.12_245)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{ x, y: yShift, rotate, scale, opacity, zIndex, filter: blur,
        translateX: "-50%", translateY: "-50%", willChange: "transform, filter, opacity" }}
    >
      <div className="relative h-[68vw] max-h-[360px] min-h-[265px] w-[68vw] max-w-[300px] sm:h-[420px] sm:w-[320px] sm:max-w-[330px] md:h-[480px] md:w-[360px] md:max-w-[360px]">
        {/* Glow Background */}
        <motion.div aria-hidden className="pointer-events-none absolute -inset-[12px] rounded-[2rem]"
          style={{ opacity: centerT,
            background: "radial-gradient(60% 55% at 50% 50%, oklch(0.72 0.12 245 / 0.6), transparent 70%)",
            filter: "blur(20px)" }} />
        
        {/* Card Container */}
        <motion.div className="group relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10" style={{ boxShadow: shadow }}>
          <img 
            src={slide.img} 
            alt={slide.title}
            className={`h-full w-full select-none object-cover transition-transform duration-[1.2s] ease-out ${isActive ? 'scale-100' : 'scale-105'}`}
            draggable={false}
            loading={index === 0 ? "eager" : "lazy"} 
            decoding="async" 
          />
          
          {/* Inner Border Ring for premium depth */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
          
          <LogoWatermark size={28} />
          
          {/* Gradient Overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Text Content */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-8">
            <div className="font-display text-xl font-black uppercase tracking-tight text-white drop-shadow-lg sm:text-2xl">
              {slide.title}
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.72_0.12_245)] sm:text-[11px]">
              <span className="h-1 w-1 rounded-full bg-[oklch(0.72_0.12_245)]" />
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

  const onSelect = (i: number, triggerConfetti: boolean = true) => {
    if (draggingRef.current || i === active) return;
    autoControlsRef.current?.stop();
    animate(pos, getNearestTarget(pos.get(), i), { type: "spring", damping: 34, stiffness: 120, mass: 0.7 });
    queueAutoRef.current();
    
    // Trigger confetti only if clicked directly on a card
    if (triggerConfetti) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      celebrate(centerX, centerY);
    }
  };

  return (
    <div className="relative h-[60vh] min-h-[420px] w-full select-none sm:h-[72vh] sm:min-h-[540px]">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(50%_60%_at_50%_100%,oklch(0.72_0.12_245_/_0.15),transparent_70%)]" />
      
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
          <Card 
            key={i} 
            slide={s} 
            index={i} 
            posMV={smooth} 
            gap={gap} 
            onSelect={(idx) => onSelect(idx, true)} 
            isActive={i === active}
          />
        ))}
      </motion.div>

      {/* Interactive Progress Dots */}
      <div className="absolute inset-x-0 bottom-8 z-30 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i, false)}
            className={`h-2 rounded-full transition-all duration-500 ease-out hover:opacity-80 ${
              i === active 
                ? "w-10 bg-[oklch(0.72_0.12_245)] shadow-[0_0_10px_oklch(0.72_0.12_245)]" 
                : "w-2 bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}