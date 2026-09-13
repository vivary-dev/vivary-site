import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";

import { facts } from "@/content/facts";

import { CopyCommand } from "./copy-command";
import { StrataPlate, StrataSwatch } from "./strata-plate";
import "./c1.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-c1",
});

export const metadata: Metadata = {
  title: "Vivary",
  description: facts.productLine,
};

const WHAT_IT_DOES = [
  { term: "Files, not chat history", detail: facts.claims[0] },
  { term: "A bounded capsule, and a receipt", detail: facts.claims[3] },
  { term: "A check you can run", detail: facts.claims[2] },
  { term: "Nothing leaves the machine", detail: facts.claims[4] },
];

export default function CandidateOne() {
  return (
    <div className={`c1 ${hanken.variable}`}>
      <div className="c1-wrap">
        <header className="c1-top">
          <span className="c1-mark">{facts.name}</span>
          <nav aria-label="Elsewhere">
            <a href={facts.links.github}>GitHub</a>
            <a href={facts.links.docs}>Docs</a>
          </nav>
        </header>

        <main>
          <section className="c1-hero">
            <div>
              <h1 className="c1-h1">Chat fades, files persist.</h1>
              <p className="c1-deck">
                Vivary is the part that decides which of those files your agent gets to
                see, and shows you what it saw.
              </p>
              <p className="c1-sub">{facts.productLine}</p>
              <div className="c1-act">
                <CopyCommand command={facts.shipped.install} />
                <a className="c1-act-link" href={facts.links.github}>
                  Read the source on GitHub
                </a>
              </div>
            </div>
            <figure className="c1-figure">
              <StrataPlate />
              <figcaption className="c1-caption">
                A workspace in section. Four layers, read from the ground up.
              </figcaption>
            </figure>
          </section>

          <section className="c1-section" aria-labelledby="c1-what">
            <h2 className="c1-h2" id="c1-what">
              What it does
            </h2>
            <dl className="c1-defs">
              {WHAT_IT_DOES.map((row) => (
                <div className="c1-def" key={row.term}>
                  <dt>{row.term}</dt>
                  <dd>{row.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="c1-section" aria-labelledby="c1-install">
            <h2 className="c1-h2" id="c1-install">
              What you can install today
            </h2>
            <p className="c1-lede">
              One command creates a workspace. The workspace creator is published on PyPI
              and on npm, so use whichever runner you already have.
            </p>
            <div className="c1-act">
              <CopyCommand command={facts.shipped.install} />
              <CopyCommand command={facts.shipped.installNpm} />
            </div>

            <h3 className="c1-h3">The five files</h3>
            <ul className="c1-files">
              {facts.shipped.fiveFiles.map((file) => (
                <li key={file}>{file}</li>
              ))}
            </ul>
            <p className="c1-note">{facts.claims[1]}</p>

            <table className="c1-table">
              <caption>Published packages, verified {facts.shipped.verifiedOn}.</caption>
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

          <section className="c1-section" aria-labelledby="c1-layers">
            <h2 className="c1-h2" id="c1-layers">
              The four layers
            </h2>
            <p className="c1-lede">
              Each layer is a band in the drawing above, and the list below reads the same
              way, from the ground up.
            </p>
            <div className="c1-layers">
              {facts.layers.map((layer) => (
                <div className="c1-layer" key={layer.name}>
                  <StrataSwatch layer={layer.name} />
                  <span className="c1-layer-name">{layer.name}</span>
                  <p className="c1-layer-role">{layer.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="c1-section" aria-labelledby="c1-dev">
            <h2 className="c1-h2" id="c1-dev">
              {facts.inDevelopment.label}
            </h2>
            <p className="c1-dev">{facts.inDevelopment.summary}</p>
          </section>
        </main>

        <footer className="c1-foot">
          <span className="c1-mark">{facts.name}</span>
          <nav aria-label="Project links">
            <a href={facts.links.github}>GitHub</a>
            <a href={facts.links.docs}>Docs</a>
            <a href={facts.links.pypi}>PyPI</a>
            <a href={facts.links.npm}>npm</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
