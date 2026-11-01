import type { Metadata } from "next";
import { SITE_URL } from "./site";

// Next replaces nested social metadata rather than merging individual fields.
// Keep the approved image when giving each page its own title and description.
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, types: { "text/markdown": `${path}index.md` } },
    openGraph: {
      type: "website",
      siteName: "Vivary",
      title,
      description,
      url: `${SITE_URL}${path}`,
      images: [{
        url: "/brand/vivary-social-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Vivary. It knows you. Because you wrote it down.",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/vivary-social-1200x630.png"],
    },
  };
}
