// The production domain is undecided. Absolute URLs (canonical, sitemap,
// Open Graph) come from NEXT_PUBLIC_SITE_URL at build time. Without it the
// build uses the local preview origin, which is visibly not production.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3177").replace(/\/$/, "");

// A preview host is not the site. Set NEXT_PUBLIC_PREVIEW=1 for any build
// that goes to a temporary address: every page carries noindex and robots
// disallows all crawling, so nothing is published before the app ships.
export const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

// Last substantive change per route, for the sitemap.
export const routes = [
  { path: "/", updated: "2026-09-16" },
  { path: "/what-is-vivary/", updated: "2026-09-16" },
  { path: "/commands/", updated: "2026-09-16" },
] as const;
