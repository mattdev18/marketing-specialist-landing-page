import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Tools — the full working stack as an ambient marquee.
   Duplicated row content is aria-hidden so screen readers hear it once.
------------------------------------------------------------------ */

const ROW_ONE = ["Klaviyo", "Mailchimp", "Shopify", "WordPress", "Wix", "Claude", "Canva", "Figma"];
const ROW_TWO = ["Photoshop", "Premiere Pro", "CapCut", "HubSpot", "Slack", "Trello", "Notion", "Google Workspace", "Calendly"];

function MarqueeRow({ tools, reverse = false, speed = "46s" }: { tools: string[]; reverse?: boolean; speed?: string }) {
  const items = [...tools, ...tools]; // duplicated for a seamless -50% loop
  return (
    <div className="marquee marquee-mask overflow-hidden" role="presentation">
      <ul
        className="marquee-track flex w-max items-center gap-3.5 py-1.5 pr-3.5"
        style={{
          ["--marquee-speed" as string]: speed,
          animationDirection: reverse ? "reverse" : undefined,
        }}
        aria-hidden="true"
      >
        {items.map((tool, i) => (
          <li
            key={`${tool}-${i}`}
            className="rounded-full border border-line bg-shell px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_1px_0_rgb(255_255_255/0.7)_inset] transition-colors hover:border-forest/40 hover:bg-mint"
          >
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="border-y border-line bg-sand/40">
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-forest">Toolbox</p>
              <h2
                id="tools-heading"
                className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl"
              >
                The stack behind <em className="font-display-italic">the work</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Klaviyo-first, fluent across your stack — marketing, site,
              design, and the ops tools that keep everything moving.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-12 space-y-3.5">
          <MarqueeRow tools={ROW_ONE} />
          <MarqueeRow tools={ROW_TWO} reverse speed="52s" />
        </Reveal>

        {/* Screen-reader-friendly list of tools */}
        <ul className="sr-only">
          {[...ROW_ONE, ...ROW_TWO].map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
