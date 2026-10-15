// Builds src/content/blur.json: a ~16px blurred preview per image, inlined as the
// next/image placeholder so slow connections see the photo's shape and tone instantly.
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public/images");
const out = {};
for (const file of (await readdir(dir)).filter((f) => f.endsWith(".jpg")).sort()) {
  const buf = await sharp(path.join(dir, file)).resize(16).blur(1).jpeg({ quality: 40 }).toBuffer();
  out[`/images/${file}`] = `data:image/jpeg;base64,${buf.toString("base64")}`;
}
await writeFile(path.join(process.cwd(), "src/content/blur.json"), JSON.stringify(out, null, 0) + "\n");
console.log(`blur placeholders: ${Object.keys(out).length}`);
