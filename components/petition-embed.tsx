"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

/**
 * Formularul petitieonline, încărcat abia când utilizatorul se apropie de el
 * (nu la deschiderea paginii) — iframe-ul e greu și încetinea tot site-ul.
 */
export function PetitionEmbed({ src, title }: { src: string; title: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      // începe încărcarea puțin înainte să ajungă utilizatorul la secțiune
      { rootMargin: "600px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-border">
      {load ? (
        <iframe src={src} title={title} className="h-[600px] w-full" loading="lazy" />
      ) : (
        <div className="flex h-[600px] w-full flex-col items-center justify-center gap-2 bg-[hsl(var(--card-2))] text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-sm">Se încarcă formularul petiției…</span>
        </div>
      )}
    </div>
  );
}
