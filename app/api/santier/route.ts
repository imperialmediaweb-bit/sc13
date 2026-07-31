import { NextResponse } from "next/server";
import { listSantier } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cache în memorie: nu mai lovim Cloudinary Admin API la fiecare vizitator.
let cache: { items: unknown[]; at: number } | null = null;
const TTL = 2 * 60 * 1000; // 2 minute

// Pozele/video-urile de pe șantier, luate direct din folderul Cloudinary.
export async function GET() {
  const headers = { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" };
  try {
    if (cache && Date.now() - cache.at < TTL) {
      return NextResponse.json({ items: cache.items }, { headers });
    }
    const items = await listSantier();
    cache = { items, at: Date.now() };
    return NextResponse.json({ items }, { headers });
  } catch {
    // dacă apelul pică, servim ultima listă bună
    return NextResponse.json({ items: cache?.items || [] }, { headers });
  }
}
