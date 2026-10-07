import { ArrowRight, CalendarCheck, ClipboardCheck, LineChart, Map } from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Process — how an engagement runs, built to push toward the free call.
------------------------------------------------------------------ */

const STEPS = [
  {
    icon: CalendarCheck,
    num: "01",
    title: "Book your free strategy call",
    copy: "A relaxed 30 minutes: your store, your list, and where revenue is leaking. You leave with quick wins — whether we work together or not.",
  },
  {
    icon: Map,
    num: "02",
    title: "Get a clear, prioritized roadmap",
    copy: "I map the flows, campaigns, or site changes with the highest ROI first — scoped, scheduled, and priced before any work begins.",
  },
  {
    icon: ClipboardCheck,
    num: "03",
    title: "Build, QA, and launch",
    copy: "Every email, flow, and page passes a rigorous QA checklist before it ever touches your customers. That discipline produced a 98%+ accuracy record.",
  },
  {
    icon: LineChart,
    num: "04",
    title: "Measure, test, and compound",
    copy: "A/B tests, performance analysis, and steady iteration — so each month's results build on the last.",
  },
] as const;

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="bg-sand/50">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-forest">Process</p>
              <h2
                id="process-heading"
                className="text-balance font-display mt-4 text-4xl font-medium leading-[1.08] text-ink sm:text-5xl"
              >
                From first call to{" "}
                <em className="font-display-italic">first results</em>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                A simple, transparent way of working — no mystery retainers, no
                surprises. You always know what&apos;s happening and why.
              </p>
              <a href="#contact" className="btn mt-8 bg-night text-lime hover:bg-forest">
                Start with step one
                <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <ol className="relative space-y-5 lg:col-span-8">
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-[2.1rem] top-8 hidden w-px bg-gradient-to-b from-forest/40 via-line to-transparent sm:block"
            />
            {STEPS.map(({ icon: Icon, num, title, copy }, i) => (
              <Reveal key={num} delay={i * 100} as="li">
                <div className="lift relative flex gap-5 rounded-3xl border border-line bg-shell p-6 sm:gap-7 sm:p-8">
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="grid size-[4.2rem] shrink-0 place-items-center rounded-2xl border border-line bg-paper">
                      <Icon className="size-6 text-forest" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold tracking-[0.2em] text-forest">
                      {num}
                    </p>
                    <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-ink">
                      {title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
