import { promises as fs } from "fs";
import path from "path";

export type Report = {
  id: string;
  createdAt: string;
  nume: string;
  mesaj: string;
  media: string[];
};

// Pentru persistență la redeploy pe Railway, setați REPORTS_FILE către un volum.
const FILE = process.env.REPORTS_FILE || path.join(process.cwd(), ".data", "reports.json");

export async function readReports(): Promise<Report[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Report[];
  } catch {
    return [];
  }
}

export async function addReport(r: Report): Promise<void> {
  const all = await readReports();
  all.unshift(r);
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
}
