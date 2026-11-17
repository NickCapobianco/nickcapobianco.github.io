/**
 * Publishes the static build to the repository root, where GitHub Pages
 * ("Deploy from a branch", main, / root) serves it. No GitHub Actions needed.
 *
 *   cd site && npm run publish     # build + copy out/ to the repo root
 *
 * The top-level entries it copies are recorded in `.published.json` at the
 * root; the next publish removes exactly those before copying, so stale files
 * never linger and nothing else at the root (the source, README, LICENSE) is
 * ever touched.
 */
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(siteDir, "..");
const outDir = join(siteDir, "out");
const manifestPath = join(repoRoot, ".published.json");

// Entries at the root that belong to the repository, never to a build.
const PROTECTED = new Set([".git", ".gitignore", ".nojekyll", ".published.json", "site", "README.md", "LICENSE"]);

if (!existsSync(join(outDir, "index.html"))) {
  console.error("publish: site/out/index.html is missing. Run `next build` first.");
  process.exit(1);
}

// 1. Remove what the previous publish put at the root.
const previous = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : [];
for (const name of previous) {
  if (PROTECTED.has(name) || name.includes("/") || name.includes("..")) continue;
  rmSync(join(repoRoot, name), { recursive: true, force: true });
}

// 2. Copy the new build in.
const entries = readdirSync(outDir).filter((name) => !PROTECTED.has(name));
for (const name of entries) {
  cpSync(join(outDir, name), join(repoRoot, name), { recursive: true });
}

// 3. Keep Jekyll off (it would hide the `_next` folder) and record what we wrote.
writeFileSync(join(repoRoot, ".nojekyll"), "");
writeFileSync(manifestPath, JSON.stringify(entries.sort(), null, 2) + "\n");

console.log(`publish: copied ${entries.length} entries to the repository root.`);
