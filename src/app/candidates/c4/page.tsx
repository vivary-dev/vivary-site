import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { facts } from "@/content/facts";
import "./c4.css";
import { HeroStage } from "./hero-stage";
import { InstallCommand } from "./install-command";
import { StratumMark } from "./vivarium";

const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "opsz"],
  variable: "--c4-display",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--c4-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivary, candidate 4",
};

// The swatch for each layer matches its band in the hero case: denser lower down.
const LAYER_MARKS: Record<string, { density: number; tone: "ink" | "amber" }> = {
  tropo: { density: 0.68, tone: "ink" },
  strato: { density: 0.46, tone: "ink" },
  ozone: { density: 0.3, tone: "amber" },
  exo: { density: 0.16, tone: "amber" },
};

export default function Candidate4() {
  return (
    <div className={`${display.variable} ${sans.variable} c4-page`}>
      <HeroStage
        masthead={
          <div className="c4-top">
            <span className="c4-serif c4-mark">{facts.name}</span>
            <nav className="c4-top-links" aria-label="Vivary links">
              <a href={facts.links.docs}>Docs</a>
              <a href={facts.links.github}>GitHub</a>
            </nav>
          </div>
        }
      >
        <h1 className="c4-serif c4-display">
          <span>Chat fades,</span>
          <span>files persist.</span>
        </h1>
        <p className="c4-deck">
          Vivary is the part that decides which of those files your agent gets to see, and shows you
          what it saw.
        </p>
        <p className="c4-line">{facts.productLine}</p>
        <div className="c4-cta">
          <InstallCommand command={facts.shipped.install} />
          <p className="c4-cta-aside">
            The source is on <a href={facts.links.github}>GitHub</a>.
          </p>
        </div>
      </HeroStage>

      <main>
        <section className="c4-section c4-wrap">
          <h2 className="c4-serif c4-head">What it does</h2>
          <dl className="c4-dl">
            <div>
              <dt className="c4-serif">Files persist</dt>
              <dd>
                A new workspace starts with five small files. Nothing else is written until real work
                needs it.
              </dd>
            </div>
            <div>
              <dt className="c4-serif">A bounded capsule</dt>
              <dd>The agent gets a bounded capsule of context.</dd>
            </div>
            <div>
              <dt className="c4-serif">A receipt</dt>
              <dd>A receipt records what the agent saw.</dd>
            </div>
          </dl>
          <p className="c4-note">{facts.claims[4]}</p>
        </section>

        <section className="c4-section c4-wrap">
          <h2 className="c4-serif c4-head">What you can install today</h2>
          <p className="c4-lead">A new workspace starts with these five files.</p>
          <ul className="c4-files">
            {facts.shipped.fiveFiles.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
          <div className="c4-cta">
            <InstallCommand command={facts.shipped.install} />
            <p className="c4-alt">
              With npm instead: <code>{facts.shipped.installNpm}</code>
            </p>
          </div>
          <p className="c4-note">{facts.claims[1]}</p>
          <p className="c4-note">{facts.claims[2]}</p>
          <table className="c4-table">
            <caption>Published packages, verified on {facts.shipped.verifiedOn}.</caption>
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">Version</th>
                <th scope="col">Registry</th>
              </tr>
            </thead>
            <tbody>
              {facts.shipped.packages.map((pkg) => (
                <tr key={pkg.name}>
                  <td>{pkg.name}</td>
                  <td>{pkg.version}</td>
                  <td>{pkg.registry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="c4-section c4-wrap">
          <h2 className="c4-serif c4-head">The four layers</h2>
          <p className="c4-lead">
            Four layers, listed from the ground up. Each one has its own package in the table above.
          </p>
          <div className="c4-layers">
            {facts.layers.map((layer) => (
              <div className="c4-layer" key={layer.name}>
                <StratumMark
                  id={`c4-mark-${layer.name}`}
                  density={LAYER_MARKS[layer.name].density}
                  tone={LAYER_MARKS[layer.name].tone}
                  width={16}
                  height={44}
                />
                <span className="c4-serif c4-layer-name">{layer.name}</span>
                <p className="c4-layer-role">{layer.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="c4-section c4-wrap">
          <h2 className="c4-serif c4-head">{facts.inDevelopment.label}</h2>
          <div className="c4-dev">
            <p className="c4-measure">{facts.inDevelopment.summary}</p>
          </div>
        </section>
      </main>

      <footer className="c4-foot">
        <div className="c4-wrap c4-foot-row">
          <span className="c4-serif c4-mark">{facts.name}</span>
          <nav className="c4-foot-links" aria-label="Vivary elsewhere">
            <a href={facts.links.github}>GitHub</a>
            <a href={facts.links.docs}>Docs</a>
            <a href={facts.links.pypi}>PyPI</a>
            <a href={facts.links.npm}>npm</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
