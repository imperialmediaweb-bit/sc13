import { getPool, ensureTables } from "@/lib/db";

export type Report = {
  id: string;
  createdAt: string;
  nume: string;
  mesaj: string;
  media: string[];
};

export async function addReport(r: Report): Promise<void> {
  await ensureTables();
  await getPool().query(
    `INSERT INTO reports (id, created_at, nume, mesaj, media)
     VALUES ($1, $2, $3, $4, $5)`,
    [r.id, r.createdAt, r.nume, r.mesaj, JSON.stringify(r.media)]
  );
}

export async function readReports(): Promise<Report[]> {
  await ensureTables();
  const { rows } = await getPool().query(
    `SELECT id, created_at, nume, mesaj, media FROM reports ORDER BY created_at DESC`
  );
  return rows.map((r) => ({
    id: r.id,
    createdAt: new Date(r.created_at).toISOString(),
    nume: r.nume,
    mesaj: r.mesaj,
    media: r.media as string[],
  }));
}
