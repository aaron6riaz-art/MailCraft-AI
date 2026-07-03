"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const SAMPLE_EMAIL = `Hi Priya,

Thanks so much for your patience while we finalized the Q3 proposal. I've attached the updated version with the revised timeline we discussed.

Could we grab 15 minutes this week to walk through it together?

Best regards,
Alex`;

/**
 * Signature element: a live "typing" preview of an email being written,
 * looping on an interval. This is the single characteristic, memorable
 * moment on the page — everything else stays quiet around it.
 */
function TypingPreview() {
  const [displayed, setDisplayed] = React.useState("");
  const [phase, setPhase] = React.useState<"typing" | "pause" | "erasing">("typing");

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < SAMPLE_EMAIL.length) {
        timeout = setTimeout(() => {
          setDisplayed(SAMPLE_EMAIL.slice(0, displayed.length + 1));
        }, 18);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 2200);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("erasing"), 1200);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 8);
      } else {
        timeout = setTimeout(() => setPhase("typing"), 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase]);

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-canvas p-6 text-left shadow-soft-lg">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs font-medium text-muted">
          Q3 proposal follow-up.txt
        </span>
      </div>
      <pre className="min-h-[180px] whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-ink">
        {displayed}
        <span className="typing-caret animate-caret-blink h-4 w-[2px] translate-y-[2px]" />
      </pre>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-brand-subtle px-3 py-1 text-xs font-medium text-brand">
          <Sparkles className="h-3.5 w-3.5" />
          AI-drafted, in your voice
        </div>

        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Write professional emails in seconds with AI.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Generate clear, professional, and personalized emails for work, school,
          or business in just a few clicks.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#generator">
            <Button size="lg">Generate Email</Button>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl animate-fade-up">
        <TypingPreview />
      </div>
    </section>
  );
}
