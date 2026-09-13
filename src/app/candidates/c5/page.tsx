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
  description: facts.product.line,
};

// Each promise is written as a short title, a period, then the detail.
const promises = facts.product.promises.map((p) => {
  const cut = p.indexOf(". ");
  return { title: p.slice(0, cut), body: p.slice(cut + 2) };
});

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
            {facts.product.name}
          </p>
          <nav className="c5-headlinks" aria-label="Product links">
            <a href={facts.links.docs}>Docs</a>
            <a href={facts.links.github}>GitHub</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="c5-wrap c5-hero">
          <h1 className="c5-h1">
            {facts.product.meet}
            <em>{facts.product.line}</em>
          </h1>
          <p className="c5-lead">One window for every project.</p>

          <div className="c5-cta">
            <a className="c5-btn" href={facts.links.github}>
              Follow the build on GitHub
            </a>
            <a className="c5-ghlink" href={facts.links.docs}>
              Read the docs
            </a>
          </div>

          <figure className="c5-figure">
            <WorkbenchFrame />
            <figcaption className="c5-cap">
              A drawing of the Vivary desktop window, not a screenshot.
            </figcaption>
          </figure>
        </section>

        <section className="c5-wrap c5-sec" aria-labelledby="c5-what">
          <div className="c5-grid">
            <div>
              <h2 className="c5-h2" id="c5-what">
                What it does
              </h2>
              <p className="c5-sub">{facts.product.what}</p>
            </div>
            <div className="c5-cols">
              {promises.map((p) => (
                <div className="c5-col" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="c5-wrap c5-sec" aria-labelledby="c5-also">
          <div className="c5-grid">
            <div>
              <h2 className="c5-h2" id="c5-also">
                Also in the program
              </h2>
            </div>
            <ul className="c5-also">
              {facts.product.alsoInTheProgram.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="c5-wrap c5-sec" aria-labelledby="c5-engine">
          <div className="c5-grid">
            <div>
              <h2 className="c5-h2 c5-h2-wide" id="c5-engine">
                {facts.engine.line}
              </h2>
            </div>
            <div>
              <p className="c5-engine">{facts.engine.summary}</p>

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

              <CopyCommand command={facts.shipped.install} />
              <ul className="c5-runs">
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
            </div>
          </div>
        </section>

        <section className="c5-wrap c5-status">
          <p>{facts.product.status}</p>
        </section>
      </main>

      <footer className="c5-wrap">
        <div className="c5-foot">
          <small>{facts.product.line}</small>
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
