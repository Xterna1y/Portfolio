// src/lib/useScrollReveal.ts
import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal
 * A small, type-safe IntersectionObserver hook that supports:
 *  - rootMargin (string, e.g. "-120px 0px")
 *  - threshold (number or array)
 *  - once (if true, will disconnect after first intersection)
 *
 * Returns: { ref, inView }
 *
 * Usage:
 *   const { ref, inView } = useScrollReveal<HTMLDivElement>({ rootMargin: "-120px", threshold: 0.1, once: true });
 *   <section ref={ref}>...</section>
 */
export function useScrollReveal<T extends Element = HTMLElement>(opts?: {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Guard for SSR / no window
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: consider it in view if there is no IntersectionObserver
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (opts?.once) {
              // disconnect after first trigger
              observer.disconnect();
            }
          } else {
            if (!opts?.once) {
              setInView(false);
            }
          }
        });
      },
      {
        root: opts?.root ?? null,
        rootMargin: opts?.rootMargin ?? "-120px",
        threshold: opts?.threshold ?? 0.1,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
    // We intentionally do not include `opts` in the deps hash to avoid re-creating the observer repeatedly.
    // If you change options at runtime, remount the component or provide stable options.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return { ref, inView };
}
