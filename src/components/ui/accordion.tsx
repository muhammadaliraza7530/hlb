import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[oklch(0.58_0.14_248)]/30 data-[state=open]:border-[oklch(0.58_0.14_248)]/50 data-[state=open]:bg-white/[0.04]",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between px-6 py-5 text-left font-display text-lg font-bold tracking-tight text-white/80 transition-colors hover:text-[oklch(0.72_0.12_245)] focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[oklch(0.58_0.14_248)]/40 [&[data-state=open]>div>svg]:rotate-45 [&[data-state=open]]:text-[oklch(0.72_0.12_245)]",
        className
      )}
      {...props}
    >
      {children}
      <div className="ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-[oklch(0.72_0.12_245)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[oklch(0.58_0.14_248)]/50">
        <Plus className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="grid overflow-hidden text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
    {...props}
  >
    {/* Inner wrapper required for the grid-template-rows animation trick */}
    <div className="overflow-hidden">
      <div className={cn("px-6 pb-6 pt-0 text-base leading-relaxed text-white/50", className)}>
        {children}
      </div>
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };