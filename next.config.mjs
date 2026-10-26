import { execSync } from "node:child_process";

/** Stable build ID: the git commit, so identical sources give identical output paths. */
function gitSha() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 12);
  try {
    return execSync("git rev-parse --short=12 HEAD").toString().trim();
  } catch {
    return "plasmoidx";
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  generateBuildId: async () => gitSha(),
  webpack: (config) => {
    // Merged chunks keep a list of ids whose order depended on async entry
    // order, so identical sources produced different chunk bytes and hashes.
    // Keep the primary id first and sort the rest.
    config.plugins.push({
      apply(compiler) {
        compiler.hooks.compilation.tap("StableChunkIds", (compilation) => {
          compilation.hooks.afterOptimizeChunkIds.tap("StableChunkIds", (chunks) => {
            for (const chunk of chunks) {
              if (!Array.isArray(chunk.ids) || chunk.ids.length < 2) continue;
              const [first, ...rest] = chunk.ids.includes(chunk.id)
                ? [chunk.id, ...chunk.ids.filter((x) => x !== chunk.id)]
                : chunk.ids;
              rest.sort((a, b) => String(a).localeCompare(String(b), "en", { numeric: true }));
              chunk.ids = [first, ...rest];
            }
          });
        });
      },
    });
    return config;
  },
};

export default nextConfig;
