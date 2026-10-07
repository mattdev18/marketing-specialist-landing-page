import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { PLAUSIBLE_DOMAIN } from "../lib/site";
import { getConsent, maybeLoadAnalytics, setConsent } from "../lib/analytics";

/* ------------------------------------------------------------------
   Consent-gated analytics banner.
   - Only rendered when a Plausible domain is configured via env.
   - Nothing tracks until the visitor presses "Allow".
------------------------------------------------------------------ */

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!PLAUSIBLE_DOMAIN) return;
    if (getConsent() === null) {
      setVisible(true);
    } else {
      maybeLoadAnalytics(PLAUSIBLE_DOMAIN);
    }
  }, []);

  if (!visible || !PLAUSIBLE_DOMAIN) return null;

  const choose = (accepted: boolean) => {
    setConsent(accepted ? "accepted" : "declined");
    if (accepted) maybeLoadAnalytics(PLAUSIBLE_DOMAIN);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-2xl border border-line bg-shell/95 p-5 shadow-[0_30px_60px_-30px_rgb(7_27_20/0.5)] backdrop-blur-xl"
    >
      <p className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
        <span>
          This site uses <strong>privacy-friendly, cookie-free analytics</strong>{" "}
          (Plausible) to count visits — nothing personal, ever. OK to switch it on?
        </span>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose(true)}
          className="btn flex-1 bg-night px-4 py-2.5 text-sm text-lime hover:bg-forest"
        >
          Allow
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          className="btn flex-1 border border-ink/20 bg-transparent px-4 py-2.5 text-sm text-ink hover:border-ink"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
