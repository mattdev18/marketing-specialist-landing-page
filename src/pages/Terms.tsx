import { ArrowLeft } from "lucide-react";

/* ------------------------------------------------------------------
   Terms of Service — short, plain-language terms for freelance
   services offered through this site.
------------------------------------------------------------------ */

const SECTIONS = [
  {
    title: "Services",
    body: [
      "This website offers freelance digital services: Klaviyo email & SMS marketing, Mailchimp support, customer retention strategy, Shopify and WordPress website design and builds, and administrative/VA support. Specific deliverables, timelines, and pricing are agreed per engagement in a written scope before work begins.",
    ],
  },
  {
    title: "Quotes & payment",
    body: [
      "All engagements begin with a free strategy call. Pricing shown on this site is indicative; a tailored quote is provided after scoping. Payment terms, milestones, and any retainer arrangements are confirmed in writing before work starts.",
    ],
  },
  {
    title: "Client responsibilities",
    body: [
      "Clients agree to provide timely access (account logins with least-privilege roles), brand assets, and feedback needed to complete the work, and to ensure they hold rights to any content supplied. Clients are responsible for approving final campaigns and pages before they go live.",
    ],
  },
  {
    title: "Confidentiality & data",
    body: [
      "Client and customer data is treated as confidential, accessed only as needed to deliver the work, and never shared or used for any other purpose. NDAs are welcomed. Access credentials are stored securely and returned or deleted at the end of the engagement.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "Upon full payment, deliverables created specifically for the client (campaigns, flows, designs, and site code) are transferred to the client. Pre-existing tools, templates, and know-how remain the property of their respective owners. Portfolio display of completed work is subject to the client's written permission.",
    ],
  },
  {
    title: "Results & disclaimers",
    body: [
      "Marketing outcomes depend on many factors including your product, list, traffic, and market. Past results referenced on this site describe specific past engagements and do not guarantee identical future outcomes. No specific revenue, open rate, or conversion figure is promised unless agreed in writing.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "Services are provided with professional care and skill. To the maximum extent permitted by law, liability for any claim arising from services is limited to the fees paid for the relevant engagement. Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    title: "Changes & contact",
    body: [
      "These terms may be updated from time to time; the current version is always posted here. Questions can be sent via the contact form on the home page.",
      "Last updated: February 2026.",
    ],
  },
] as const;

export function Terms() {
  return (
    <main id="main" className="min-h-screen bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-forest underline-offset-4 hover:underline">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </a>
        <h1 className="font-display mt-8 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          The working agreement behind every engagement — clear scope, clear
          expectations, no surprises.
        </p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title} aria-labelledby={`terms-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <h2
                id={`terms-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-lg font-semibold tracking-tight text-ink"
              >
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-2.5 leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
