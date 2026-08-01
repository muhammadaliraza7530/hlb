import { HLB } from "@/data/hlb";

export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-[5px] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] h-16 sm:h-[var(--logo-size)] w-auto ${className}`}
      style={{ "--logo-size": `${size}px` } as React.CSSProperties}
    >
      {/* Subtle top-down light glint */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent" />

      <img
        src={HLB.logo}
        alt={HLB.brand}
        className="relative h-full w-auto rounded-xl object-contain"
        draggable={false}
      />
    </span>
  );
}
