import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function pickLargestVariant(files) {
  let best = null;
  let bestArea = -1;

  for (const file of files) {
    const m = file.match(/^(.*)-(\d+)x(\d+)\.(jpg|jpeg|png|webp)$/i);
    if (!m) continue;
    const w = Number(m[2]);
    const h = Number(m[3]);
    const area = w * h;
    if (area > bestArea) {
      bestArea = area;
      best = file;
    }
  }

  return best;
}

export function getGalleryImages() {
  const galleryDir = path.resolve(__dirname, "../../public/assets/gallery");
  if (!fs.existsSync(galleryDir)) return [];

  const files = fs
    .readdirSync(galleryDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  const groups = new Map();
  for (const f of files) {
    const m = f.match(/^(.*)-(\d+)x(\d+)\.(jpg|jpeg|png|webp)$/i);
    const key = m ? m[1] : f.replace(/\.(jpg|jpeg|png|webp)$/i, "");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(f);
  }

  const selected = [];
  for (const [_, groupFiles] of groups.entries()) {
    const best = pickLargestVariant(groupFiles) || groupFiles[0];
    selected.push(best);
  }

  selected.sort((a, b) => a.localeCompare(b));
  return selected.map((f) => `/assets/gallery/${f}`);
}
