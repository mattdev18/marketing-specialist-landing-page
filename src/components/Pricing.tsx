import { ArrowRight, Check, Star } from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Pricing — [PRICE] placeholders for Matthew to fill before launch.
   Every plan routes to the free strategy call / inquiry form.
------------------------------------------------------------------ */

const PLANS = [
  {
    name: "Email & SMS Growth Retainer",
    tagline: "Your lifecycle marketing, handled end-to-end.",
    price: "[PRICE]",
    unit: "/month",
    highlight: true,
    features: [
      "Monthly campaign calendar (Klaviyo or Mailchimp)",
      "Flows built & optimized: welcome, cart, post-purchase, win-back",
      "Segmentation, A/B testing & send-time optimization",
      "Clear monthly performance report",
      "Priority support via Slack or email",
    ],
  },
  {
    name: "Store / Website Build",
    tagline: "A fast, conversion-focused home for your brand.",
    price: "[PRICE]",
    unit: " one-time",
    highlight: false,
    features: [
      "Shopify or WordPress design & build",
      "Mobile-first, optimized for speed",
      "Klaviyo email capture integrated",
      "Launch checklist & handover walkthrough",
      "Two weeks of post-launch support",
    ],
  },
  {
    name: "Ad-hoc & VA Support",
    tagline: "Flexible hours for the things piling up.",
    price: "[PRICE]",
    unit: "/month",
    highlight: false,
    features: [
      "Mailchimp campaigns, product uploads & site updates",
      "Inbox, data & reporting support",
      "QA pass on your existing flows & campaigns",
      "Bank of hours — use on whatever moves the needle",
    ],
  },
] as const;

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-forest">Pricing</p>
          <h2
            id="pricing-heading"
            className="text-balance font-display mt-4 text-4xl font-medium leading-[1.08] text-ink sm:text-5xl"
          >
            Simple, scoped, and built for{" "}
            <em className="font-display-italic">ROI</em>
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Every engagement starts with a free strategy call — you&apos;ll get
            a tailored quote within one business day. No lock-ins, no surprise
            line items.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 110}>
              <article
                className={`lift relative flex h-full flex-col rounded-[1.75rem] p-8 sm:p-9 ${
                  plan.highlight
                    ? "bg-dark-section grain bg-night text-paper shadow-[0_40px_80px_-40px_rgb(7_27_20/0.6)]"
                    : "border border-line bg-shell text-ink"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full bg-lime px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-night">
                    <Star className="size-3" aria-hidden="true" />
                    Most requested
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold tracking-tight">{plan.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${plan.highlight ? "text-paper/70" : "text-ink-soft"}`}>
                  {plan.tagline}
                </p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    from
                  </span>
                  <span className="font-display text-4xl font-semibold tracking-tight">{plan.price}</span>
                  <span className={plan.highlight ? "text-paper/60" : "text-ink-soft"}>{plan.unit}</span>
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm font-medium">
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                          plan.highlight ? "bg-lime/20 text-lime" : "bg-mint text-forest"
                        }`}
                      >
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span className={plan.highlight ? "text-paper/85" : "text-ink"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`btn mt-8 w-full ${
                    plan.highlight
                      ? "bg-lime text-night hover:bg-white"
                      : "bg-night text-lime hover:bg-forest"
                  }`}
                >
                  Get my quote
                  <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <p className="mt-9 text-center text-sm text-ink-soft">
            Not sure which fits?{" "}
            <a href="#contact" className="font-semibold text-forest underline-offset-4 hover:underline">
              Book the free call
            </a>{" "}
            — I&apos;ll point you at the highest-ROI option, even if it&apos;s the
            smallest one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
