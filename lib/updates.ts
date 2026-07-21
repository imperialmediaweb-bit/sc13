import { getPool, ensureTables } from "@/lib/db";

export type Update = { id: string; createdAt: string; data: string; text: string };

export async function addUpdate(u: Update): Promise<void> {
  await ensureTables();
  await getPool().query(`INSERT INTO updates (id, created_at, data, text) VALUES ($1, $2, $3, $4)`, [
    u.id,
    u.createdAt,
    u.data,
    u.text,
  ]);
}

export async function listUpdates(): Promise<Update[]> {
  await ensureTables();
  const { rows } = await getPool().query(
    `SELECT id, created_at, data, text FROM updates ORDER BY created_at DESC`
  );
  return rows.map((r) => ({
    id: r.id,
    createdAt: new Date(r.created_at).toISOString(),
    data: r.data || "",
    text: r.text,
  }));
}

export async function deleteUpdate(id: string): Promise<void> {
  await ensureTables();
  await getPool().query(`DELETE FROM updates WHERE id = $1`, [id]);
}
