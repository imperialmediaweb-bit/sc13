import { NextResponse } from "next/server";
import { getCounter, countSubscribers, countReports } from "@/lib/stats";
import { authorized } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Statistici pentru admin — protejat cu NOTIFY_SECRET.
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }
  try {
    const [installs, abonati, reports] = await Promise.all([
      getCounter("install"),
      countSubscribers(),
      countReports(),
    ]);
    return NextResponse.json({ installs, abonati, reports });
  } catch {
    return NextResponse.json({ installs: 0, abonati: 0, reports: { total: 0, published: 0 } });
  }
}
