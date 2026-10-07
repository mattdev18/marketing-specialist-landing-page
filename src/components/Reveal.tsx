import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------
   Scroll-reveal wrapper.

   One shared IntersectionObserver reveals any [data-reveal] element by
   adding `.is-inview`; CSS handles the transition. Visitors who prefer
   reduced motion see content immediately (see index.css media query),
   and browsers without IO support fail open to visible content.

   Use `as` to render semantic tags (li, dt, …) and keep markup valid.
------------------------------------------------------------------ */

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
  }
  return observer;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (applied as transition-delay). */
  delay?: number;
  /** Render as a different tag to preserve list/definition semantics. */
  as?: ElementType;
  id?: string;
  role?: string;
};

export function Reveal({ children, className, delay = 0, as, id, role }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    if (!io) {
      el.classList.add("is-inview");
      return;
    }
    io.observe(el);
    return () => {
      io.unobserve(el);
    };
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal
      id={id}
      role={role}
      className={className}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
