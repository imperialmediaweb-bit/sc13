"use client";

import * as React from "react";
import { MediaItem } from "@/components/media-item";

type Item = { url: string; type: "image" | "video"; folder: string; createdAt: string };

function titluGrup(folder: string, createdAt: string): string {
  if (folder) {
    // dacă subfolderul e o dată (2026-07-16) o formatăm frumos
    const d = new Date(folder);
    if (!isNaN(d.getTime())) return d.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
    return folder;
  }
  return new Date(createdAt).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
}

export function SantierGallery() {
  const [items, setItems] = React.useState<Item[] | null>(null);

  React.useEffect(() => {
    fetch("/api/santier")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]));
  }, []);

  if (items === null || items.length === 0) return null;

  // grupăm pe subfolder (dată)
  const groups = new Map<string, Item[]>();
  for (const it of items) {
    const key = it.folder || it.createdAt.slice(0, 10);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(it);
  }

  return (
    <div className="mb-4 space-y-4">
      {Array.from(groups.entries()).map(([key, list]) => (
        <div key={key} className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-3">
            <h3 className="font-display text-base font-extrabold">
              {titluGrup(list[0].folder, list[0].createdAt)}
              <span className="ml-2 text-sm font-medium text-muted-foreground">{list.length} fișiere</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-3">
            {list.map((it, i) => (
              <MediaItem key={i} src={it.url} alt={`Șantier ${key} (${i + 1})`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
