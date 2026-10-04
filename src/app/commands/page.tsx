import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { facts } from "@/content/facts";
import { Ledger, type Row } from "../ledger";
import { Section } from "../scenes";
import { AgentsLine, GuideNav, Shell } from "../shell";

// The workspace commands: a part of Vivary, bundled in the app and published
// as packages. Claims come from facts.shipped and facts.claims, verified
// against the registries on the recorded date.

export const metadata = pageMetadata(
  "Vivary CLI commands and workspace setup",
  "Set up a Vivary workspace from a terminal with pinned create-vivary commands. Read prerequisites, context and review tools, and the dated package baseline.",
  "/commands/",
);

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
          <p className="eyebrow">The terminal guide</p>
          <div className="two">
            <div className="lead">
              <h1 className="display display-lg">Your workspace.<br />From a terminal.</h1>
              <p className="define">
                The Vivary CLI tools create and check project workspaces, assemble context and
                support review workflows. You can use the published packages from a terminal.
              </p>
            </div>
            <div className="body">
              <p className="lede">
                These commands are part of Vivary. Installing them does not install the desktop app.
                The examples below use the recorded 0.4.2 baseline.
              </p>
              <p className="packages">
                Looking for the app? <Link href="/what-is-vivary/#install">Read Windows preview setup</Link>
                {" or "}<a href={facts.links.preview}>open the desktop download</a>.
              </p>
            </div>
          </div>
          <GuideNav items={[
            { href: "#install", label: "Install commands" },
            { href: "#files", label: "Workspace files" },
            { href: "#layers", label: "Layer tools" },
            { href: "#packages", label: "Package baseline" },
          ]} />
          <AgentsLine />
        </div>
      </Section>

      <Section id="install" className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Create a workspace from a terminal.</h2>
            <p className="lede">
              Use a new workspace directory for this example. Both paths require Python 3.11
              or newer. The uvx command needs uv. The npm launcher needs Node.js, npm and
              either uv or pipx to run the Python scaffolder.
            </p>
          </div>
          <div className="body">
            <div className="command-block">
              <h3>With uv</h3>
              <pre><code>{facts.shipped.install}</code></pre>
            </div>
            <div className="command-block">
              <h3>With npm</h3>
              <pre><code>{facts.shipped.installNpm}</code></pre>
            </div>
            <div id="packages" className="block">
              <h3 className="subheading">Recorded package baseline</h3>
              <Ledger rows={packages} label="Published packages" />
              <p className="packages">Historical installation baseline verified on {facts.shipped.verifiedOn}. The commands stay pinned to 0.4.2. These are not the latest-version labels. Review current documentation before choosing another release.</p>
            </div>
            <p className="packages">
              The current command reference includes newer source-only features. Check its release
              notes and required versions before using those features with these pinned packages.
              For an existing folder, read the adoption instructions before running a command that writes files.
            </p>
            <p className="packages">
              <a href={facts.links.commandReference}>Command reference</a>,{" "}
              <a href={facts.links.commandSource}>CLI source on GitHub</a>, <a href={facts.links.pypi}>PyPI</a>,{" "}
              <a href={facts.links.npm}>npm</a>.
            </p>
          </div>
        </div>
      </Section>

      <Section id="files" className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">A workspace starts as five files.</h2>
            <p className="lede">The pinned scaffolder creates this initial file set. Review it before adding project content or agent access.</p>
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

      <Section id="layers" className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Context, state, review and coordination.</h2>
            <p className="lede">
              The four layer tools have different jobs. Governed workflows are opt-in in the
              current command reference. They do not replace a runtime’s permissions.
            </p>
          </div>
          <div className="body">
            <Ledger rows={layers} label="The four layers" />
          </div>
        </div>
      </Section>


      <section className="sec">
        <div className="wrap command-desktop-note">
          <h2 className="display display-lg">Looking for the desktop app?</h2>
          <p className="lede">{facts.product.status}</p>
          <Link className="text-link" href="/what-is-vivary/#install">Read Windows preview setup <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </Shell>
  );
}
