// Post-export: inline the site stylesheet(s) into each HTML file so first paint
// doesn't wait on a separate CSS request (mobile LCP). Files stay on disk for
// client-side navigations that request them by URL.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const cache = new Map();
let pages = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name !== "_next") walk(p);
    } else if (name.endsWith(".html")) inline(p);
  }
}

function inline(file) {
  let html = readFileSync(file, "utf8");
  const re = /<link rel="stylesheet" href="(\/_next\/static\/css\/[^"]+\.css)"[^>]*\/?>/g;
  let changed = false;
  html = html.replace(re, (_m, href) => {
    if (!cache.has(href)) cache.set(href, readFileSync(join(OUT, href), "utf8"));
    changed = true;
    return `<style data-href="${href}">${cache.get(href)}</style>`;
  });
  if (changed) {
    writeFileSync(file, html);
    pages++;
  }
}

walk(OUT);
console.log(`inline-css: ${pages} pages, ${cache.size} stylesheet(s)`);
