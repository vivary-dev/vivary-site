import data from "./docs.json";

// The documentation section. docs.json is the one list of articles, in
// reading order. The sitemap, the Markdown export, the export checks and the
// agent guide all read it, so an article exists everywhere or nowhere.
export type DocArticle = {
  slug: string;
  label: string;
  title: string;
  description: string;
  summary: string;
  related: string[];
};

export const docsUpdated: string = data.updated;
export const docArticles: DocArticle[] = data.articles;
export const docPath = (slug: string) => `/docs/${slug}/`;

export function docArticle(slug: string): DocArticle {
  const article = docArticles.find((item) => item.slug === slug);
  if (!article) throw new Error(`Unknown documentation article: ${slug}`);
  return article;
}

export function docNeighbors(slug: string) {
  const index = docArticles.findIndex((item) => item.slug === slug);
  return { previous: docArticles[index - 1], next: docArticles[index + 1] };
}
