import {
  ArrowUpRight,
  Globe,
  MailCheck,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Store,
} from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Client work section.

   The user requested 6 real client websites. To keep the portfolio
   honest and avoid inventing client names, results, or brands, this
   section is rebuilt as a polished 6-slot client-work showcase.
   Replace each [CLIENT_*] placeholder with the real project screenshot,
   URL, and summary when ready.
------------------------------------------------------------------ */

type ClientWork = {
  slot: string;
  name: string;
  platform: string;
  focus: string;
  url: string;
  summary: string;
  services: string[];
  accent: string;
};

const CLIENT_WORK: ClientWork[] = [
  {
    slot: "01",
    name: "[CLIENT_PROJECT_01]",
    platform: "Shopify",
    focus: "eCommerce storefront",
    url: "[LIVE_URL_01]",
    summary:
      "Swap in the real homepage screenshot and a 1–2 sentence summary of what you built, what the client sold, and the conversion goal.",
    services: ["Homepage redesign", "Klaviyo capture", "Mobile CRO"],
    accent: "from-[#F3EADF] via-[#ECE7DD] to-[#D7E1D2]",
  },
  {
    slot: "02",
    name: "[CLIENT_PROJECT_02]",
    platform: "Shopify",
    focus: "product launch site",
    url: "[LIVE_URL_02]",
    summary:
      "Use this card for a launch-focused store, collection page refresh, or landing page you built for a product push.",
    services: ["Landing page", "Email popup", "Speed cleanup"],
    accent: "from-[#F4EFE7] via-[#E5DFD6] to-[#D7D0C6]",
  },
  {
    slot: "03",
    name: "[CLIENT_PROJECT_03]",
    platform: "WordPress",
    focus: "service-business website",
    url: "[LIVE_URL_03]",
    summary:
      "Ideal for a trust-first local or remote service brand website with strong CTA hierarchy and lead capture.",
    services: ["One-page build", "Inquiry funnel", "SEO-ready structure"],
    accent: "from-[#EEF2EC] via-[#DDE7DB] to-[#C5D7C7]",
  },
  {
    slot: "04",
    name: "[CLIENT_PROJECT_04]",
    platform: "Shopify",
    focus: "retention-focused store",
    url: "[LIVE_URL_04]",
    summary:
      "Use for a store where email capture, abandoned-cart recovery, and post-purchase retention were part of the build plan.",
    services: ["Retention flow hooks", "List growth", "Product page UX"],
    accent: "from-[#F6F3EC] via-[#ECE5D6] to-[#D9D3C7]",
  },
  {
    slot: "05",
    name: "[CLIENT_PROJECT_05]",
    platform: "WordPress",
    focus: "business site refresh",
    url: "[LIVE_URL_05]",
    summary:
      "Perfect for a redesign case study showing before/after improvements in structure, clarity, and booking or inquiry flow.",
    services: ["Visual refresh", "Copy layout", "Booking CTA"],
    accent: "from-[#F0F0EB] via-[#E4E4DD] to-[#D1D5CD]",
  },
  {
    slot: "06",
    name: "[CLIENT_PROJECT_06]",
    platform: "Shopify / WordPress",
    focus: "custom client build",
    url: "[LIVE_URL_06]",
    summary:
      "Reserve this slot for your strongest visual build — the site you most want a future client to click first.",
    services: ["Custom build", "Responsive QA", "Launch support"],
    accent: "from-[#F4EDE4] via-[#E4DFD5] to-[#D4DDD6]",
  },
] as const;

function WorkPreview({ project }: { project: ClientWork }) {
  return (
    <div className="border-b border-line bg-paper">
      <div className="flex items-center gap-1.5 px-4 pt-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 hidden flex-1 rounded-md bg-shell px-2.5 py-1 text-[0.62rem] font-medium text-ink-soft sm:block">
          {project.url}
        </span>
      </div>

      <div className={`mt-3 overflow-hidden bg-gradient-to-br ${project.accent} p-4`}>
        <div className="rounded-[1.15rem] border border-white/55 bg-white/80 p-3 shadow-[0_20px_40px_-25px_rgb(7_27_20/0.28)] backdrop-blur-sm">
          <div className="grid gap-3 md:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-3">
              <div className="h-24 rounded-2xl bg-night/8" />
              <div className="grid grid-cols-3 gap-2.5">
                <div className="h-14 rounded-xl bg-night/7" />
                <div className="h-14 rounded-xl bg-night/7" />
                <div className="h-14 rounded-xl bg-night/7" />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-4/5 rounded-full bg-night/12" />
                <div className="h-2.5 w-2/3 rounded-full bg-night/9" />
              </div>
            </div>
            <div className="space-y-2.5 rounded-2xl bg-white/70 p-3">
              <div className="h-9 rounded-xl bg-night/7" />
              <div className="h-20 rounded-xl bg-night/6" />
              <div className="h-20 rounded-xl bg-night/6" />
              <div className="h-9 rounded-xl bg-forest/12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-forest">Client work</p>
            <h2
              id="work-heading"
              className="text-balance font-display mt-4 text-4xl font-medium leading-[1.08] text-ink sm:text-5xl"
            >
              A 6-site portfolio built for{" "}
              <em className="font-display-italic">real client websites</em>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="max-w-sm rounded-2xl border border-line bg-shell p-4 text-sm leading-relaxed text-ink-soft">
              <ShieldCheck className="mb-2 size-4 text-forest" aria-hidden="true" />
              This section now presents six client-work slots instead of concept
              demos. To keep the portfolio honest, each card uses placeholders
              until the real screenshot, URL, and project summary are added.
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CLIENT_WORK.map((project, i) => (
            <Reveal key={project.slot} delay={(i % 3) * 110}>
              <article className="lift group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-shell hover:border-forest/30 hover:shadow-[0_35px_70px_-40px_rgb(7_27_20/0.45)]">
                <WorkPreview project={project} />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-forest">
                        <span className="size-1.5 rounded-full bg-forest" aria-hidden="true" />
                        Client work {project.slot}
                      </span>
                      <h3 className="font-display mt-4 text-2xl font-semibold text-ink">
                        {project.name}
                      </h3>
                    </div>
                    <span className="rounded-full border border-line bg-paper px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                      {project.platform}
                    </span>
                  </div>

                  <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-forest">
                    {project.focus}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {project.summary}
                  </p>

                  <ul className="mt-5 grid gap-2 border-t border-line pt-5">
                    {project.services.map((service) => (
                      <li key={service} className="flex items-center gap-2 text-[0.82rem] font-medium text-ink">
                        {service.includes("Klaviyo") || service.includes("flow") || service.includes("List") ? (
                          <MailCheck className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
                        ) : service.includes("Mobile") || service.includes("Responsive") ? (
                          <MonitorSmartphone className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
                        ) : service.includes("Homepage") || service.includes("Product") || service.includes("store") ? (
                          <Store className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
                        ) : service.includes("Launch") || service.includes("support") ? (
                          <Rocket className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
                        ) : (
                          <ShoppingBag className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
                        )}
                        {service}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-ink-soft">
                      <Globe className="size-3.5 text-forest" aria-hidden="true" />
                      {project.url}
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline-offset-4 hover:underline"
                    >
                      Add this project
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
