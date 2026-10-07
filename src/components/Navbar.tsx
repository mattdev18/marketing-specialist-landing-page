import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

/* ------------------------------------------------------------------
   Sticky navbar — transparent over the hero, frosted glass on scroll.
   Fully keyboard accessible; mobile menu traps nothing but closes on
   Escape / link click.
------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
      >
        {/* Brand */}
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Matthew Ponce — back to top"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-xl bg-night text-[0.7rem] font-bold tracking-tight text-lime"
          >
            MP
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">Matthew Ponce</span>
            <span className="block text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-soft">
              Email · SMS · Web
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navlink text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="btn hidden bg-night text-sm text-lime hover:bg-forest sm:inline-flex"
          >
            Book a free call
            <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line bg-shell text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="space-y-1 border-t border-line bg-paper px-5 pb-6 pt-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-mint"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn w-full bg-night text-lime"
            >
              Book a free strategy call
              <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
