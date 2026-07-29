import { HLB } from "@/data/hlb";

export function LogoWatermark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute right-4 top-4 inline-flex h-[var(--logo-watermark-size)] w-[var(--logo-watermark-size)] items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ${className}`}
      style={{ "--logo-watermark-size": `${size}px` } as React.CSSProperties}
    >
      <img
        src={HLB.logo}
        alt="HLB"
        className="h-3/4 w-3/4 object-contain opacity-80"
        draggable={false}
      />
    </span>
  );
}
