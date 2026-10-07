/* ------------------------------------------------------------------
   Consent-gated, cookie-light analytics (Plausible).

   - No tracking script is loaded until the visitor explicitly opts in.
   - The consent choice is stored in localStorage (not a cookie).
   - Plausible itself is cookie-free and GDPR-friendly by design.
   - Script injection is limited to the single whitelisted Plausible
     origin (also whitelisted in the Content-Security-Policy).
------------------------------------------------------------------ */

const CONSENT_KEY = "mp.analytics-consent";

export type ConsentState = "accepted" | "declined" | null;

export function getConsent(): ConsentState {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<ConsentState, null>): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable (private mode) — consent is session-only */
  }
}

let injected = false;

/** Injects the Plausible script tag if the visitor accepted and a domain is configured. */
export function maybeLoadAnalytics(domain: string): void {
  if (injected || !domain || getConsent() !== "accepted") return;
  injected = true;

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = domain;
  script.src = "https://plausible.io/js/script.js";
  script.referrerPolicy = "strict-origin-when-cross-origin";
  document.head.appendChild(script);
}
