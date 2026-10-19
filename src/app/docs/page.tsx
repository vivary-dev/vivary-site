import Link from "next/link";
import { facts } from "@/content/facts";
import { docArticles, docPath } from "@/content/docs";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { AgentsLine, JsonLd, Shell } from "../shell";
import { DocsSearch } from "./docs-search";
import "../docs.css";

// The docs index: one search box over every article, then the articles in
// reading order. The list is plain HTML, so it works without JavaScript.

export const metadata = pageMetadata(
  "Vivary documentation: install and use the desktop app",
  "Task-based guides for the Vivary desktop app on Windows: installation, coding runtimes, projects, conversations, handoffs, remote access and troubleshooting.",
  "/docs/",
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Vivary documentation",
  url: `${SITE_URL}/docs/`,
  isPartOf: { "@type": "WebSite", name: "Vivary", url: `${SITE_URL}/` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: docArticles.map((article, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: article.title,
      url: `${SITE_URL}${docPath(article.slug)}`,
    })),
  },
};

export default function DocsIndex() {
  return (
    <Shell current="docs">
      <JsonLd data={jsonLd} />
      <header className="docs-head">
        <div className="wrap">
          <p className="eyebrow">Vivary docs</p>
          <h1 className="display">Vivary documentation</h1>
          <p className="define">
            These guides explain how to install and use the Vivary desktop app on Windows. Each
            article covers one job with numbered steps.
          </p>
          <p className="docs-status">{facts.product.status}</p>
          <AgentsLine />
        </div>
      </header>
      <div className="wrap docs-index">
        <DocsSearch />
        <ol className="docs-cards" aria-label="Articles">
          {docArticles.map((article, i) => (
            <li key={article.slug}>
              <span className="num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h2><Link href={docPath(article.slug)}>{article.title}</Link></h2>
              <p>{article.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  );
}
