import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.15_85)]/40",
  {
    variants: {
      variant: {
        default: "border-[oklch(0.78_0.15_85)]/30 bg-[oklch(0.78_0.15_85)]/10 text-[oklch(0.86_0.13_88)] hover:bg-[oklch(0.78_0.15_85)]/20",
        secondary: "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
        destructive: "border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20",
        outline: "border-white/15 text-white/60 hover:border-white/30 hover:text-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };