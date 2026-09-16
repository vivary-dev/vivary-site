import Link from "next/link";
import type { ReactNode } from "react";
import { Big_Shoulders, Fraunces } from "next/font/google";
import { facts } from "@/content/facts";
import { MobileNav, type NavItem } from "./mobile-nav";
import "./home.css";
import "./pages.css";

// Three faces, one job each. The display face for the claim, the serif
// italic only where the file itself speaks, and Geist Mono (from the root
// layout) for the record. The app interior uses Geist Sans, also from the
// root layout. No Inter anywhere, decided 2026-09-16.
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

// The header navigation from the design canvas. Section links resolve on
// the home page; other routes prefix them with the home path.
const sections: NavItem[] = [
  { href: "/#for", label: "Who it is for" },
  { href: "/#how", label: "How it works" },
  { href: "/#memory", label: "Memory" },
  { href: "/#projects", label: "Projects" },
  { href: "/#engine", label: "Engine" },
  { href: "/#status", label: "Status" },
];

const pages: NavItem[] = [
  { href: "/what-is-vivary/", label: "What it is" },
  { href: "/commands/", label: "Commands" },
];

const github: NavItem = { href: facts.links.org, label: "GitHub", external: true };

export function Shell({ current, children }: { current: Route; children: ReactNode }) {
  const items: NavItem[] = current === "home" ? [...sections, github] : [...pages, ...sections.slice(0, 1), github];
  const routeOf = (href: string): Route | undefined =>
    href === "/what-is-vivary/" ? "what" : href === "/commands/" ? "commands" : undefined;
  return (
    <div className={`v9 ${display.variable} ${voice.variable}`}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="top">
        <div className="wrap">
          <Link className="brand" href="/" aria-label="Vivary home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/vivary-lockup-horizontal-bone.svg" alt="Vivary" width={173} height={88} />
          </Link>
          <nav aria-label="Site">
            {items.map((n) =>
              n.external ? (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ) : (
                <Link key={n.href} href={n.href} aria-current={routeOf(n.href) === current ? "page" : undefined}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
          <MobileNav items={items} />
        </div>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="wrap">
          <div className="made">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/vivary-mark-jar-bone.svg" alt="" width={28} height={28} />
            <span>Vivary is made by The Little AI Company.</span>
          </div>
          <nav aria-label="Footer">
            <a href={facts.links.org}>GitHub</a>
            <Link href="/#status">Status</Link>
            <Link href="/what-is-vivary/">What it is</Link>
            <Link href="/commands/">Commands</Link>
            <a href="/llms.txt">For agents</a>
            <a href="mailto:support@vivary.dev">Email</a>
          </nav>
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
