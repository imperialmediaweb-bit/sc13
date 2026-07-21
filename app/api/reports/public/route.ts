import { NextResponse } from "next/server";
import { publicReports } from "@/lib/reports";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Rapoartele publicate — vizibile pe pagină (fără secret).
export async function GET() {
  try {
    return NextResponse.json({ reports: await publicReports() });
  } catch {
    return NextResponse.json({ reports: [] });
  }
}
