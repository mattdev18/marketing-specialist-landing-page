import { ArrowRight, Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Portfolio proof / quote cards.
   These are project-note style quotes about the builds shown on the site,
   avoiding fabricated client names or testimonials.
------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    quote:
      "This landing page demonstrates premium positioning, strong CTA structure, refined motion, and production-ready implementation — exactly the kind of trust-building first impression service providers and eCommerce brands need.",
    name: "Landing page build",
    role: "Positioning + design + development",
    highlight: true,
    stars: 5,
  },
  {
    quote:
      "The portfolio grid is now structured for six real client websites, making it easy to swap in actual screenshots, live URLs, and concise summaries without presenting concept work as paid work.",
    name: "Client portfolio section",
    role: "6-site showcase layout",
    highlight: false,
    stars: 5,
  },
  {
    quote:
      "The hero proof area now uses an NDA-safe Klaviyo-style dashboard visual with customer records blurred, showing platform familiarity while protecting private client information.",
    name: "Klaviyo proof section",
    role: "NDA-safe credibility visual",
    highlight: false,
    stars: 5,
  },
] as const;

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-shell">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-forest">Build proof</p>
          <h2
            id="testimonials-heading"
            className="text-balance font-display mt-4 text-4xl font-medium leading-[1.08] text-ink sm:text-5xl"
          >
            Proof inside the{" "}
            <em className="font-display-italic">build itself</em>
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Clear, honest proof points about the work shown on this site —
            without inventing client names, testimonials, or results.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 110}>
              <figure
                className={`lift flex h-full flex-col rounded-3xl p-7 transition-all ${
                  testimonial.highlight
                    ? "bg-dark-section grain bg-night text-paper shadow-[0_30px_60px_-30px_rgb(7_27_20/0.5)]"
                    : "border border-line bg-paper hover:border-forest/30 hover:shadow-[0_24px_50px_-30px_rgb(7_27_20/0.3)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Quote
                    className={`size-6 ${testimonial.highlight ? "text-lime" : "text-forest/40"}`}
                    aria-hidden="true"
                  />
                  <div className="flex gap-0.5" aria-label={`${testimonial.stars} out of 5 stars`}>
                    {Array.from({ length: testimonial.stars }).map((_, s) => (
                      <Star
                        key={s}
                        className={`size-3.5 fill-current ${testimonial.highlight ? "text-lime" : "text-forest"}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-5 flex-1">
                  <p className={`text-[0.95rem] leading-relaxed ${testimonial.highlight ? "text-paper/90" : "text-ink"}`}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                <figcaption className={`mt-7 border-t pt-5 ${testimonial.highlight ? "border-white/15" : "border-line"}`}>
                  <p className={`text-sm font-semibold ${testimonial.highlight ? "text-lime" : "text-ink"}`}>
                    {testimonial.name}
                  </p>
                  <p className={`mt-0.5 text-xs ${testimonial.highlight ? "text-paper/60" : "text-ink-soft"}`}>
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 text-center">
            <p className="text-sm leading-relaxed text-ink-soft">
              When you send over your real six client projects, this section can
              stay honest while the portfolio becomes significantly stronger.
            </p>
            <a href="#contact" className="btn bg-night text-lime hover:bg-forest">
              Let me build yours
              <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
