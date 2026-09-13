import type { Metadata } from "next";
import { Alegreya_Sans, IBM_Plex_Mono } from "next/font/google";
import { facts } from "@/content/facts";
import { CopyButton } from "./copy-button";
import { Workspace } from "./workspace";
import "./c2.css";

const sans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--c2-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--c2-mono",
  display: "swap",
});

const { product, engine } = facts;

export const metadata: Metadata = {
  title: "Vivary, candidate 2: Workspace",
  description: product.line,
};

function splitFirst(text: string): [string, string] {
  const cut = text.indexOf(". ");
  if (cut < 0) return [text, ""];
  return [text.slice(0, cut + 1), text.slice(cut + 2)];
}

const whatSentences = product.what.split(". ").map((s) => (s.endsWith(".") ? s : `${s}.`));
const heroSentence = whatSentences[1] ?? whatSentences[0];

const promises = product.promises.map((p) => {
  const [title, body] = splitFirst(p);
  return { title, body };
});

const layerVersions = Object.fromEntries(
  facts.shipped.packages.map((p) => [p.name.replace("vivary-", ""), p.version]),
);

export default function CandidateTwo() {
  return (
    <div className={`c2 ${sans.variable} ${mono.variable}`}>
      <header className="c2-wrap c2-masthead">
        <span className="c2-wordmark">{product.name}</span>
        <nav aria-label="Project links" className="c2-masthead-links">
          <a href={facts.links.github}>GitHub</a>
          <a href={facts.links.docs}>Docs</a>
        </nav>
      </header>

      <main>
        <section className="c2-wrap c2-hero" aria-labelledby="c2-h1">
          <h1 id="c2-h1">
            {product.meet}
            <span className="c2-h1-line">{product.line}</span>
          </h1>
          <p className="c2-lede">{heroSentence}</p>
          <div className="c2-cta-row">
            <a className="c2-cta" href={facts.links.github}>
              Follow the build on GitHub
            </a>
            <a className="c2-cta-quiet" href={facts.links.docs}>
              Read the docs
            </a>
          </div>
          <Workspace />
        </section>

        <section className="c2-wrap c2-section" aria-labelledby="c2-what">
          <h2 id="c2-what">What it does</h2>
          <dl className="c2-promises">
            {promises.map((item) => (
              <div key={item.title} className="c2-promise">
                <dt>{item.title}</dt>
                <dd>{item.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="c2-wrap c2-section" aria-labelledby="c2-also">
          <h2 id="c2-also">Also in the program</h2>
          <ul className="c2-list">
            {product.alsoInTheProgram.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="c2-wrap c2-section" aria-labelledby="c2-engine">
          <h2 id="c2-engine">{engine.line}</h2>
          <p className="c2-measure">{engine.summary}</p>
          <dl className="c2-layers">
            {facts.layers.map((layer) => (
              <div key={layer.name} className="c2-layer">
                <dt>
                  <code>vivary-{layer.name}</code>
                  <span className="c2-layer-version">{layerVersions[layer.name]}</span>
                </dt>
                <dd>{layer.role}</dd>
              </div>
            ))}
          </dl>
          <div className="c2-two-col c2-engine-install">
            <div>
              <p>One command writes a workspace of five files and stops there.</p>
              <div className="c2-install">
                <code className="c2-cmd">{facts.shipped.install}</code>
                <CopyButton text={facts.shipped.install} />
              </div>
              <p className="c2-install-note">
                Also on npm as <code>{facts.shipped.installNpm}</code>.
              </p>
            </div>
            <div>
              <table className="c2-table">
                <caption>Published packages</caption>
                <thead>
                  <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Version</th>
                    <th scope="col">Registry</th>
                  </tr>
                </thead>
                <tbody>
                  {facts.shipped.packages.map((p) => (
                    <tr key={p.name}>
                      <td>
                        <code>{p.name}</code>
                      </td>
                      <td>
                        <code>{p.version}</code>
                      </td>
                      <td>{p.registry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="c2-fine">
                Versions verified on {facts.shipped.verifiedOn} against the release
                table. Packages on <a href={facts.links.pypi}>PyPI</a> and{" "}
                <a href={facts.links.npm}>npm</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="c2-wrap c2-section" aria-label="Status">
          <p className="c2-status">{product.status}</p>
        </section>
      </main>

      <footer className="c2-wrap c2-footer">
        <span className="c2-wordmark">{product.name}</span>
        <nav aria-label="Footer links" className="c2-footer-links">
          <a href={facts.links.github}>GitHub</a>
          <a href={facts.links.docs}>Docs</a>
          <a href={facts.links.pypi}>PyPI</a>
          <a href={facts.links.npm}>npm</a>
        </nav>
      </footer>
    </div>
  );
}
