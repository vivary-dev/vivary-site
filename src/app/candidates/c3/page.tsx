import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import { facts } from "@/content/facts";
import { CopyCommand } from "./copy-command";
import { SignalChart } from "./signal-chart";
import "./c3.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--c3-font-display",
  display: "swap",
});

const bodyFont = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--c3-font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivary, what is published today",
  description: facts.productLine,
};

const registries = [...new Set(facts.shipped.packages.map((p) => p.registry))];

const whatItIs = [
  { title: "Files persist", text: facts.claims[0] },
  {
    title: "The bounded capsule",
    text: "The agent gets a bounded capsule of context.",
  },
  { title: "The receipt", text: "A receipt records what it saw." },
  { title: "What stays on your machine", text: facts.claims[4] },
];

const footerLinks = [
  { label: "Source on GitHub", href: facts.links.github },
  { label: "Documentation", href: facts.links.docs },
  { label: "create-vivary on PyPI", href: facts.links.pypi },
  { label: "@vivary/create on npm", href: facts.links.npm },
];

export default function LedgerCandidate() {
  return (
    <main className={`c3 ${display.variable} ${bodyFont.variable}`}>
      <div className="c3-wrap">
        <header className="c3-masthead">
          <span className="c3-mark">{facts.name}</span>
          <p>{facts.productLine}</p>
        </header>

        <div className="c3-headline">
          <h1 className="c3-display">Chat fades, files persist.</h1>
        </div>

        <div className="c3-hero">
          <div>
            <p className="c3-lede">
              Vivary is the part that decides which of those files your agent
              gets to see, and shows you what it saw.
            </p>
            <p className="c3-sub">
              It runs on your machine. No account, no cloud control plane, no
              telemetry from the workspace.
            </p>

            <p className="c3-cta-label">Start a workspace</p>
            <CopyCommand command={facts.shipped.install} />
            <p className="c3-cmd-note">
              Or with npm: <code>{facts.shipped.installNpm}</code>
            </p>

            <a className="c3-second" href={facts.links.github}>
              Read the source on GitHub
            </a>
          </div>

          <section className="c3-statement" aria-label="Published packages">
            <div className="c3-statement-head">
              <h2>Published packages</h2>
              <span className="c3-verified">
                Verified {facts.shipped.verifiedOn}
              </span>
            </div>

            <div className="c3-statement-body">
              {facts.shipped.packages.map((pkg) => (
                <div className="c3-pkg" key={pkg.name}>
                  <div>
                    <div className="c3-pkg-name">{pkg.name}</div>
                    <div className="c3-pkg-reg">{pkg.registry}</div>
                  </div>
                  <div className="c3-pkg-ver">{pkg.version}</div>
                </div>
              ))}
              <div className="c3-pkg-total">
                <span>{facts.shipped.packages.length} packages</span>
                <span>{registries.length} registries</span>
              </div>
            </div>

            <div className="c3-strip">
              <div className="c3-strip-head">
                <p>Weekly downloads reported by the two registries.</p>
                <div className="c3-legend">
                  <span>
                    <i
                      className="c3-swatch"
                      style={{ background: "#358ff3" }}
                      aria-hidden="true"
                    />
                    PyPI
                  </span>
                  <span>
                    <i
                      className="c3-swatch"
                      style={{ background: "#8c8c96" }}
                      aria-hidden="true"
                    />
                    npm
                  </span>
                </div>
              </div>
              <SignalChart />
              <div className="c3-strip-foot">
                <span>21 June 2026</span>
                <span>6 July 2026</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="c3-sec">
        <div className="c3-wrap c3-sec-grid">
          <div>
            <h2 className="c3-display">What it is</h2>
            <p className="c3-sec-note">
              A workspace your agent reads from, and a record of what it read.
            </p>
          </div>
          <div>
            {whatItIs.map((entry) => (
              <div className="c3-entry" key={entry.title}>
                <h3>{entry.title}</h3>
                <p>{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="c3-sec">
        <div className="c3-wrap c3-sec-grid">
          <div>
            <h2 className="c3-display">What you can install today</h2>
            <p className="c3-sec-note">
              The six packages above carry the versions checked on{" "}
              {facts.shipped.verifiedOn}.
            </p>
          </div>
          <div>
            <p className="c3-prose">
              A new workspace starts with five small files. Nothing else is
              written until real work needs it.
            </p>
            <ul className="c3-files">
              {facts.shipped.fiveFiles.map((file) => (
                <li key={file}>{file}</li>
              ))}
            </ul>
            <div className="c3-entry">
              <h3>Adopting a project you already have</h3>
              <p>{facts.claims[1]}</p>
            </div>
            <div className="c3-entry">
              <h3>Checking the workspace</h3>
              <p>{facts.claims[2]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="c3-sec">
        <div className="c3-wrap c3-sec-grid">
          <div>
            <h2 className="c3-display">The four layers</h2>
            <p className="c3-sec-note">
              What each published layer is responsible for.
            </p>
          </div>
          <div>
            {facts.layers.map((layer) => (
              <div className="c3-entry" key={layer.name}>
                <h3 className="c3-pkg-name">{layer.name}</h3>
                <p>{layer.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="c3-sec">
        <div className="c3-wrap c3-sec-grid">
          <div>
            <h2 className="c3-display">Not shipped yet</h2>
            <p className="c3-sec-note">
              Listed here so the record stays complete.
            </p>
          </div>
          <div className="c3-dev">
            <h3>{facts.inDevelopment.label}</h3>
            <p>{facts.inDevelopment.summary}</p>
            <p>Not released. There is nothing to install yet.</p>
          </div>
        </div>
      </section>

      <footer className="c3-foot">
        <div className="c3-wrap">
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="c3-wrap">
          <p>
            Every figure on this page comes from the published record. Package
            versions verified {facts.shipped.verifiedOn}. Download counts read
            from the project stats file on 2026-09-13.
          </p>
        </div>
      </footer>
    </main>
  );
}
