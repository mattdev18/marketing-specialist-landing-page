import { ArrowUpRight, Briefcase, Code2, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { LinkedInIcon } from "./icons";
import { PLACEHOLDER_LINKS } from "../lib/site";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   About — bio, past-tense work history timeline, education, training,
   and social links ([LINKEDIN_URL] / [PORTFOLIO_URL] / [OLJ_URL]).
   schema.org/Person microdata (alumniOf, address, sameAs).
------------------------------------------------------------------ */

const TIMELINE = [
  {
    period: "2020 – 2025",
    role: "Admin Assistant / SAP Analyst",
    detail:
      "Five years of process, data, and QA discipline — the backbone of how I run campaigns and projects today.",
  },
  {
    period: "Jan – Jul 2025",
    role: "Administrative Virtual Assistant",
    detail: "Supported busy founders with inbox, calendar, data, and documentation work.",
  },
  {
    period: "Jul 2025 – Jan 2026",
    role: "Mailchimp Email Marketing Specialist",
    detail: "Planned, built, and sent Mailchimp campaigns; owned list hygiene and reporting.",
  },
  {
    period: "Jan – Aug 2026",
    role: "Klaviyo Email & SMS Specialist — Shopify eCommerce brand",
    detail:
      "Managed 100+ campaigns, kept 98%+ campaign accuracy through QA, and lifted average open rates above 40%.",
  },
  {
    period: "Now",
    role: "Freelance Email, SMS & Web Growth Partner",
    detail:
      "Klaviyo email & SMS marketing plus Shopify and WordPress builds for eCommerce brands. Available for new clients.",
  },
] as const;

const TRAINING = [
  "Shopify Store Management (Dec 2025)",
  "Amazon Store Management (Nov 2025)",
  "VA 101 (Oct 2025)",
  "Essentials of Freelancing Masterclass (Dec 2024)",
] as const;

const SOCIALS = [
  { icon: LinkedInIcon, label: "LinkedIn", href: PLACEHOLDER_LINKS.linkedin },
  { icon: Briefcase, label: "Portfolio", href: PLACEHOLDER_LINKS.portfolio },
  { icon: ArrowUpRight, label: "OnlineJobs.PH", href: PLACEHOLDER_LINKS.olj },
] as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Portrait + quick facts */}
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <div className="relative">
                {/* Decorative accent behind portrait */}
                <div aria-hidden="true" className="absolute -left-4 -top-4 size-full rounded-[2rem] bg-gradient-to-br from-forest/20 via-lime/10 to-transparent" />
                <div aria-hidden="true" className="absolute -right-3 -bottom-3 size-48 rounded-full bg-lime/15 blur-2xl" />

                <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/60 shadow-[0_40px_70px_-40px_rgb(7_27_20/0.5)]">
                  <img
                    src="/images/matthew-portrait-suit.jpg"
                    alt="Matthew Ponce — Klaviyo Email & SMS Marketing Specialist"
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover object-top"
                    itemProp="image"
                  />
                  {/* Gradient overlay at bottom for text readability */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 via-night/40 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-paper sm:text-[1.6rem]">
                      Matthew Ponce
                    </h3>
                    <p className="mt-1 text-sm font-medium text-paper/80">
                      Klaviyo Email &amp; SMS Specialist
                    </p>
                  </div>
                </div>

                {/* Location chip */}
                <div className="absolute -bottom-5 left-6 right-6 rounded-2xl border border-line bg-shell/92 p-5 shadow-xl backdrop-blur-md sm:left-8 sm:right-auto sm:min-w-72">
                  <div className="flex items-center gap-3">
                    <span className="relative flex size-2.5">
                      <span className="animate-ping-soft absolute inline-flex size-2.5 rounded-full bg-lime-deep" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-forest" />
                    </span>
                    <p className="text-sm font-semibold text-ink">Available for new clients</p>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                    <MapPin className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
                    <span
                      itemProp="address"
                      itemScope
                      itemType="https://schema.org/PostalAddress"
                    >
                      <meta itemProp="addressCountry" content="PH" />
                      Philippines · Remote worldwide
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bio + timeline */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-forest">About</p>
              <h2
                id="about-heading"
                className="text-balance font-display mt-4 text-4xl font-medium leading-[1.08] text-ink sm:text-5xl"
              >
                Operator&apos;s discipline,{" "}
                <em className="font-display-italic">marketer&apos;s instincts</em>
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
                <p>
                  Most recently, I spent eight months as the Klaviyo Email &amp;
                  SMS Specialist for a Shopify eCommerce brand — where I managed
                  100+ campaigns, held a 98%+ QA accuracy record, and pushed
                  average open rates above 40% by optimizing subject lines,
                  segmentation, and send times.
                </p>
                <p>
                  Before that, I ran Mailchimp campaigns and supported founders
                  as an administrative VA — after five years as an Admin
                  Assistant / SAP Analyst. That background is my edge: your
                  sends go out clean, on time, and measured.
                </p>
                <p className="flex gap-3 rounded-2xl border border-line bg-shell p-4 text-sm">
                  <Sparkles className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                  <span>
                    I also design and build WordPress and Shopify sites — AI-assisted
                    with Claude (&ldquo;vibe coding&rdquo;) and a human QA gate, so
                    you ship faster without sacrificing quality or security.
                    <Code2 className="ml-1 inline size-4 text-forest" aria-hidden="true" />
                  </span>
                </p>
              </div>
            </Reveal>

            {/* Career timeline */}
            <Reveal delay={120}>
              <ol className="mt-10 space-y-0" aria-label="Career history">
                {TIMELINE.map((item, i) => (
                  <li key={item.period} className="relative flex gap-5 pb-8 last:pb-0">
                    <span aria-hidden="true" className="relative flex flex-col items-center">
                      <span
                        className={`mt-1.5 size-3 rounded-full border-2 ${
                          i === TIMELINE.length - 1
                            ? "border-forest bg-lime shadow-[0_0_0_4px_rgb(201_243_108/0.35)]"
                            : "border-forest/50 bg-paper"
                        }`}
                      />
                      {i < TIMELINE.length - 1 && <span className="w-px flex-1 bg-line" />}
                    </span>
                    <div className="-mt-0.5">
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-forest">
                        {item.period}
                      </p>
                      <h3 className="mt-1 font-semibold tracking-tight text-ink">{item.role}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Education + training */}
            <Reveal delay={160}>
              <div className="mt-10 rounded-3xl border border-line bg-shell p-6 sm:p-7">
                <p className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                  <span
                    className="text-sm leading-relaxed text-ink"
                    itemProp="alumniOf"
                    itemScope
                    itemType="https://schema.org/CollegeOrUniversity"
                  >
                    <strong className="font-semibold">BS Entrepreneurship</strong> —{" "}
                    <span itemProp="name">Polytechnic University of the Philippines</span>, 2018
                  </span>
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {TRAINING.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-semibold text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Social links (placeholders — swap before launch) */}
            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                    className="btn border border-ink/20 bg-transparent px-5 py-3 text-sm text-ink hover:border-ink hover:bg-shell"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                    <ArrowUpRight className="btn-arrow size-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
