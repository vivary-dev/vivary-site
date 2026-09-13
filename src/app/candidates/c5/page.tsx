import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Layers, Network, ShieldCheck, Users } from "lucide-react";
import { facts } from "@/content/facts";
import { CopyCommand } from "./copy-command";
import { WorkbenchFrame } from "./workbench-frame";
import "./c5.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivary, candidate c5",
  description: facts.productLine,
};

const proof = [
  { title: "It starts with five files", body: facts.claims[0] },
  { title: "The agent gets a capsule", body: facts.claims[3] },
  { title: "It stays on your machine", body: facts.claims[4] },
];

const layerIcons = {
  tropo: Network,
  strato: Layers,
  ozone: ShieldCheck,
  exo: Users,
} as const;

export default function C5Page() {
  return (
    <div className={`${manrope.variable} c5-root`}>
      <header className="c5-wrap">
        <div className="c5-head">
          <p className="c5-mark">
            <span aria-hidden="true" />
            {facts.name}
          </p>
          <nav className="c5-headlinks" aria-label="Product links">
            <a href={facts.links.docs}>Docs</a>
            <a href={facts.links.github}>GitHub</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="c5-wrap c5-hero">
          <h1 className="c5-h1">Chat fades. Your files stay.</h1>
          <p className="c5-lead">
            <strong>
              Vivary is the part that decides which of those files your agent
              gets to see, and shows you what it saw.
            </strong>{" "}
            {facts.productLine}
          </p>

          <div className="c5-cta">
            <CopyCommand command={facts.shipped.install} />
            <a className="c5-ghlink" href={facts.links.github}>
              Read the source on GitHub
            </a>
          </div>

          <figure className="c5-figure">
            <WorkbenchFrame />
            <figcaption className="c5-cap">
              The workbench above is a drawing, not a screenshot. The desktop
              app is in development and is not released. The command line tool
              is what you can install today.
            </figcaption>
          </figure>
        </section>

        <section className="c5-wrap c5-sec" aria-labelledby="c5-what">
          <div className="c5-grid">
            <div>
              <h2 className="c5-h2" id="c5-what">
                What it is
              </h2>
              <p className="c5-sub">
                Vivary works on the files in your project, not on a chat log.
              </p>
            </div>
            <div className="c5-cols">
              {proof.map((p) => (
                <div className="c5-col" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="c5-wrap c5-sec" aria-labelledby="c5-install">
          <div className="c5-grid">
            <div>
              <h2 className="c5-h2" id="c5-install">
                What you can install today
              </h2>
              <p className="c5-sub">
                A command line tool. Run it in a new folder, or point it at a
                project you already have.
              </p>
            </div>
            <div>
              <p className="c5-sub c5-sub-wide">
                A new workspace starts with these five files.
              </p>
              <ul className="c5-five">
                {facts.shipped.fiveFiles.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <ul className="c5-runs">
                <li>
                  <span>With uv</span>
                  <code>{facts.shipped.install}</code>
                </li>
                <li>
                  <span>With npm</span>
                  <code>{facts.shipped.installNpm}</code>
                </li>
              </ul>

              <table className="c5-table">
                <caption>
                  Published packages, verified {facts.shipped.verifiedOn}.
                </caption>
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
                      <td>{p.name}</td>
                      <td>{p.version}</td>
                      <td>{p.registry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="c5-extra">
                <li>{facts.claims[1]}</li>
                <li>{facts.claims[2]}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="c5-wrap c5-sec" aria-labelledby="c5-layers">
          <div className="c5-grid">
            <div>
              <h2 className="c5-h2" id="c5-layers">
                The four layers
              </h2>
              <p className="c5-sub">
                Each layer is its own package, and each one has a job.
              </p>
            </div>
            <div className="c5-layers">
              {facts.layers.map((layer) => {
                const Icon = layerIcons[layer.name];
                return (
                  <div className="c5-layer" key={layer.name}>
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    <h3>{layer.name}</h3>
                    <p>{layer.role}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="c5-wrap c5-sec" aria-labelledby="c5-dev">
          <div className="c5-dev">
            <h2 className="c5-h2" id="c5-dev">
              {facts.inDevelopment.label}
            </h2>
            <div className="c5-dev-body">
              <p>{facts.inDevelopment.summary}</p>
              <p>
                The workbench drawing at the top of this page is where that work
                is going. Until it ships, the command line tool is the part you
                can run.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="c5-wrap">
        <div className="c5-foot">
          <small>{facts.productLine}</small>
          <ul>
            <li>
              <a href={facts.links.github}>GitHub</a>
            </li>
            <li>
              <a href={facts.links.docs}>Docs</a>
            </li>
            <li>
              <a href={facts.links.pypi}>PyPI</a>
            </li>
            <li>
              <a href={facts.links.npm}>npm</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
