import type { NextConfig } from "next";

const repo = "anchor-fantasy-mode"; // ✅ repo name ONLY

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

export default nextConfig;