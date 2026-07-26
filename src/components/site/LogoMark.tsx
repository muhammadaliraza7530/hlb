import { HLB } from "@/data/hlb";

export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-[oklch(0.14_0.03_265)] p-1.5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.55)] ring-1 ring-[oklch(0.78_0.15_85)]/40 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={HLB.logo}
        alt={HLB.brand}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </span>
  );
}

export function LogoWatermark({ size = 34 }: { size?: number }) {
  return (
    <div
      className="pointer-events-none absolute left-3 top-3 z-20 rounded-lg bg-[oklch(0.14_0.03_265)]/90 p-1 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.6)] ring-1 ring-[oklch(0.78_0.15_85)]/40 backdrop-blur-sm sm:left-4 sm:top-4"
    >
      <img
        src={HLB.logo}
        alt={HLB.brand}
        className="block rounded-md object-contain"
        style={{ width: size, height: size }}
        draggable={false}
      />
    </div>
  );
}
