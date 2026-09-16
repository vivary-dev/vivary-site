import Link from "next/link";
import type { ReactNode } from "react";
import { Big_Shoulders, Fraunces } from "next/font/google";
import { facts } from "@/content/facts";
import "./home.css";
import "./pages.css";

// Three faces, one job each. The display face for the claim, the serif
// italic only where the file itself speaks, and Geist Mono (from the root
// layout) for the record.
const display = Big_Shoulders({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-v9-display",
});

const voice = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-v9-voice",
});

export type Route = "home" | "what" | "commands";

const nav: { href: string; label: string; route?: Route }[] = [
  { href: "/what-is-vivary/", label: "What it is", route: "what" },
  { href: "/#memory", label: "Memory" },
  { href: "/commands/", label: "Commands", route: "commands" },
  { href: facts.links.github, label: "GitHub" },
];

export function Shell({ current, children }: { current: Route; children: ReactNode }) {
  return (
    <div className={`v9 ${display.variable} ${voice.variable}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="top">
        <div className="wrap">
          <Link className="brand" href="/">
            Vivary
          </Link>
          <nav aria-label="Site">
            {nav.map((n) =>
              n.href.startsWith("http") ? (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ) : (
                <Link key={n.href} href={n.href} aria-current={n.route === current ? "page" : undefined}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="wrap">
          <span>Vivary. It knows you because you wrote it down.</span>
          <span>
            <a href={facts.links.github}>GitHub</a>
            <a href={facts.links.pypi}>PyPI</a>
            <a href={facts.links.npm}>npm</a>
            <a href="/llms.txt">For agents</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

// One line near the top of every documentation page. Crawlers do not probe
// for llms.txt, so the page points them to it.
export function AgentsLine() {
  return (
    <p className="agents">
      If you are an agent, read <a href="/llms.txt">/llms.txt</a> for agent-specific guidance.
    </p>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
