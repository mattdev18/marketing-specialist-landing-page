import { BadgeCheck, MailOpen, Send } from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Social proof / track record band.
   Only real, permitted metrics — all from Matthew's most recent role.
------------------------------------------------------------------ */

const STATS = [
  {
    icon: Send,
    value: "100+",
    label: "Email & SMS campaigns",
    detail: "managed end-to-end, from brief to send",
  },
  {
    icon: MailOpen,
    value: "40%+",
    label: "Average open rate",
    detail: "via subject-line testing, segmentation & send-time optimization",
  },
  {
    icon: BadgeCheck,
    value: "98%+",
    label: "Campaign accuracy",
    detail: "every send passed a rigorous QA checklist",
  },
] as const;

export function SocialProof() {
  return (
    <section aria-labelledby="proof-heading" className="border-y border-line bg-shell">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="eyebrow text-forest">Track record</p>
          <h2
            id="proof-heading"
            className="font-display mt-4 max-w-2xl text-3xl font-medium leading-tight text-ink sm:text-4xl"
          >
            Results from my most recent{" "}
            <em className="font-display-italic">Klaviyo engagement</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3" role="list" aria-label="Key results from most recent engagement">
          {STATS.map(({ icon: Icon, value, label, detail }, i) => (
            <Reveal key={label} delay={i * 110} role="listitem">
              <div className="lift h-full rounded-3xl border border-line bg-paper p-7 shadow-[0_1px_0_rgb(255_255_255/0.6)_inset] hover:border-forest/30 hover:shadow-[0_24px_50px_-30px_rgb(7_27_20/0.35)]">
                <Icon className="size-5 text-forest" aria-hidden="true" />
                <p className="font-display mt-2 text-5xl font-semibold tracking-tight text-ink">
                  {value}
                </p>
                <h3 className="mt-3 text-sm font-semibold text-ink">{label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <p className="mt-8 text-sm text-ink-soft">
            Achieved as Klaviyo Email &amp; SMS Specialist for a Shopify eCommerce
            brand, January 2026 – August 2026.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
