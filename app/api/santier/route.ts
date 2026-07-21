import { NextResponse } from "next/server";
import { listSantier } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Pozele/video-urile de pe șantier, luate direct din folderul Cloudinary.
export async function GET() {
  try {
    return NextResponse.json({ items: await listSantier() });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
