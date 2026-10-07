import {
  ArrowUpRight,
  Check,
  Code2,
  Funnel,
  Gauge,
  Inbox,
  ListChecks,
  MailCheck,
  Smartphone,
  Sparkles,
  Split,
  Store,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Services — what Matthew takes off a store owner's plate.
   Copy describes services offered, in present tense (per copy rules).
------------------------------------------------------------------ */

type Feature = { icon: React.ElementType; text: string };

const EMAIL_FEATURES: Feature[] = [
  { icon: Funnel, text: "Lifecycle flows: welcome, abandoned cart, post-purchase & win-back" },
  { icon: MailCheck, text: "Campaign strategy, build & scheduling (Klaviyo & Mailchimp)" },
  { icon: Users, text: "Audience segmentation that treats customers like people" },
  { icon: Split, text: "A/B testing for subject lines, content & send times" },
  { icon: Gauge, text: "Performance analysis with clear, actionable reporting" },
  { icon: Sparkles, text: "Customer retention strategy across email + SMS" },
];

const WEB_FEATURES: Feature[] = [
  { icon: Store, text: "Shopify & WordPress store design, build and setup" },
  { icon: Smartphone, text: "Mobile-first, conversion-focused pages & landing pages" },
  { icon: Gauge, text: "Site speed and on-page optimization" },
  { icon: MailCheck, text: "Klaviyo email capture wired in from day one" },
  { icon: Code2, text: "AI-assisted builds with Claude — faster shipping, human QA" },
  { icon: ListChecks, text: "Security-minded: updates, least-privilege access, clean code" },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-forest">Services</p>
          <h2
            id="services-heading"
            className="text-balance font-display mt-4 text-4xl font-medium leading-[1.08] text-ink sm:text-5xl"
          >
            Two ways to grow your store —{" "}
            <em className="font-display-italic">one accountable partner</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Most stores leak revenue twice: emails that don&apos;t get sent (or
            opened), and websites that don&apos;t convert the traffic they get.
            I fix both.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Card: Email & SMS */}
          <Reveal>
            <article className="lift group h-full rounded-[2rem] border border-line bg-shell p-8 hover:border-forest/30 hover:shadow-[0_30px_60px_-35px_rgb(7_27_20/0.4)] sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-forest text-lime">
                  <MailCheck className="size-6" aria-hidden="true" />
                </div>
                <span className="rounded-full border border-line bg-paper px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Retainer
                </span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-semibold text-ink sm:text-[1.7rem]">
                Email &amp; SMS marketing
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Klaviyo-first lifecycle marketing that turns your existing list
                into a dependable revenue channel — flows, campaigns, testing,
                and reporting, handled for you.
              </p>
              <ul className="mt-7 space-y-3.5">
                {EMAIL_FEATURES.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm font-medium text-ink">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint">
                      <Icon className="size-3 text-forest" aria-hidden="true" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline-offset-4 hover:underline"
              >
                Grow my list revenue
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </article>
          </Reveal>

          {/* Card: Websites */}
          <Reveal delay={120}>
            <article className="lift group h-full rounded-[2rem] border border-line bg-shell p-8 hover:border-forest/30 hover:shadow-[0_30px_60px_-35px_rgb(7_27_20/0.4)] sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-night text-lime">
                  <Store className="size-6" aria-hidden="true" />
                </div>
                <span className="rounded-full border border-line bg-paper px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Project
                </span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-semibold text-ink sm:text-[1.7rem]">
                Shopify &amp; WordPress websites
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Fast, modern stores and sites — built AI-assisted with Claude
                (&ldquo;vibe coding&rdquo;) to ship sooner, without ever cutting
                corners on quality or security.
              </p>
              <ul className="mt-7 space-y-3.5">
                {WEB_FEATURES.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm font-medium text-ink">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint">
                      <Icon className="size-3 text-forest" aria-hidden="true" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline-offset-4 hover:underline"
              >
                Build my store
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </article>
          </Reveal>

          {/* Card: Admin & VA support — wide */}
          <Reveal className="lg:col-span-2">
            <article className="lift flex h-full flex-col gap-6 rounded-[2rem] border border-line bg-mint/60 p-8 hover:border-forest/30 sm:p-10 lg:flex-row lg:items-center lg:gap-12">
              <div className="flex-1">
                <div className="grid size-12 place-items-center rounded-2xl bg-shell text-forest">
                  <Inbox className="size-6" aria-hidden="true" />
                </div>
                <h3 className="font-display mt-6 text-2xl font-semibold text-ink">
                  Admin &amp; VA support
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                  Five years of Admin Assistant / SAP Analyst discipline behind
                  every task — inbox and calendar management, product uploads,
                  data cleanup, reporting, and SOPs that keep your operations
                  tight.
                </p>
              </div>
              <ul className="grid flex-1 gap-3 sm:grid-cols-2">
                {[
                  "Inbox & calendar management",
                  "Product & collection uploads",
                  "Data entry & cleanup",
                  "Reports, SOPs & process docs",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 rounded-xl bg-shell px-4 py-3 text-sm font-medium text-ink">
                    <Check className="size-4 shrink-0 text-forest" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
