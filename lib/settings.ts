import { getPool, ensureTables } from "@/lib/db";

export async function getSetting(key: string): Promise<string | null> {
  await ensureTables();
  const { rows } = await getPool().query(`SELECT value FROM settings WHERE key = $1`, [key]);
  return rows.length ? (rows[0].value as string) : null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await ensureTables();
  await getPool().query(
    `INSERT INTO settings (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [key, value]
  );
}
