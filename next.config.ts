import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export. The final site is hosted on Cloudflare (decided 2026-09-13).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  /* config options here */
};

export default nextConfig;
