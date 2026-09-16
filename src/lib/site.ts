// The production domain is undecided. Absolute URLs (canonical, sitemap,
// Open Graph) come from NEXT_PUBLIC_SITE_URL at build time. Without it the
// build uses the local preview origin, which is visibly not production.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3177").replace(/\/$/, "");

// Last substantive change per route, for the sitemap.
export const routes = [
  { path: "/", updated: "2026-09-16" },
  { path: "/what-is-vivary/", updated: "2026-09-16" },
  { path: "/commands/", updated: "2026-09-16" },
] as const;
