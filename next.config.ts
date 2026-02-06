// next.config.ts
import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === "production" && process.env.GITHUB_PAGES === "true";

const repo = "anchor-fantasy-mode";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `https://alexiavalen.github.io/${repo}/` : "",
};

export default nextConfig;