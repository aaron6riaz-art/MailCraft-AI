import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
            <Mail className="h-3.5 w-3.5" />
          </span>
          MailCraft AI
        </Link>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} MailCraft AI. Write better emails, faster.
        </p>
        <div className="flex gap-6 text-sm text-muted">
          <a href="#pricing" className="hover:text-ink">Pricing</a>
          <a href="#login" className="hover:text-ink">Login</a>
          <a href="#generator" className="hover:text-ink">Generator</a>
        </div>
      </div>
    </footer>
  );
}
