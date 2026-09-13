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

export const metadata: Metadata = {
  title: "Vivary, candidate 2: Workspace",
  description: facts.productLine,
};

const [firstSentence, secondSentence] = splitFirstScreen(facts.firstScreen);

function splitFirstScreen(text: string): [string, string] {
  const cut = text.indexOf(". ");
  if (cut < 0) return [text, ""];
  return [text.slice(0, cut + 1), text.slice(cut + 2)];
}

const whatItIs = [
  {
    file: "AGENTS.md, STATE.md",
    term: "Files persist",
    text: "A new workspace starts with five small files. Nothing else is written until real work needs it. The agent works from those files, and they are still there when the chat is gone.",
  },
  {
    file: ".vivary/context.md",
    term: "The bounded capsule",
    text: "The agent gets a bounded capsule of context. Vivary is the part that decides which of your files the agent gets to see.",
  },
  {
    file: "written after each run",
    term: "The receipt",
    text: "A receipt records what the agent saw, and Vivary shows it to you. You can read it after a run to check what the agent worked from.",
  },
  {
    file: "the workspace folder",
    term: "The boundary",
    text: "No account, no cloud control plane, no telemetry from the workspace. Files stay on your machine.",
  },
];

const layerPackages = Object.fromEntries(
  facts.shipped.packages.map((p) => [p.name.replace("vivary-", ""), p.version]),
);

export default function CandidateTwo() {
  return (
    <div className={`c2 ${sans.variable} ${mono.variable}`}>
      <header className="c2-wrap c2-masthead">
        <div>
          <span className="c2-wordmark">{facts.name}</span>
          <span className="c2-tagline">{facts.productLine}</span>
        </div>
        <nav aria-label="Project links" className="c2-masthead-links">
          <a href={facts.links.github}>GitHub</a>
          <a href={facts.links.docs}>Docs</a>
        </nav>
      </header>

      <main>
        <section className="c2-wrap c2-hero" aria-labelledby="c2-h1">
          <h1 id="c2-h1">{firstSentence}</h1>
          <p className="c2-lede">{secondSentence}</p>
          <div className="c2-install">
            <code className="c2-cmd">{facts.shipped.install}</code>
            <CopyButton text={facts.shipped.install} />
          </div>
          <p className="c2-install-note">
            Also on npm as <code>{facts.shipped.installNpm}</code>. Source on{" "}
            <a href={facts.links.github}>GitHub</a>.
          </p>
          <Workspace />
        </section>

        <section className="c2-wrap c2-section" aria-labelledby="c2-what">
          <h2 id="c2-what">What it is</h2>
          <dl className="c2-defs">
            {whatItIs.map((item) => (
              <div key={item.term} className="c2-def">
                <dt>
                  <span className="c2-def-term">{item.term}</span>
                  {item.file.includes(".") ? (
                    <code className="c2-def-file">{item.file}</code>
                  ) : (
                    <span className="c2-def-file">{item.file}</span>
                  )}
                </dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="c2-wrap c2-section" aria-labelledby="c2-install">
          <h2 id="c2-install">What you can install today</h2>
          <div className="c2-two-col">
            <div>
              <p>One command writes a workspace of five files and stops there.</p>
              <ul className="c2-files">
                {facts.shipped.fiveFiles.map((f) => (
                  <li key={f}>
                    <code>{f}</code>
                  </li>
                ))}
              </ul>
              <p>
                Adopting an existing project starts with a dry run. It adds at
                most three files and asks for approval against an exact hash
                before writing. Doctor checks the contract and the privacy
                boundary without touching your files.
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
                Versions verified on {facts.shipped.verifiedOn} against the
                release table. Packages on{" "}
                <a href={facts.links.pypi}>PyPI</a> and{" "}
                <a href={facts.links.npm}>npm</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="c2-wrap c2-section" aria-labelledby="c2-layers">
          <h2 id="c2-layers">The four layers</h2>
          <p className="c2-measure">
            Each layer is its own package. Install the ones you need.
          </p>
          <dl className="c2-layers">
            {facts.layers.map((layer) => (
              <div key={layer.name} className="c2-layer">
                <dt>
                  <code>vivary-{layer.name}</code>
                  <span className="c2-layer-version">
                    {layerPackages[layer.name]}
                  </span>
                </dt>
                <dd>{layer.role}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="c2-wrap c2-section" aria-labelledby="c2-dev">
          <h2 id="c2-dev">{facts.inDevelopment.label}</h2>
          <p className="c2-dev">{facts.inDevelopment.summary}</p>
        </section>
      </main>

      <footer className="c2-wrap c2-footer">
        <span className="c2-wordmark">{facts.name}</span>
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
