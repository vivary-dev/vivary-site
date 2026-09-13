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
  title: "Vivary, a desktop workspace for your files",
  description: facts.product.line,
};

// Each promise opens with a short lead phrase, then explains it. The ledger
// sets the lead as the row label and the rest as the row text.
function splitPromise(promise: string) {
  const cut = promise.indexOf(". ");
  if (cut === -1) return { label: promise, text: "" };
  return { label: promise.slice(0, cut), text: promise.slice(cut + 2) };
}

const registries = [...new Set(facts.shipped.packages.map((p) => p.registry))];

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
        </header>

        <div className="c3-headline">
          <h1 className="c3-display">{facts.product.meet}</h1>
          <p className="c3-headline-line">{facts.product.line}</p>
        </div>

        <div className="c3-open">
          <p className="c3-lede">{facts.product.what}</p>
          <a className="c3-primary" href={facts.links.github}>
            Read the source on GitHub
          </a>
        </div>
      </div>

      <div className="c3-wrap">
        <section className="c3-statement" aria-label="What Vivary does">
          <div className="c3-statement-head">
            <h2>What Vivary does</h2>
            <p className="c3-status">{facts.product.status}</p>
          </div>

          <div className="c3-ledger">
            {facts.product.promises.map((promise) => {
              const { label, text } = splitPromise(promise);
              return (
                <div className="c3-promise" key={label}>
                  <h3>{label}</h3>
                  <p>{text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="c3-sec">
        <div className="c3-wrap c3-sec-grid">
          <div>
            <h2 className="c3-display">Also in the program</h2>
            <p className="c3-sec-note">
              The rest of the work the app is being built around.
            </p>
          </div>
          <ul className="c3-list">
            {facts.product.alsoInTheProgram.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="c3-sec">
        <div className="c3-wrap c3-sec-grid">
          <div>
            <h2 className="c3-display">{facts.engine.line}</h2>
            <p className="c3-sec-note">
              The library the desktop app runs on. You can use it from the
              command line right now.
            </p>
          </div>
          <div>
            <p className="c3-prose">{facts.engine.summary}</p>

            {facts.layers.map((layer) => (
              <div className="c3-entry" key={layer.name}>
                <h3 className="c3-pkg-name">{layer.name}</h3>
                <p>{layer.role}</p>
              </div>
            ))}

            <p className="c3-cmd-label">Install the engine</p>
            <CopyCommand command={facts.shipped.install} />
            <p className="c3-cmd-note">
              Or with npm: <code>{facts.shipped.installNpm}</code>
            </p>

            <div className="c3-record">
              <div className="c3-statement-head">
                <h3>Published packages</h3>
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
            </div>
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
            Package versions verified {facts.shipped.verifiedOn}. Download
            counts read from the project stats file on 2026-09-13.
          </p>
        </div>
      </footer>
    </main>
  );
}
