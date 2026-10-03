// Jeff selected this public canonical address on 2026-10-03. Absolute URLs
// for canonical links, sitemap and Open Graph use it unless a local build
// explicitly supplies another origin. GitHub publication fixes this value;
// the optional Cloudflare build requires the separately approved www origin.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vivary-dev.github.io").replace(/\/$/, "");

// Explicit local/review builds can opt out of indexing. The public publisher
// sets NEXT_PUBLIC_PREVIEW=0. Preview mode never changes the canonical host
// by itself.
export const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

// Last substantive change per route, for the sitemap.
export const routes = [
  { path: "/", updated: "2026-10-03" },
  { path: "/what-is-vivary/", updated: "2026-10-03" },
  { path: "/commands/", updated: "2026-10-03" },
] as const;
