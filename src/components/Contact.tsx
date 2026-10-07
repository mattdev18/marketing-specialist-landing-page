import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Copy,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Timer,
} from "lucide-react";
import {
  FORM_ENDPOINT,
  PLACEHOLDER_LINKS,
  TURNSTILE_SITE_KEY,
  buildEmail,
  isRealUrl,
} from "../lib/site";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Final CTA + inquiry form.

   Form hardening:
   - Client-side validation & sanitization (length caps, control-char
     stripping, URL/email shape checks). Server/service must re-validate.
   - Hidden honeypot field ("company") — bots fill it, humans never see it.
   - Time-based trap — submissions under ~2.5s are silently dropped.
   - Per-session rate limit — one attempt every 45s.
   - Cloudflare Turnstile when VITE_TURNSTILE_SITE_KEY is configured.
   - Submits as JSON to a server-side endpoint (VITE_FORM_ENDPOINT);
     no secrets in client code. React renders all values as text (no XSS).
   - Calendly embed is sandboxed + lazy; email is assembled only after
     explicit user interaction (never printed in the HTML).
------------------------------------------------------------------ */

const MIN_FILL_MS = 2500;
const RATE_LIMIT_MS = 45_000;

const LIMITS = { name: 80, email: 120, website: 200, message: 2000 } as const;

/** Strip control chars, trim, and cap length. Server re-validates. */
function sanitize(value: string, max: number): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, " ").trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i;

type Status = "idle" | "sending" | "success" | "error" | "fallback";

let turnstileRequested = false;

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [revealedEmail, setRevealedEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");
  const startedAt = useRef<number>(Date.now());
  /** Last validated draft — used only for the user-initiated mailto fallback. */
  const draft = useRef({ name: "there", message: "" });

  /* Load + render Turnstile only when a site key is configured. */
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return;
    const render = () => {
      if (window.turnstile && turnstileRef.current && !widgetId.current) {
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
        });
      }
    };
    if (window.turnstile) {
      render();
      return;
    }
    if (!turnstileRequested) {
      turnstileRequested = true;
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    }
  }, []);

  async function copyEmail() {
    const email = revealedEmail || buildEmail();
    setRevealedEmail(email);
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — email stays visible for manual copy */
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setErrors({});
    setNote("");

    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);

    /* 1) Honeypot — real users leave this empty. */
    if (String(data.get("company") ?? "").trim() !== "") {
      setStatus("success"); // silent accept: give bots nothing
      return;
    }
    /* 2) Time trap — impossibly fast submissions are bots. */
    if (Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus("success");
      return;
    }
    /* 3) Rate limit (per session). Server must also rate-limit by IP. */
    try {
      const last = Number(window.sessionStorage.getItem("mp.lastSubmit") ?? "0");
      if (Date.now() - last < RATE_LIMIT_MS) {
        setStatus("error");
        setNote("Easy there — please wait a moment before sending again.");
        return;
      }
      window.sessionStorage.setItem("mp.lastSubmit", String(Date.now()));
    } catch {
      /* storage unavailable — continue without local rate limit */
    }

    /* 4) Validate + sanitize. */
    const name = sanitize(String(data.get("name") ?? ""), LIMITS.name);
    const email = sanitize(String(data.get("email") ?? ""), LIMITS.email);
    const website = sanitize(String(data.get("website") ?? ""), LIMITS.website);
    const message = sanitize(String(data.get("message") ?? ""), LIMITS.message);

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Please share your name (2+ characters).";
    if (!EMAIL_RE.test(email)) nextErrors.email = "That email doesn't look right.";
    if (website && !URL_RE.test(website)) nextErrors.website = "Add a valid store URL, or leave it empty.";
    if (message.length < 20) nextErrors.message = "A little more detail helps — 20+ characters.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setNote("Please fix the highlighted fields and try again.");
      return;
    }

    /* 5) Turnstile token (only when configured). */
    let turnstileToken = "";
    if (TURNSTILE_SITE_KEY) {
      turnstileToken = window.turnstile?.getResponse(widgetId.current) ?? "";
      if (!turnstileToken) {
        setStatus("error");
        setNote("Please complete the security check.");
        return;
      }
    }

    /* 6) No endpoint configured → graceful fallback, never a dead end. */
    if (!FORM_ENDPOINT) {
      draft.current = { name, message };
      setStatus("fallback");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          website,
          message,
          "cf-turnstile-response": turnstileToken || undefined,
          formStartedAt: startedAt.current,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      form.reset();
      startedAt.current = Date.now();
      if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
    } catch {
      setStatus("error");
      setNote("Something went wrong while sending. Please try again — or email me directly below.");
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors focus:border-forest";

  return (
    <div className="rounded-[1.75rem] border border-white/40 bg-shell p-7 text-ink shadow-[0_50px_100px_-50px_rgb(0_0_0/0.6)] sm:p-9">
      {status === "success" ? (
        <div className="flex min-h-96 flex-col items-center justify-center text-center" role="status">
          <span className="grid size-14 place-items-center rounded-full bg-mint text-forest">
            <Check className="size-6" aria-hidden="true" />
          </span>
          <h3 className="font-display mt-6 text-2xl font-semibold">Inquiry sent</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Thanks for reaching out — I&apos;ll get back to you within 1–2
            business days with next steps for your free strategy call.
          </p>
        </div>
      ) : status === "fallback" ? (
        <div className="flex min-h-96 flex-col items-center justify-center text-center" role="status">
          <span className="grid size-14 place-items-center rounded-full bg-mint text-forest">
            <Mail className="size-6" aria-hidden="true" />
          </span>
          <h3 className="font-display mt-6 text-2xl font-semibold">Almost there</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            The form endpoint isn&apos;t connected yet. Email me directly — your
            draft is ready to paste:
          </p>
          {revealedEmail ? (
            <p className="mt-4 rounded-xl bg-mint px-4 py-2.5 font-mono text-sm font-semibold text-forest">
              {revealedEmail}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${buildEmail()}?subject=${encodeURIComponent(
                `Inquiry from ${draft.current.name} — strategy call`
              )}&body=${encodeURIComponent(draft.current.message)}`}
              className="btn bg-night px-5 py-3 text-sm text-lime hover:bg-forest"
            >
              <Mail className="size-4" aria-hidden="true" />
              Open email app (draft ready)
            </a>
            <button type="button" onClick={copyEmail} className="btn border border-ink/20 bg-transparent px-5 py-3 text-sm text-ink hover:border-ink">
              {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copied ? "Copied" : "Reveal & copy email"}
            </button>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note">
          <h3 className="font-display text-2xl font-semibold tracking-tight">Send an inquiry</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Tell me about your store — I reply personally within 1–2 business days.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-name" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">
                Name
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={LIMITS.name}
                aria-invalid={Boolean(errors.name)}
                className={`${inputBase} ${errors.name ? "border-red-500" : "border-line"}`}
                placeholder="Alex Rivera"
              />
              {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="cf-email" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">
                Email
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={LIMITS.email}
                aria-invalid={Boolean(errors.email)}
                className={`${inputBase} ${errors.email ? "border-red-500" : "border-line"}`}
                placeholder="you@yourstore.com"
              />
              {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="cf-website" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">
              Store URL <span className="font-medium normal-case text-ink-soft/70">(optional)</span>
            </label>
            <input
              id="cf-website"
              name="website"
              type="url"
              inputMode="url"
              autoComplete="url"
              maxLength={LIMITS.website}
              aria-invalid={Boolean(errors.website)}
              className={`${inputBase} ${errors.website ? "border-red-500" : "border-line"}`}
              placeholder="https://yourstore.com"
            />
            {errors.website && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.website}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="cf-message" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">
              What are you working on?
            </label>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={5}
              maxLength={LIMITS.message}
              aria-invalid={Boolean(errors.message)}
              className={`${inputBase} resize-y ${errors.message ? "border-red-500" : "border-line"}`}
              placeholder="e.g. We run a skincare brand on Shopify — email is barely 5% of revenue and I know it should be more…"
            />
            {errors.message && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.message}</p>}
          </div>

          {/* Honeypot — off-screen, never visible to humans */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="cf-company">Company (leave empty)</label>
            <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Cloudflare Turnstile renders here when configured */}
          {TURNSTILE_SITE_KEY ? <div ref={turnstileRef} className="mt-5 min-h-16" /> : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn mt-6 w-full bg-night text-lime hover:bg-forest disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send inquiry
                <ArrowRight className="btn-arrow size-4" aria-hidden="true" />
              </>
            )}
          </button>

          <p id="form-note" role={status === "error" ? "alert" : undefined} className={`mt-4 flex items-start gap-2 text-xs leading-relaxed ${note ? "font-medium text-red-600" : "text-ink-soft"}`}>
            {note || (
              <>
                <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                Protected by rate limits and spam checks. Your details are only
                ever used to reply to your inquiry.
              </>
            )}
          </p>
        </form>
      )}
    </div>
  );
}

export function Contact() {
  const calendlyReady = isRealUrl(PLACEHOLDER_LINKS.calendly);
  const [callEmail, setCallEmail] = useState("");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-dark-section grain relative overflow-hidden bg-night text-paper"
      itemScope
      itemType="https://schema.org/ProfessionalService"
    >
      <meta itemProp="name" content="Matthew Ponce — Email, SMS & Web Growth" />
      <meta itemProp="areaServed" content="Worldwide (remote)" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -top-48 right-[-6%] size-[36rem] rounded-full bg-[radial-gradient(circle_at_center,#c9f36c1a,transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch + booking card */}
          <div>
            <Reveal>
              <p className="eyebrow text-lime">Let&apos;s talk</p>
              <h2
                id="contact-heading"
                className="text-balance font-display mt-4 text-4xl font-medium leading-[1.06] sm:text-6xl"
                itemProp="description"
              >
                Your list is sitting on revenue.{" "}
                <em className="font-display-italic text-lime">Let&apos;s unlock it.</em>
              </h2>
              <div className="mt-6 flex items-start gap-4">
                <img
                  src="/images/matthew-portrait-suit.jpg"
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="mt-1 size-12 shrink-0 rounded-full border-2 border-lime/40 object-cover object-top"
                  aria-hidden="true"
                />
                <p className="max-w-lg text-lg leading-relaxed text-paper/70">
                  Book a free strategy call or send an inquiry — you&apos;ll leave
                  with clear next steps for your store either way.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.055] p-7 backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lime text-night">
                    <CalendarCheck className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">Free 30-min strategy call</h3>
                    <p className="text-sm text-paper/60">Walk away with 2–3 quick wins, guaranteed.</p>
                  </div>
                </div>

                {calendlyReady ? (
                  /* Sandboxed, lazy Calendly embed — no scripts until consent-by-interaction */
                  <iframe
                    src={PLACEHOLDER_LINKS.calendly}
                    title="Schedule a free strategy call with Matthew Ponce"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    allow="payment 'none'; camera 'none'; microphone 'none'; geolocation 'none'"
                    className="mt-6 h-[540px] w-full rounded-2xl border border-white/10 bg-white"
                  />
                ) : (
                  <div className="mt-6">
                    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-paper/70">
                      <Timer className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
                      Online booking is launching shortly. In the meantime,
                      request a time by form or email — I confirm every booking
                      personally with a calendar invite.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {callEmail ? (
                        <a
                          href={`mailto:${callEmail}?subject=${encodeURIComponent("Free strategy call — booking request")}`}
                          className="btn bg-lime px-5 py-3 text-sm font-bold text-night hover:bg-white"
                        >
                          <Mail className="size-4" aria-hidden="true" />
                          {callEmail}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCallEmail(buildEmail())}
                          className="btn bg-lime px-5 py-3 text-sm font-bold text-night hover:bg-white"
                        >
                          <Mail className="size-4" aria-hidden="true" />
                          Reveal contact email
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <p className="mt-5 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-paper/55">
                  <ShieldCheck className="size-4 shrink-0 text-lime" aria-hidden="true" />
                  No-pressure promise: if we&apos;re not a fit, you still keep
                  the roadmap.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: inquiry form */}
          <Reveal delay={220}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
