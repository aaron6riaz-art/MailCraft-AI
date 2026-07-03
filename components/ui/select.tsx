import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Lightweight styled native <select>. Avoids extra dependencies while still
 * matching the shadcn/ui visual language, and stays fully keyboard/screen-reader
 * accessible for free since it's a real <select>.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-11 w-full appearance-none rounded-xl border border-border bg-canvas px-4 pr-10 text-sm text-ink transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
