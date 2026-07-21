import { v2 as cloudinary } from "cloudinary";

export function cloudinaryConfigured(): boolean {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) return false;
  cloudinary.config({ cloud_name: cloud, api_key: key, api_secret: secret, secure: true });
  return true;
}

// Folderul de bază din Cloudinary de unde luăm pozele/video-urile de pe șantier.
export const SANTIER_FOLDER = process.env.SANTIER_FOLDER || "scoala13/santier";

export type SantierItem = {
  url: string;
  type: "image" | "video";
  folder: string; // subfolderul (ex. "2026-07-16") — folosit ca grupare/dată
  createdAt: string;
};

// Listează toate pozele/video-urile din folderul de șantier (inclusiv subfoldere).
export async function listSantier(): Promise<SantierItem[]> {
  if (!cloudinaryConfigured()) return [];
  const prefix = SANTIER_FOLDER.replace(/\/$/, "") + "/";

  async function fetchType(resource_type: "image" | "video"): Promise<SantierItem[]> {
    try {
      const res = await cloudinary.api.resources({
        type: "upload",
        resource_type,
        prefix,
        max_results: 300,
      });
      return (res.resources || []).map((r: { public_id: string; secure_url: string; created_at: string }) => {
        const rest = r.public_id.slice(prefix.length); // "subfolder/nume" sau "nume"
        const parts = rest.split("/");
        const folder = parts.length > 1 ? parts[0] : "";
        return { url: r.secure_url, type: resource_type, folder, createdAt: r.created_at };
      });
    } catch {
      return [];
    }
  }

  const [imgs, vids] = await Promise.all([fetchType("image"), fetchType("video")]);
  return [...imgs, ...vids].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
