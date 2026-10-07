import { ArrowRight, BadgeCheck, MailOpen, Send, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Hero — conversion-first first impression.
   Main proof visual is now an NDA-safe, blurred Klaviyo-style dashboard.
------------------------------------------------------------------ */

const TRUST_SIGNALS = [
  { icon: Send, label: "100+ campaigns managed" },
  { icon: MailOpen, label: "40%+ average open rate" },
  { icon: BadgeCheck, label: "98%+ QA accuracy" },
] as const;

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 sm:pt-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -top-32 right-[-10%] size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,#c9f36c33,transparent_65%)] blur-2xl" />
        <div className="animate-blob absolute -left-40 top-1/3 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,#0e3b2c14,transparent_62%)] blur-2xl [animation-delay:-6s]" />
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(14 21 18 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(14 21 18 / 0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-shell px-4 py-2 text-xs font-semibold tracking-wide text-ink">
              <span className="relative flex size-2">
                <span className="animate-ping-soft absolute inline-flex size-2 rounded-full bg-lime-deep" />
                <span className="relative inline-flex size-2 rounded-full bg-forest" />
              </span>
              Available for new clients — email &amp; web
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1
              id="hero-heading"
              className="text-balance font-display mt-6 text-[2.65rem] font-medium leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.35rem]"
            >
              Turn one-time buyers into{" "}
              <em className="font-display-italic font-semibold text-forest">repeat revenue</em>.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-6 flex items-start gap-4">
              <img
                src="/images/matthew-portrait-suit.jpg"
                alt=""
                width={56}
                height={56}
                loading="eager"
                decoding="async"
                className="mt-1 size-14 shrink-0 rounded-full border-2 border-white/80 object-cover object-top shadow-lg"
                aria-hidden="true"
              />
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
                I&apos;m{" "}
                <span itemProp="name" className="font-semibold text-ink">
                  Matthew Ponce
                </span>{" "}
                — a{" "}
                <span itemProp="jobTitle">
                  Klaviyo Email &amp; SMS Marketing Specialist
                </span>{" "}
                and Shopify/WordPress site builder. I help eCommerce brands grow
                revenue, retention, and repeat purchases — with conversion-focused
                stores and lifecycle marketing that sells while you sleep.
              </p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="btn bg-night text-lime shadow-[0_18px_40px_-18px_rgb(7_27_20/0.55)] hover:bg-forest"
              >
                Book a free strategy call
                <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
              </a>
              <a
                href="#work"
                className="btn border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-shell"
              >
                See client work
                <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3" aria-label="Key results">
              {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <Icon className="size-4 text-forest" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <Reveal delay={220} className="relative">
            <div aria-hidden="true" className="absolute -right-6 -top-6 size-64 rounded-full border-2 border-lime/15 lg:size-72" />
            <div aria-hidden="true" className="absolute -bottom-8 -left-8 size-48 rounded-full bg-forest/8 blur-2xl" />

            <div className="relative z-10 overflow-hidden rounded-[2rem] border-2 border-white/50 shadow-[0_40px_80px_-40px_rgb(7_27_20/0.5)]">
              <img
                src="/images/klaviyo-blurred.jpg"
                alt="Blurred email marketing dashboard screenshot with client records obscured for NDA privacy"
                width={1024}
                height={1024}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/4.35] w-full object-cover object-center sm:aspect-[4/4.2] lg:aspect-[4/4.6]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" />

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-night/70 p-4 text-paper backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-lime">
                  Proof of platform familiarity
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-paper/80">
                  Klaviyo-style workflow view shown for context. Customer names,
                  email addresses, and campaign records are intentionally blurred
                  for privacy and NDA compliance.
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-paper/60">
                  <ShieldCheck className="size-3.5 text-lime" aria-hidden="true" />
                  NDA-safe visual preview
                </p>
              </div>

              <div className="absolute right-4 top-4 hidden overflow-hidden rounded-2xl border border-white/50 bg-white/70 p-1 shadow-2xl backdrop-blur-md sm:block">
                <img
                  src="/images/matthew-portrait-suit.jpg"
                  alt=""
                  width={112}
                  height={140}
                  loading="lazy"
                  decoding="async"
                  className="h-28 w-24 rounded-[1rem] object-cover object-top"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="animate-floaty absolute -left-4 top-10 z-20 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-xl backdrop-blur-md [--tilt:-2deg] [animation-delay:-2.5s] sm:-left-8">
              <p className="font-display text-2xl font-semibold text-forest">40%+</p>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                Avg. open rate
              </p>
            </div>
            <div className="animate-floaty absolute -right-3 top-1/3 z-20 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-xl backdrop-blur-md [--tilt:2deg] [animation-delay:-4.5s] sm:-right-6">
              <p className="font-display text-2xl font-semibold text-forest">100+</p>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                Campaigns sent
              </p>
            </div>
            <div className="animate-floaty absolute -bottom-5 left-10 z-20 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-xl backdrop-blur-md [--tilt:-1deg] [animation-delay:-1s]">
              <p className="font-display text-2xl font-semibold text-forest">98%+</p>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                QA accuracy
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
