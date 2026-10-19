import Link from "next/link";
import type { ReactNode } from "react";
import { facts } from "@/content/facts";
import { docArticle, docArticles, docNeighbors, docPath, docsUpdated } from "@/content/docs";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { AgentsLine, GuideNav, JsonLd, Shell } from "../shell";
import "../docs.css";

// Shared frame for every documentation article. Each article page supplies
// only its sections. Titles, order, neighbors and related links come from
// src/content/docs.json.

export function docMetadata(slug: string) {
  const article = docArticle(slug);
  return pageMetadata(`${article.title} · Vivary docs`, article.description, docPath(slug));
}

// The search form sends the query to the docs index, which runs the search.
// It works without JavaScript on any static host. The Markdown export skips it.
export function DocsSearchForm({ id }: { id: string }) {
  return (
    <form className="docs-search-form" role="search" action="/docs/" method="get" data-export-skip="">
      <label htmlFor={id}>Search the docs</label>
      <div>
        <input id={id} type="search" name="q" autoComplete="off" spellCheck={false} />
        <button type="submit" className="btn">Search</button>
      </div>
    </form>
  );
}

export function DocsList({ current }: { current?: string }) {
  return (
    <nav className="docs-list" aria-label="Documentation articles">
      <p><Link href="/docs/">All articles</Link></p>
      <ol>
        {docArticles.map((item) => (
          <li key={item.slug}>
            <Link href={docPath(item.slug)} aria-current={item.slug === current ? "page" : undefined}>{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function DocPage({ slug, sections, children }: { slug: string; sections: { id: string; label: string }[]; children: ReactNode }) {
  const article = docArticle(slug);
  const { previous, next } = docNeighbors(slug);
  const related = article.related.map(docArticle);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}${docPath(slug)}`,
    dateModified: docsUpdated,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Vivary", url: `${SITE_URL}/` },
    about: { "@type": "SoftwareApplication", name: "Vivary", operatingSystem: "Windows" },
  };
  return (
    <Shell current="docs">
      <JsonLd data={jsonLd} />
      <article className="docs">
        <header className="docs-head">
          <div className="wrap">
            <p className="eyebrow"><Link href="/docs/">Vivary docs</Link></p>
            <h1 className="display">{article.title}</h1>
            <p className="define">{article.summary}</p>
            <p className="docs-status">{facts.product.status}</p>
            <AgentsLine />
            <GuideNav items={sections.map((section) => ({ href: `#${section.id}`, label: section.label }))} />
          </div>
        </header>
        <div className="wrap docs-grid">
          <aside className="docs-side">
            <DocsSearchForm id="docs-search-side" />
            <DocsList current={slug} />
          </aside>
          <div className="docs-body">
            {children}
            <footer className="docs-foot">
              {related.length > 0 && (
                <section aria-labelledby="related">
                  <h2 id="related">Related articles</h2>
                  <ul>
                    {related.map((item) => (
                      <li key={item.slug}><Link href={docPath(item.slug)}>{item.title}</Link></li>
                    ))}
                  </ul>
                </section>
              )}
              <nav className="docs-pager" aria-label="Previous and next articles">
                {previous ? (
                  <Link href={docPath(previous.slug)} rel="prev"><span>Previous</span>{previous.title}</Link>
                ) : <span />}
                {next ? (
                  <Link href={docPath(next.slug)} rel="next"><span>Next</span>{next.title}</Link>
                ) : <span />}
              </nav>
            </footer>
          </div>
        </div>
      </article>
    </Shell>
  );
}

// One task or topic inside an article. The id is a stable anchor that other
// articles and the search index link to.
export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="docs-section" data-search-section="">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="docs-steps">{children}</ol>;
}

// A label the user sees in Vivary or Windows, spelled exactly as shown.
export function Ui({ children }: { children: ReactNode }) {
  return <strong className="ui">{children}</strong>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="docs-note">{children}</p>;
}

export function Code({ children }: { children: string }) {
  return <pre className="docs-code"><code>{children}</code></pre>;
}

export function DocTable({ caption, head, rows }: { caption: string; head: [string, string]; rows: [ReactNode, ReactNode][] }) {
  return (
    <table className="docs-table">
      <caption>{caption}</caption>
      <thead>
        <tr><th scope="col">{head[0]}</th><th scope="col">{head[1]}</th></tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td data-label={head[0]}>{row[0]}</td>
            <td data-label={head[1]}>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
