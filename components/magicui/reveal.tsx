"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Dezvăluie conținutul la scroll (fade + translate), stil Magic UI.
 * Important pentru viteză: conținutul e VIZIBIL din start (inclusiv înainte de
 * hidratare). Doar elementele aflate sub fold sunt ascunse — după montare —
 * și se animează când intră în viewport. Așa pagina nu mai „așteaptă" JS-ul.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  // null = nemontat încă (vizibil, fără animație); false = ascuns, așteaptă scroll; true = animat
  const [shown, setShown] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    // dacă elementul e deja (măcar parțial) în viewport, rămâne vizibil — fără animație
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setShown(true);
      return;
    }
    setShown(false);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-500 ease-out motion-reduce:transition-none",
        shown === false ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}
