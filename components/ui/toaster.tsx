"use client";

import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const icons = {
  default: Info,
  success: CheckCircle2,
  error: XCircle,
};

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 sm:bottom-6 sm:items-end sm:pr-6">
      {toasts.map((t) => {
        const Icon = icons[t.variant ?? "default"];
        return (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-border bg-canvas p-4 shadow-soft-lg animate-fade-up"
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0",
                t.variant === "success" && "text-emerald-500",
                t.variant === "error" && "text-red-500",
                (!t.variant || t.variant === "default") && "text-brand"
              )}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">{t.title}</p>
              {t.description && <p className="text-xs text-muted">{t.description}</p>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="text-muted hover:text-ink"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
