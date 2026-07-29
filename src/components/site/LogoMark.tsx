import { HLB } from "@/data/hlb";

export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.20_0.02_265)] to-[oklch(0.10_0.01_265)] p-[5px] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/10 h-12 w-12 sm:h-[var(--logo-size)] sm:w-[var(--logo-size)] ${className}`}
      style={{ "--logo-size": `${size}px` } as React.CSSProperties}
    >
      {/* Subtle top-down light glint */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent" />
      
      {/* Inner gold ring */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[oklch(0.78_0.15_85)]/30" />
      
      <img
        src={HLB.logo}
        alt={HLB.brand}
        className="relative h-full w-full rounded-xl object-contain"
        draggable={false}
      />
    </span>
  );
}