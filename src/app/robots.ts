import type { MetadataRoute } from "next";
import { PREVIEW, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Every page is for people and for agents. Search and AI crawlers are
// welcome for discovery. Training controls stay separate. See the brand guide
// docs/brand/09-humans-and-agents.md.
export default function robots(): MetadataRoute.Robots {
  if (PREVIEW) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Public discovery does not grant new model-training permission.
      // Keep these blocked as they were under the previous global disallow.
      // Google-Extended also controls Gemini grounding, but not Google Search.
      {
        userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended"],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
