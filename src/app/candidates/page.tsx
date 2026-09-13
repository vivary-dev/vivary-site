import Link from "next/link";

const candidates = [
  { slug: "c1", name: "Strata", note: "Dark field, the product mint, the vivarium cross-section as the hero." },
  { slug: "c2", name: "Workspace", note: "Light and editorial. The hero is a real workspace: a file tree whose files are the copy." },
  { slug: "c3", name: "Ledger", note: "Paper and ink with one cobalt accent. The hero is the published-truth table and a dithered chart of real signals." },
  { slug: "c4", name: "Terrarium", note: "Warm and generative. Dithered gradient washes and a serif display face. The hero blooms." },
  { slug: "c5", name: "Console", note: "Product shot first. A drawn app frame, bold sans, three proof columns." },
];

export default function CandidatesIndex() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Five landing candidates</h1>
      <p className="mt-3 text-muted-foreground">
        Same facts, five directions. Throwaway prototypes for a design decision. Each is one page.
      </p>
      <ol className="mt-10 space-y-4">
        {candidates.map((c, i) => (
          <li key={c.slug} className="border-t border-border pt-4">
            <Link href={`/candidates/${c.slug}`} className="text-lg font-medium underline-offset-4 hover:underline">
              {i + 1}. {c.name}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
