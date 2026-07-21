import { NextResponse } from "next/server";
import { petitie } from "@/lib/data";
import { getSetting } from "@/lib/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let cache: { count: number; source: "live" | "manual"; at: number } | null = null;
const TTL = 10 * 60 * 1000; // 10 minute

function parseCount(html: string): number | null {
  const patterns = [
    /Semn[ăa]turi[^0-9]{0,20}([0-9][0-9.,\s]{0,9})/i,
    /([0-9][0-9.,\s]{0,9})[^0-9]{0,12}semn[ăa]turi/i,
    /"?signatures?"?\s*[:=]\s*"?([0-9]{1,7})/i,
    /id=["']signatures["'][^0-9]{0,40}([0-9]{1,7})/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) {
      const n = parseInt(m[1].replace(/[^0-9]/g, ""), 10);
      if (Number.isFinite(n)) return n;
    }
  }
  return null;
}

export async function GET() {
  // baza = numărul setat din admin (dacă există), altfel cel din cod
  let manual = petitie.semnaturi;
  try {
    const s = await getSetting("semnaturi");
    if (s) manual = Number(s);
  } catch {}

  const now = Date.now();
  if (cache && now - cache.at < TTL && cache.count >= manual) {
    return NextResponse.json({ count: cache.count, source: cache.source });
  }

  try {
    const res = await fetch(petitie.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        "Accept-Language": "ro,en;q=0.8",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const html = await res.text();
      const parsed = parseCount(html);
      // acceptăm doar valori rezonabile (nu scade sub numărul cunoscut, nu e absurd de mare)
      if (parsed !== null && parsed >= manual && parsed < manual + 200000) {
        cache = { count: parsed, source: "live", at: now };
        return NextResponse.json({ count: parsed, source: "live" });
      }
    }
  } catch {
    // ignorăm — folosim numărul manual
  }

  cache = { count: manual, source: "manual", at: now };
  return NextResponse.json({ count: manual, source: "manual" });
}
