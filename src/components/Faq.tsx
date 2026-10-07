import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   FAQ — accessible accordion (button + region, aria-expanded),
   smooth grid-rows height animation, keyboard friendly.
------------------------------------------------------------------ */

const FAQS = [
  {
    q: "What happens on the free strategy call?",
    a: "Thirty minutes, zero pressure. We look at your store, your list, and your current flows or site. I'll share 2–3 quick wins you can take with you and, if it makes sense, a scoped plan with pricing. No obligation either way.",
  },
  {
    q: "Do you only work in Klaviyo?",
    a: "Klaviyo is my specialty, but I also manage Mailchimp accounts and can migrate you to Klaviyo when you're ready. For websites I build on Shopify and WordPress, and I'm comfortable maintaining Wix sites too.",
  },
  {
    q: "What is “vibe coding” — and is it secure?",
    a: "It means I build AI-assisted with Claude: I direct, review, and QA every line while Claude accelerates the build. You get modern, fast sites sooner — with human review, least-privilege access, and security best practices on every delivery.",
  },
  {
    q: "How quickly can my first flows go live?",
    a: "For most stores, the core flows (welcome, abandoned cart, post-purchase) are scoped, written, designed, QA'd, and live inside the first couple of weeks — with campaigns following the calendar we set together.",
  },
  {
    q: "Will you work in my timezone?",
    a: "I'm based in the Philippines and work flexible hours with standing overlap for US, EU, and AU clients — calls are scheduled at times that suit you, and I'm responsive on Slack or email in between.",
  },
  {
    q: "What do you need from me to start?",
    a: "Two things: access (Klaviyo/Shopify/WordPress logins with least-privilege roles), and one kickoff call to align on voice, offers, and goals. I handle the rest — including documenting everything so you're never locked in.",
  },
  {
    q: "How do you handle my customer data?",
    a: "Carefully and minimally. I work inside your accounts (no exporting lists to personal devices), use strong unique passwords with 2FA, sign NDAs happily, and follow a strict QA checklist before anything reaches your customers.",
  },
] as const;

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="rounded-2xl border border-line bg-shell transition-colors hover:border-forest/25">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="acc-panel-btn flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-semibold tracking-tight text-ink">{q}</span>
          <span className="acc-icon grid size-8 shrink-0 place-items-center rounded-full bg-mint text-forest">
            <Plus className="size-4" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        data-open={open}
        className="acc-panel"
      >
        <div>
          <p className="px-6 pb-6 leading-relaxed text-ink-soft">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-sand/50">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-forest">FAQ</p>
              <h2
                id="faq-heading"
                className="text-balance font-display mt-4 text-4xl font-medium leading-[1.08] text-ink sm:text-5xl"
              >
                Questions store owners{" "}
                <em className="font-display-italic">actually ask</em>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                Something else on your mind? Ask it on the free call — or send
                an inquiry and I&apos;ll reply within 1–2 business days.
              </p>
              <a href="#contact" className="btn mt-8 bg-night text-lime hover:bg-forest">
                Ask me directly
              </a>
            </div>
          </Reveal>

          <div className="space-y-3.5 lg:col-span-7">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <FaqItem q={faq.q} a={faq.a} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
