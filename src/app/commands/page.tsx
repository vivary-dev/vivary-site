import type { Metadata } from "next";
import { facts } from "@/content/facts";
import { Ledger, type Row } from "../ledger";
import { Section } from "../scenes";
import { AgentsLine, Shell } from "../shell";

// The workspace commands: a part of Vivary, bundled in the app and published
// as packages. Claims come from facts.shipped and facts.claims, verified
// against the registries on the recorded date.

export const metadata: Metadata = {
  title: "The workspace commands",
  description:
    "The commands inside Vivary that set up and operate a workspace: vivary, create-vivary, tropo, strato, ozone, exo. Published on PyPI and npm. Usable from a terminal today.",
  alternates: { canonical: "/commands/" },
};

const layers: Row[] = facts.layers.map((l) => ({ k: l.name, v: l.role }));

const claims: Row[] = [
  { k: "Five files", v: facts.claims[0] },
  { k: "Adoption", v: facts.claims[1] },
  { k: "Doctor", v: facts.claims[2] },
  { k: "Capsule and receipt", v: facts.claims[3] },
  { k: "Local", v: facts.claims[4] },
];

const packages: Row[] = facts.shipped.packages.map((p) => ({
  k: p.name,
  v: (
    <>
      <span className="rec">{p.version}</span> on {p.registry}
    </>
  ),
}));

export default function Commands() {
  return (
    <Shell current="commands">
      <Section className="doc in">
        <div className="wrap">
          <AgentsLine />
          <div className="two">
            <div className="lead">
              <h1 className="display display-lg">The workspace commands.</h1>
              <p className="define">
                Inside the app, Vivary sets up and operates workspaces with a small set of commands.
                They are a part of Vivary.
              </p>
            </div>
            <div className="body">
              <p className="lede">
                {facts.commands.names.map((n, i) => (
                  <span key={n}>
                    <span className="rec">{n}</span>
                    {i < facts.commands.names.length - 1 ? ", " : "."}
                  </span>
                ))}{" "}
                The same commands are published as packages, so a terminal can use them without the
                app. A typed knowledge graph, one visible state surface, review with human gates, and
                coordination for many agents.
              </p>
              <p className="status">{facts.product.status}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">A workspace starts as five files.</h2>
            <p className="lede">Nothing else is written until real work needs it.</p>
          </div>
          <div className="body">
            <ul className="files" aria-label="The five files">
              {facts.shipped.fiveFiles.map((f) => (
                <li key={f}>
                  <span className="rec">{f}</span>
                </li>
              ))}
            </ul>
            <div className="block">
              <Ledger rows={claims} label="What the commands do" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Four commands, named for the sky.</h2>
            <p className="lede">
              A vivary contains its own atmosphere. The commands are its layers, from the ground up.
            </p>
          </div>
          <div className="body">
            <Ledger rows={layers} label="The four layers" />
          </div>
        </div>
      </Section>

      <Section className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Use them from a terminal today.</h2>
            <p className="lede">
              One command creates a workspace. The version is pinned to the last release with a
              recorded installation proof.
            </p>
          </div>
          <div className="body">
            <Ledger
              label="Install"
              rows={[
                { k: "with uv", v: <code>{facts.shipped.install}</code> },
                { k: "with npm", v: <code>{facts.shipped.installNpm}</code> },
              ]}
            />
            <div className="block">
              <Ledger rows={packages} label="Published packages" />
              <p className="packages">Verified against the registries on {facts.shipped.verifiedOn}.</p>
            </div>
            <p className="packages">
              <a href={facts.links.commandReference}>Command reference</a>,{" "}
              <a href={facts.links.github}>source on GitHub</a>, <a href={facts.links.pypi}>PyPI</a>,{" "}
              <a href={facts.links.npm}>npm</a>.
            </p>
          </div>
        </div>
      </Section>
    </Shell>
  );
}
