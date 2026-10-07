import { ArrowUpRight, Briefcase, ShieldCheck } from "lucide-react";
import { LinkedInIcon } from "./icons";
import { PLACEHOLDER_LINKS } from "../lib/site";

/* ------------------------------------------------------------------
   Footer — nav, legal pages, placeholder socials (rel hardened),
   and availability line.
------------------------------------------------------------------ */

const EXPLORE = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Client work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

const LEGAL = [
  { label: "Privacy Policy", href: "#/privacy" },
  { label: "Terms of Service", href: "#/terms" },
  { label: "security.txt", href: "/.well-known/security.txt" },
] as const;

const SOCIALS = [
  { icon: LinkedInIcon, label: "LinkedIn", href: PLACEHOLDER_LINKS.linkedin },
  { icon: Briefcase, label: "Portfolio", href: PLACEHOLDER_LINKS.portfolio },
  { icon: ArrowUpRight, label: "OnlineJobs.PH", href: PLACEHOLDER_LINKS.olj },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-dark-section border-t border-white/10 bg-night pb-10 pt-16 text-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl bg-lime text-[0.7rem] font-bold text-night">
                MP
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-tight">Matthew Ponce</span>
                <span className="block text-[0.68rem] font-medium uppercase tracking-[0.14em] text-paper/55">
                  Email · SMS · Web
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">
              Klaviyo Email &amp; SMS marketing and fast, conversion-focused
              Shopify &amp; WordPress builds for eCommerce brands — remote,
              worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in new tab)`}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-paper/70 transition-colors hover:border-lime hover:text-lime"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-paper/50">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-paper/70 transition-colors hover:text-lime">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-paper/50">Legal</h2>
            <ul className="mt-4 space-y-2.5">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-paper/70 transition-colors hover:text-lime">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-paper/50">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-lime/70" aria-hidden="true" />
              Privacy-friendly by default: no tracking cookies, and analytics
              load only with your consent.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-7 text-xs text-paper/50 sm:flex-row sm:items-center">
          <p>© {year} Matthew Ponce. All rights reserved.</p>
          <p>Based in the Philippines · Working with clients worldwide · Available for new projects</p>
        </div>
      </div>
    </footer>
  );
}
