import { Languages, Sliders, ShieldCheck, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant drafts",
    description: "Go from a rough idea to a polished email in seconds, not minutes.",
  },
  {
    icon: Sliders,
    title: "Tone & length control",
    description: "Dial in the exact tone, length, and recipient for every message.",
  },
  {
    icon: Languages,
    title: "Multiple languages",
    description: "Write in English, Dutch, French, German, or Spanish.",
  },
  {
    icon: ShieldCheck,
    title: "Sticks to the facts",
    description: "MailCraft never invents details — it only uses what you give it.",
  },
];

export function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Everything you need to write faster
          </h2>
          <p className="mt-3 text-muted">
            A focused toolkit for emails that sound like you, not a template.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-canvas p-6 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
