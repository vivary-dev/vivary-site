import type { MetadataRoute } from "next";
import { SITE_URL, routes } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(r.updated),
    changeFrequency: "monthly",
    priority: r.path === "/" ? 1 : 0.7,
  }));
}
