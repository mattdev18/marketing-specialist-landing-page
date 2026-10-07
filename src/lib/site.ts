/* ------------------------------------------------------------------
   Site-wide constants & integration placeholders.

   SECURITY NOTES
   - No secrets or API keys live in this repo. Public-only values
     (form endpoint, Turnstile SITE key, analytics domain) are injected
     at build time via VITE_* environment variables.
   - The contact email is assembled at runtime, only after a user
     interaction (button click), so it never appears in the shipped HTML.
------------------------------------------------------------------ */

/** Replace the [PLACEHOLDER] tokens with live URLs before launch. */
export const PLACEHOLDER_LINKS = {
  linkedin: "[LINKEDIN_URL]",
  portfolio: "[PORTFOLIO_URL]",
  olj: "[OLJ_URL]",
  calendly: "[CALENDLY_URL]",
} as const;

/** True when a placeholder has been swapped for a real https URL. */
export const isRealUrl = (u: string): boolean =>
  /^https:\/\//i.test(u) && !u.includes("[");

/**
 * Contact email parts — intentionally split so scrapers can't read a
 * complete address from the markup. Update with the real address.
 */
const EMAIL_PARTS = { user: "hello", host: "matthewponce", tld: "com" } as const;

export function buildEmail(): string {
  return `${EMAIL_PARTS.user}@${EMAIL_PARTS.host}.${EMAIL_PARTS.tld}`;
}

/**
 * Contact form endpoint — Formspree AJAX URL (e.g. https://formspree.io/f/xxxxxxx)
 * or a serverless endpoint you control. Set via env: VITE_FORM_ENDPOINT
 */
export const FORM_ENDPOINT: string =
  (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "";

/** Cloudflare Turnstile public site key. Env: VITE_TURNSTILE_SITE_KEY */
export const TURNSTILE_SITE_KEY: string =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? "";

/** Plausible analytics domain. Analytics load ONLY after consent. Env: VITE_PLAUSIBLE_DOMAIN */
export const PLAUSIBLE_DOMAIN: string =
  (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined) ?? "";
