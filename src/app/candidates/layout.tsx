import Link from "next/link";

export default function CandidatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        aria-label="Candidate switcher"
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-neutral-300 bg-white/95 px-2 py-1 text-xs text-neutral-800 shadow-none backdrop-blur"
      >
        <Link href="/candidates" className="px-2 py-1 hover:underline">All</Link>
        {[1, 2, 3, 4, 5].map((n) => (
          <Link key={n} href={`/candidates/c${n}`} className="px-2 py-1 hover:underline">
            {n}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
}
