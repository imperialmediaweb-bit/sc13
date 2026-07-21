import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addReport, readReports } from "@/lib/reports";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Primește un raport de la un părinte (text obligatoriu, poze/video opționale).
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const mesaj = String(body?.mesaj || "").trim();
    if (!mesaj) {
      return NextResponse.json({ error: "Scrie ce ai văzut pe șantier." }, { status: 400 });
    }
    const nume = String(body?.nume || "").trim().slice(0, 80) || "Anonim";
    const dataVizita = String(body?.dataVizita || "").trim().slice(0, 40);
    const media = Array.isArray(body?.media)
      ? body.media.filter((u: unknown) => typeof u === "string").slice(0, 8)
      : [];

    await addReport({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      dataVizita,
      nume,
      mesaj: mesaj.slice(0, 4000),
      media,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Cerere invalidă" }, { status: 400 });
  }
}

// Citirea rapoartelor primite (pentru moderare) — protejat cu NOTIFY_SECRET.
export async function GET(req: Request) {
  const secret = process.env.NOTIFY_SECRET;
  const provided = req.headers.get("x-notify-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  return NextResponse.json({ reports: await readReports() });
}
