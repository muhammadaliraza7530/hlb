import { HLB } from "@/data/hlb";

export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.20_0.02_265)] to-[oklch(0.10_0.01_265)] p-[5px] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/10 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Subtle top-down light glint for a premium metallic feel */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent" />
      
      {/* Inner gold ring to match brand identity */}
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

export function LogoWatermark({ size = 34 }: { size?: number }) {
  return (
    <div
      className="pointer-events-none absolute left-3 top-3 z-20 overflow-hidden rounded-xl border border-white/10 bg-[oklch(0.15_0.03_265)]/50 p-[5px] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/5 backdrop-blur-xl sm:left-4 sm:top-4"
    >
      {/* Metallic Glint */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
      
      {/* Inner Gold Ring */}
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-[oklch(0.78_0.15_85)]/40" />

      <img
        src={HLB.logo}
        alt={HLB.brand}
        className="relative block rounded-lg object-contain"
        style={{ width: size, height: size }}
        draggable={false}
      />
    </div>
  );
}