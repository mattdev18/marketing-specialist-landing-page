import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Results } from "./components/Results";
import { Projects } from "./components/Projects";
import { Tools } from "./components/Tools";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ConsentBanner } from "./components/ConsentBanner";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";

/* ------------------------------------------------------------------
   App — hash-based routing so the static build works on any host:
     (none)      → landing page
     #/privacy   → Privacy Policy
     #/terms     → Terms of Service
     anything #/…→ NotFound
   In-page anchors (#services, #contact…) never change the route.
------------------------------------------------------------------ */

type Route = "home" | "privacy" | "terms" | "notfound";

function getRoute(): Route {
  const hash = window.location.hash;
  if (!hash.startsWith("#/")) return "home";
  const path = hash.slice(2).replace(/\/+$/, "");
  if (path === "" || path === "home") return "home";
  if (path === "privacy") return "privacy";
  if (path === "terms") return "terms";
  return "notfound";
}

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onChange = () => {
      setRoute((prev) => {
        const next = getRoute();
        if (next !== prev) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

function HomePage() {
  return (
    <>
      <Navbar />
      {/* schema.org/Person microdata spans the page (CSP-safe structured data) */}
      <main id="main" itemScope itemType="https://schema.org/Person">
        <meta itemProp="url" content="https://[SITE_URL]/" />
        <Hero />
        <SocialProof />
        <Services />
        <Process />
        <Results />
        <Projects />
        <Tools />
        <About />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const route = useHashRoute();

  return (
    <>
      <a
        href="#main"
        className="skip-link fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-night px-5 py-2.5 text-sm font-semibold text-lime transition-transform focus-visible:translate-y-0"
      >
        Skip to main content
      </a>

      {route === "home" && <HomePage />}
      {route === "privacy" && <Privacy />}
      {route === "terms" && <Terms />}
      {route === "notfound" && <NotFound />}

      <ConsentBanner />
    </>
  );
}
