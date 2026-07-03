import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    features: ["5 emails / month", "All tones & lengths", "5 languages"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "€5",
    period: "/ month",
    features: ["Unlimited emails", "Saved templates", "Email history", "Priority generation"],
    highlighted: true,
  },
];

/** Placeholder pricing section — no billing wired up yet, see README for Stripe setup. */
export function PricingPlaceholder() {
  return (
    <section id="pricing" className="bg-surface px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Simple pricing
          </h2>
          <p className="mt-3 text-muted">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 shadow-soft ${
                plan.highlighted
                  ? "border-brand bg-canvas ring-1 ring-brand"
                  : "border-border bg-canvas"
              }`}
            >
              <h3 className="font-display text-lg font-semibold text-ink">{plan.name}</h3>
              <p className="mt-2">
                <span className="font-display text-3xl font-semibold text-ink">{plan.price}</span>
                <span className="text-sm text-muted"> {plan.period}</span>
              </p>
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink">
                    <Check className="h-4 w-4 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? "default" : "outline"}
                className="mt-8 w-full"
                disabled
              >
                {plan.highlighted ? "Coming soon" : "Current plan"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
