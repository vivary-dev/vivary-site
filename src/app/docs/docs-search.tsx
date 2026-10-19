"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

// Client-side search over the documentation. The build writes
// /docs/search-index.json from the exported article HTML (scripts/export-docs.py),
// so search needs no server, database or third-party service. The query lives
// in ?q= so the search form on every article, and a shared link, land here.

type Section = { id: string; heading: string; text: string };
type Entry = { path: string; title: string; summary: string; sections: Section[] };
type Hit = { key: string; href: string; title: string; heading: string; snippet: ReactNode; score: number };

const INDEX_URL = "/docs/search-index.json";
const LIMIT = 30;

function terms(query: string) {
  return [...new Set(query.toLowerCase().split(/\s+/).map((t) => t.replace(/^["'(]+|["'),.;:!?]+$/g, "")).filter(Boolean))];
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// A term matches only where a word starts, so "review" finds "Review connection"
// but not "preview". A term can still be the start of a longer word: "check" finds "checksum".
const NOT_AFTER_WORD = "(?<![\\p{L}\\p{N}])";
const atWordStart = (term: string) => new RegExp(NOT_AFTER_WORD + escapeRegExp(term), "iu");

function snippet(text: string, words: string[], phrase: string): ReactNode {
  const firstMatch = (term: string) => text.search(atWordStart(term));
  let at = phrase ? firstMatch(phrase) : -1;
  if (at < 0) at = Math.min(...words.map(firstMatch).filter((i) => i >= 0), text.length);
  if (at >= text.length) at = 0;
  let start = Math.max(0, at - 70);
  let end = Math.min(text.length, at + 170);
  if (start > 0) start = text.indexOf(" ", start) + 1 || start;
  if (end < text.length) end = text.lastIndexOf(" ", end) > at ? text.lastIndexOf(" ", end) : end;
  const excerpt = text.slice(start, end);
  const pattern = new RegExp(`${NOT_AFTER_WORD}(${[phrase, ...words].filter(Boolean).sort((a, b) => b.length - a.length).map(escapeRegExp).join("|")})`, "giu");
  return (
    <>
      {start > 0 && "… "}
      {excerpt.split(pattern).map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part))}
      {end < text.length && " …"}
    </>
  );
}

function search(index: Entry[], query: string): Hit[] {
  const words = terms(query);
  const phrase = query.trim().toLowerCase().replace(/\s+/g, " ");
  if (phrase.length < 2 || words.length === 0) return [];
  const wordPatterns = words.map(atWordStart);
  const phrasePattern = atWordStart(phrase);
  const hits: Hit[] = [];
  for (const entry of index) {
    const parts: Section[] = [{ id: "", heading: "", text: entry.summary }, ...entry.sections];
    for (const part of parts) {
      const { title } = entry;
      const { heading, text } = part;
      const haystack = `${title} ${heading} ${text}`;
      if (!wordPatterns.every((w) => w.test(haystack))) continue;
      let score = 0;
      if (phrasePattern.test(text) || phrasePattern.test(heading)) score += 10;
      for (const w of wordPatterns) {
        if (w.test(heading)) score += 3;
        if (w.test(title)) score += 2;
      }
      hits.push({
        key: `${entry.path}#${part.id}`,
        href: part.id ? `${entry.path}#${part.id}` : entry.path,
        title: entry.title,
        heading: part.heading,
        snippet: snippet(part.text, words, phrase),
        score,
      });
    }
  }
  // Array.prototype.sort is stable, so equal scores keep reading order.
  return hits.sort((a, b) => b.score - a.score).slice(0, LIMIT);
}

export function DocsSearch() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Entry[] | "loading" | "error">("loading");

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    // Reading the URL once after hydration keeps the static HTML identical for every query.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial) setQuery(initial);
    let live = true;
    fetch(INDEX_URL)
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<{ articles: Entry[] }>;
      })
      .then((data) => live && setIndex(data.articles))
      .catch(() => live && setIndex("error"));
    return () => {
      live = false;
    };
  }, []);

  const hits = useMemo(() => (Array.isArray(index) ? search(index, query) : []), [index, query]);
  const trimmed = query.trim();

  function update(value: string) {
    setQuery(value);
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }

  let status = "";
  if (index === "error") status = "Search could not load. Browse the articles below.";
  else if (trimmed.length === 1) status = "Type at least two characters.";
  else if (trimmed && index === "loading") status = "Loading search…";
  else if (trimmed) status = hits.length === 0 ? `No results for “${trimmed}”. Try fewer or different words.` : `${hits.length === LIMIT ? `First ${LIMIT}` : hits.length} result${hits.length === 1 ? "" : "s"} for “${trimmed}”.`;

  return (
    <div className="docs-search" role="search">
      <label htmlFor="docs-search">Search all articles</label>
      <input
        id="docs-search"
        type="search"
        value={query}
        onChange={(event) => update(event.target.value)}
        placeholder="For example: checksum, Review connection, STATE.md"
        autoComplete="off"
        spellCheck={false}
        aria-describedby="docs-search-status"
      />
      <p id="docs-search-status" className="docs-search-status" role="status" aria-live="polite">{status}</p>
      {hits.length > 0 && (
        <ol className="docs-results">
          {hits.map((hit) => (
            <li key={hit.key}>
              <a href={hit.href}>
                <span className="docs-result-title">
                  {hit.title}
                  {hit.heading && <span> / {hit.heading}</span>}
                </span>
                <span className="docs-result-text">{hit.snippet}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
