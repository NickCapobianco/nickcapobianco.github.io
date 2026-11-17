import type { NextConfig } from "next";

/**
 * Static export: `next build` writes a fully static site to `out/`,
 * which GitHub Pages (or Cloudflare Pages) serves as-is.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
