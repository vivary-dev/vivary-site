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

/** Each promise is written as a title sentence followed by the detail. */
function splitPromise(promise: string) {
  const cut = promise.indexOf(". ");
  if (cut === -1) return { title: promise, body: "" };
  return { title: promise.slice(0, cut), body: promise.slice(cut + 2) };
}

// The first sentence of product.what: the one line a stranger needs here.
const HERO_SENTENCE = `${facts.product.what.split(". ")[0]}.`;

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
        <h1 className="c4-display">
          <span className="c4-serif c4-meet">{facts.product.meet}</span>
          <span className="c4-serif c4-claim">{facts.product.line}</span>
        </h1>
        <p className="c4-deck">{HERO_SENTENCE}</p>
        <div className="c4-cta">
          <a className="c4-cta-link" href={facts.links.github}>
            Read the source on GitHub
          </a>
        </div>
      </HeroStage>

      <main>
        <section className="c4-section c4-wrap">
          <h2 className="c4-serif c4-head">What it does</h2>
          <dl className="c4-promises">
            {facts.product.promises.map((promise) => {
              const { title, body } = splitPromise(promise);
              return (
                <div key={title}>
                  <dt className="c4-serif">{title}</dt>
                  <dd>{body}</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section className="c4-section c4-wrap">
          <h2 className="c4-serif c4-head">Also in the program</h2>
          <ul className="c4-also">
            {facts.product.alsoInTheProgram.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="c4-section c4-wrap">
          <h2 className="c4-serif c4-head">{facts.engine.line}</h2>
          <p className="c4-lead">{facts.engine.summary}</p>
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
          <div className="c4-cta">
            <InstallCommand command={facts.shipped.install} />
            <p className="c4-alt">
              With npm instead: <code>{facts.shipped.installNpm}</code>
            </p>
          </div>
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
          <p className="c4-status">{facts.product.status}</p>
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
