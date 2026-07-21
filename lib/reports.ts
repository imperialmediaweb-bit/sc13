import { getPool, ensureTables } from "@/lib/db";

export type Report = {
  id: string;
  createdAt: string;
  dataVizita: string;
  nume: string;
  mesaj: string;
  media: string[];
  published: boolean;
};

type Row = {
  id: string;
  created_at: string | Date;
  data_vizita: string | null;
  nume: string | null;
  mesaj: string;
  media: string[];
  published: boolean;
};

function map(r: Row): Report {
  return {
    id: r.id,
    createdAt: new Date(r.created_at).toISOString(),
    dataVizita: r.data_vizita || "",
    nume: r.nume || "Anonim",
    mesaj: r.mesaj,
    media: r.media,
    published: r.published,
  };
}

export async function addReport(r: Omit<Report, "published">): Promise<void> {
  await ensureTables();
  await getPool().query(
    `INSERT INTO reports (id, created_at, data_vizita, nume, mesaj, media, published)
     VALUES ($1, $2, $3, $4, $5, $6, false)`,
    [r.id, r.createdAt, r.dataVizita, r.nume, r.mesaj, JSON.stringify(r.media)]
  );
}

// Toate rapoartele (pentru moderare)
export async function readReports(): Promise<Report[]> {
  await ensureTables();
  const { rows } = await getPool().query(
    `SELECT id, created_at, data_vizita, nume, mesaj, media, published
     FROM reports ORDER BY created_at DESC`
  );
  return (rows as Row[]).map(map);
}

// Doar rapoartele publicate (pentru afișare publică)
export async function publicReports(): Promise<Report[]> {
  await ensureTables();
  const { rows } = await getPool().query(
    `SELECT id, created_at, data_vizita, nume, mesaj, media, published
     FROM reports WHERE published = true ORDER BY created_at DESC`
  );
  return (rows as Row[]).map(map);
}

export async function setPublished(id: string, published: boolean): Promise<void> {
  await ensureTables();
  await getPool().query(`UPDATE reports SET published = $2 WHERE id = $1`, [id, published]);
}

export async function deleteReport(id: string): Promise<void> {
  await ensureTables();
  await getPool().query(`DELETE FROM reports WHERE id = $1`, [id]);
}
