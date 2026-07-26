"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar relative rounded-2xl border border-white/10 bg-[oklch(0.13_0.03_265)]/80 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl [--cell-size:2.5rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-6 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 transition-colors duration-300 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 transition-colors duration-300 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus:border-[oklch(0.78_0.15_85)] border-white/10 shadow-xs has-focus:ring-[oklch(0.78_0.15_85)]/40 has-focus:ring-[3px] relative rounded-md bg-white/5 backdrop-blur-md",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-display text-sm font-bold uppercase tracking-[0.2em] text-white",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-white/40 flex h-8 items-center gap-1 rounded-md border border-white/10 bg-white/5 pl-2 pr-1 text-sm transition-colors hover:bg-white/10 [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-white/40 flex-1 select-none rounded-md text-[10px] font-bold uppercase tracking-[0.2em]",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-white/30 select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-full [&:last-child[data-selected=true]_button]:rounded-r-full",
          defaultClassNames.day,
        ),
        range_start: cn("bg-[oklch(0.78_0.15_85)]/20 rounded-l-full", defaultClassNames.range_start),
        range_middle: cn("bg-[oklch(0.78_0.15_85)]/10 rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-[oklch(0.78_0.15_85)]/20 rounded-r-full", defaultClassNames.range_end),
        today: cn(
          "ring-1 ring-inset ring-[oklch(0.78_0.15_85)]/40 rounded-full text-[oklch(0.86_0.13_88)] data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-white/20 aria-selected:text-white/20",
          defaultClassNames.outside,
        ),
        disabled: cn("text-white/20 opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4 text-white/50 transition-colors hover:text-white", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4 text-white/50 transition-colors hover:text-white", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4 text-white/50 transition-colors hover:text-white", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center text-white/30">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-[oklch(0.78_0.15_85)] data-[selected-single=true]:text-[oklch(0.15_0.03_265)] data-[selected-single=true]:shadow-[0_8px_20px_-6px_oklch(0.78_0.15_85)] data-[range-middle=true]:bg-[oklch(0.78_0.15_85)]/15 data-[range-middle=true]:text-white data-[range-middle=true]:rounded-none data-[range-start=true]:bg-[oklch(0.78_0.15_85)] data-[range-start=true]:text-[oklch(0.15_0.03_265)] data-[range-start=true]:rounded-l-full data-[range-end=true]:bg-[oklch(0.78_0.15_85)] data-[range-end=true]:text-[oklch(0.15_0.03_265)] data-[range-end=true]:rounded-r-full group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[oklch(0.78_0.15_85)]/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none transition-all duration-300 hover:bg-white/5 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };