import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for the public site on Cloudflare Pages.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  /* config options here */
};

export default nextConfig;
