import { rm } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("_site");

if (path.basename(outputDir) !== "_site") {
  throw new Error(`Refusing to clean unexpected output directory: ${outputDir}`);
}

await rm(outputDir, { recursive: true, force: true });
