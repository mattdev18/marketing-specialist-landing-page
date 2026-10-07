import { ArrowLeft } from "lucide-react";

/* ------------------------------------------------------------------
   Privacy Policy — plain-language, honest, matches the actual stack:
   consent-gated cookie-free analytics, server-side form processing,
   optional Turnstile spam protection.
------------------------------------------------------------------ */

const SECTIONS = [
  {
    title: "Overview",
    body: [
      "This Privacy Policy explains what information this website collects, why, and how it is handled. The short version: this site collects only what you choose to send through the contact form, uses no tracking cookies, and loads analytics only with your explicit consent.",
    ],
  },
  {
    title: "What is collected",
    body: [
      "If you submit the inquiry form, the details you provide — your name, email address, optional store URL, and message — are processed so I can respond to your inquiry.",
      "The form includes anti-spam measures (a hidden honeypot field, timing checks, and rate limits). These measures do not collect personal data.",
    ],
  },
  {
    title: "Analytics",
    body: [
      "This site uses Plausible Analytics, a privacy-friendly tool that does not use cookies and does not collect personal data. The analytics script loads only after you explicitly allow it via the consent banner, and your choice is remembered in your browser's local storage — not in a cookie.",
      "You can change your choice at any time by clearing your browser's local storage for this site.",
    ],
  },
  {
    title: "Spam protection (when enabled)",
    body: [
      "If Cloudflare Turnstile is enabled on the contact form, Cloudflare processes limited technical data (such as your IP address and browser characteristics) solely to verify you are human. This processing is governed by Cloudflare's privacy policy.",
    ],
  },
  {
    title: "Third-party processors",
    body: [
      "Form submissions are delivered through a secure form-processing service or serverless endpoint. If you book a call, scheduling is handled by Calendly under their own privacy policy. No data is sold or shared for marketing.",
    ],
  },
  {
    title: "Retention & security",
    body: [
      "Inquiry emails are kept only as long as needed to respond and, where relevant, to deliver services. Access to client systems is always least-privilege, protected by unique passwords and two-factor authentication, and revoked at the end of an engagement.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You may request a copy of the personal data I hold about you, or ask for it to be corrected or deleted, at any time. Use the contact form to make a request — it will be handled promptly.",
    ],
  },
  {
    title: "Contact & changes",
    body: [
      "Questions about this policy can be sent via the contact form on the home page. If this policy changes, the updated version will be posted here with a revised date.",
      "Last updated: February 2026.",
    ],
  },
] as const;

export function Privacy() {
  return (
    <main id="main" className="min-h-screen bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-forest underline-offset-4 hover:underline">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </a>
        <h1 className="font-display mt-8 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Plain language, no legalese maze — because privacy policies should be
          readable.
        </p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title} aria-labelledby={`privacy-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <h2
                id={`privacy-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
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
