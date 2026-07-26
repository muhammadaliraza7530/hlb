import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1700,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.2, margin: "0px 0px 280px 0px", once: false });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) { setDisplay(0); return; }
    let raf = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - startedAt) / duration);
      setDisplay(Math.round(value * easeOutExpo(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, inView, value]);

  return <span ref={ref} aria-label={`${value}${suffix}`}>{display}{suffix}</span>;
}
