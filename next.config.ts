// next.config.ts
import type { NextConfig } from "next";

const repo = "anchor-fantasy-mode";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",

  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;