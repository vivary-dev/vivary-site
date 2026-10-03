import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for the public GitHub Pages site (selected 2026-10-03).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  /* config options here */
};

export default nextConfig;
