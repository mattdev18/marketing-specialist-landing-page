import { ArrowLeft } from "lucide-react";

/* In-app 404 (hash routes). A static 404.html is also shipped for hosts. */

export function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center bg-paper px-5 text-center">
      <div>
        <p className="font-display text-8xl font-semibold tracking-tight text-forest">404</p>
        <h1 className="mt-4 text-xl font-semibold text-ink">This page wandered off the calendar</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          The link may be outdated, or the page never existed. Let&apos;s get
          you back to something useful.
        </p>
        <a href="#" className="btn mt-8 bg-night text-lime hover:bg-forest">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </a>
      </div>
    </main>
  );
}
