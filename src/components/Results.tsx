import { ArrowRight, BadgeCheck, Clock3, MailOpen, Store, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Results / benefits — the dark, high-contrast "why it matters" section.
   Benefits are tied only to real, stated metrics.
------------------------------------------------------------------ */

const BENEFITS = [
  {
    icon: Workflow,
    title: "Revenue on autopilot",
    copy: "Welcome, abandoned-cart, post-purchase, and win-back flows keep selling long after you log off.",
  },
  {
    icon: MailOpen,
    title: "Emails people actually open",
    copy: "A 40%+ average open rate in my last engagement — earned through testing, segmentation, and timing.",
  },
  {
    icon: BadgeCheck,
    title: "Mistake-free sends",
    copy: "A 98%+ QA accuracy record means broken links and wrong segments don't embarrass your brand.",
  },
  {
    icon: Store,
    title: "A store built to convert",
    copy: "Fast, mobile-first Shopify & WordPress builds with Klaviyo capture wired in from day one.",
  },
  {
    icon: Clock3,
    title: "Your week, handed back",
    copy: "Campaigns, flows, and site updates handled end-to-end — you get hours back to run the business.",
  },
] as const;

export function Results() {
  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="bg-dark-section grain relative overflow-hidden bg-night text-paper"
    >
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -top-40 left-1/4 size-[36rem] rounded-full bg-[radial-gradient(circle_at_center,#c9f36c1f,transparent_60%)] blur-3xl" />
        <div className="animate-blob absolute -bottom-52 right-[-8%] size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,#0e3b2c,transparent_65%)] blur-3xl [animation-delay:-8s]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-lime">Why it matters</p>
          <h2
            id="results-heading"
            className="text-balance font-display mt-4 text-4xl font-medium leading-[1.08] sm:text-5xl"
          >
            What this actually means{" "}
            <em className="font-display-italic text-lime">for your store</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-paper/70">
            Tactics are cheap. Here&apos;s the outcome you&apos;re buying —
            grounded in work I&apos;ve already done.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={(i % 3) * 100} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <article className="lift h-full rounded-3xl border border-white/10 bg-white/[0.055] p-7 backdrop-blur-sm hover:border-lime/35 hover:bg-white/[0.08]">
                <div className="grid size-11 place-items-center rounded-xl bg-lime/15 text-lime">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-paper/70">{copy}</p>
              </article>
            </Reveal>
          ))}

          {/* CTA tile completes the grid */}
          <Reveal delay={200}>
            <a
              href="#contact"
              className="group flex h-full min-h-44 flex-col justify-between rounded-3xl bg-lime p-7 text-night transition-transform duration-500 hover:-translate-y-1.5"
            >
              <p className="font-display text-2xl font-semibold leading-snug">
                Ready for these to be <em className="font-display-italic">your</em> numbers?
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                Book your free strategy call
                <span className="grid size-8 place-items-center rounded-full bg-night text-lime transition-transform duration-400 group-hover:translate-x-1.5">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
