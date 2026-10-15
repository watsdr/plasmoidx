// Submits every URL in the built sitemap to IndexNow (Bing, Yandex, Seznam, Naver, ...).
// The key is public by design: it must be served at https://plasmoidx.com/<key>.txt.
// Never fatal: a failure only logs a warning and exits 0 so it cannot break a deploy.
// Usage: node scripts/indexnow.mjs [--dry-run]   (run after `npm run build`; reads out/sitemap.xml)
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const HOST = "plasmoidx.com";
const KEY = "4a148e972e18ed4c8152bde8b0dc014f";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const dry = process.argv.includes("--dry-run");

async function main() {
  const file = join(process.cwd(), "out", "sitemap.xml");
  if (!existsSync(file)) {
    console.warn("indexnow: out/sitemap.xml not found; run npm run build first. Skipping.");
    return;
  }
  const urls = [...readFileSync(file, "utf8").matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => u.startsWith(`https://${HOST}/`));
  if (urls.length === 0) {
    console.warn("indexnow: no URLs found in sitemap. Skipping.");
    return;
  }
  const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls };
  console.log(`indexnow: ${urls.length} URL(s) for ${HOST}${dry ? " (dry run, not sending)" : ""}`);
  if (dry) return;
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = (await res.text()).slice(0, 300);
  // 200 = accepted, 202 = accepted (key validation pending); 4xx/5xx = problem.
  console.log(`indexnow: HTTP ${res.status} ${res.statusText} ${text}`);
  if (res.status !== 200 && res.status !== 202) console.warn("indexnow: unexpected status (non-fatal).");
}

main().catch((err) => console.warn("indexnow: failed (non-fatal):", err?.message ?? err));
