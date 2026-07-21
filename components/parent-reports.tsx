"use client";

import * as React from "react";
import { MediaItem } from "@/components/media-item";

type Report = {
  id: string;
  createdAt: string;
  dataVizita: string;
  nume: string;
  mesaj: string;
  media: string[];
};

export function ParentReports() {
  const [reports, setReports] = React.useState<Report[] | null>(null);

  React.useEffect(() => {
    fetch("/api/reports/public")
      .then((r) => r.json())
      .then((d) => setReports(d.reports || []))
      .catch(() => setReports([]));
  }, []);

  if (!reports || reports.length === 0) return null;

  return (
    <section id="de-la-parinti" className="scroll-mt-4">
      <div className="mb-4">
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-[hsl(var(--primary-2))]">Din comunitate</div>
        <h2 className="mt-1 text-balance font-display text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">
          De la părinți, de pe teren
        </h2>
      </div>
      <div className="space-y-4">
        {reports.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <strong>{r.nume}</strong>
              {r.dataVizita && (
                <span className="rounded bg-[hsl(var(--card-2))] px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  {new Date(r.dataVizita).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              )}
            </div>
            <p className="mt-2 whitespace-pre-wrap text-[0.97rem]">{r.mesaj}</p>
            {r.media.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {r.media.map((m, i) => (
                  <MediaItem key={i} src={m} alt={`Raport ${r.nume} (${i + 1})`} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
