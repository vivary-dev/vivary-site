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
  description: facts.product.line,
};

// Each promise is written as a short title, a full stop, then the detail.
// Split on that first stop so the title can set on its own line.
function splitPromise(text: string): [string, string] {
  const at = text.indexOf(". ");
  if (at < 0) return [text, ""];
  return [text.slice(0, at), text.slice(at + 2)];
}

export default function CandidateOne() {
  const { product, engine, shipped, layers, links } = facts;

  return (
    <div className={`c1 ${hanken.variable}`}>
      <div className="c1-wrap">
        <header className="c1-top">
          <span className="c1-mark">{facts.name}</span>
          <nav aria-label="Elsewhere">
            <a href={links.github}>GitHub</a>
            <a href={links.docs}>Docs</a>
          </nav>
        </header>

        <main>
          <section className="c1-hero">
            <div>
              <h1 className="c1-h1">
                <span className="c1-h1-meet">{product.meet}</span>
                <span>{product.line}</span>
              </h1>
              <p className="c1-deck">{product.what}</p>
              <div className="c1-act">
                <a className="c1-cta-btn" href={links.github}>
                  See Vivary on GitHub
                </a>
                <a className="c1-act-link" href={links.docs}>
                  Read the docs
                </a>
              </div>
            </div>
            <figure className="c1-figure">
              <StrataPlate />
              <figcaption className="c1-caption">
                The engine under the app, in section. Four layers, read from the ground up.
              </figcaption>
            </figure>
          </section>

          <section className="c1-section" aria-labelledby="c1-what">
            <h2 className="c1-h2" id="c1-what">
              What it does
            </h2>
            <dl className="c1-defs">
              {product.promises.map((promise) => {
                const [term, detail] = splitPromise(promise);
                return (
                  <div className="c1-def" key={term}>
                    <dt>{term}</dt>
                    <dd>{detail}</dd>
                  </div>
                );
              })}
            </dl>
          </section>

          <section className="c1-section" aria-labelledby="c1-program">
            <h2 className="c1-h2" id="c1-program">
              Also in the program
            </h2>
            <ul className="c1-list">
              {product.alsoInTheProgram.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="c1-section" aria-labelledby="c1-engine">
            <h2 className="c1-h2" id="c1-engine">
              The engine underneath
            </h2>
            <p className="c1-lede">{engine.summary}</p>

            <h3 className="c1-h3">The four layers</h3>
            <div className="c1-layers">
              {layers.map((layer) => (
                <div className="c1-layer" key={layer.name}>
                  <StrataSwatch layer={layer.name} />
                  <span className="c1-layer-name">{layer.name}</span>
                  <p className="c1-layer-role">{layer.role}</p>
                </div>
              ))}
            </div>

            <h3 className="c1-h3">{engine.line}</h3>
            <div className="c1-act">
              <CopyCommand command={shipped.install} />
            </div>
            <table className="c1-table">
              <caption>Published packages, verified {shipped.verifiedOn}.</caption>
              <thead>
                <tr>
                  <th scope="col">Package</th>
                  <th scope="col">Version</th>
                  <th scope="col">Registry</th>
                </tr>
              </thead>
              <tbody>
                {shipped.packages.map((pkg) => (
                  <tr key={pkg.name}>
                    <td>{pkg.name}</td>
                    <td>{pkg.version}</td>
                    <td>{pkg.registry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="c1-section">
            <p className="c1-status">{product.status}</p>
          </section>
        </main>

        <footer className="c1-foot">
          <span className="c1-mark">{facts.name}</span>
          <nav aria-label="Project links">
            <a href={links.github}>GitHub</a>
            <a href={links.docs}>Docs</a>
            <a href={links.pypi}>PyPI</a>
            <a href={links.npm}>npm</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
