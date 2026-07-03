"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <Mail className="h-4 w-4" />
          </span>
          MailCraft AI
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <a href="#features" className="transition-colors hover:text-ink">
            Features
          </a>
          <a href="#pricing" className="transition-colors hover:text-ink">
            Pricing
          </a>
          <a href="#login" className="transition-colors hover:text-ink">
            Login
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#generator">
            <Button size="sm">Try Free</Button>
          </a>
        </div>
      </nav>
    </header>
  );
}
