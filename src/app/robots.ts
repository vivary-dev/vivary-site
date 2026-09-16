import type { MetadataRoute } from "next";
import { PREVIEW, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Every page is for people and for agents. Search and AI crawlers are
// welcome everywhere. See docs/brand/09-humans-and-agents.md.
export default function robots(): MetadataRoute.Robots {
  if (PREVIEW) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
