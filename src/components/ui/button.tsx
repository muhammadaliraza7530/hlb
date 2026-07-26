import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[11px] font-bold uppercase tracking-[0.2em] cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.15_85)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[oklch(0.78_0.15_85)] text-[oklch(0.15_0.03_265)] shadow-[0_8px_20px_-8px_oklch(0.78_0.15_85)] hover:bg-[oklch(0.86_0.13_88)] hover:shadow-[0_12px_25px_-8px_oklch(0.78_0.15_85)]",
        destructive:
          "bg-red-500/10 text-red-300 border border-red-500/30 backdrop-blur-md hover:bg-red-500/20 hover:border-red-500/50",
        outline:
          "border border-white/15 bg-white/5 text-white/80 backdrop-blur-md hover:bg-white/10 hover:border-white/30 hover:text-white",
        secondary:
          "bg-white/10 text-white border border-white/10 hover:bg-white/15",
        ghost:
          "text-white/70 hover:bg-white/5 hover:text-white",
        link:
          "text-[oklch(0.86_0.13_88)] underline-offset-4 hover:text-white hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-[10px] tracking-[0.15em]",
        lg: "h-12 px-8 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };