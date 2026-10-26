import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITEMAP_ROUTES, absUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Commit date, not build time, so identical sources give an identical sitemap.
  let lastModified: Date;
  try {
    lastModified = new Date(execSync("git log -1 --format=%cI").toString().trim());
  } catch {
    lastModified = new Date("2026-01-01T00:00:00Z");
  }
  return SITEMAP_ROUTES.map((r) => ({
    url: absUrl(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
