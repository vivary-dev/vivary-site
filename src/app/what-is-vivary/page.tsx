import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { facts } from "@/content/facts";
import { Ledger, type Row } from "../ledger";
import { Section } from "../scenes";
import { AgentsLine, JsonLd, Shell } from "../shell";

// The product description as a real page. Same facts as public/llms.txt and
// docs/brand/08-product-description.md. The first sentence defines the thing.

export const metadata = pageMetadata(
  "Vivary setup, features and preview limits",
  "Learn what Vivary does, how to install its Windows preview, and how agent accounts, project files and provider context work. Read the current limitations.",
  "/what-is-vivary/",
);

const define =
  "Vivary is a desktop application for working with AI agents on your own projects. It brings agent chat, project files, tools, and memory into one window on your computer.";

const steps: { k: string; v: string; why: string }[] = [
  {
    k: "Download and verify",
    v: "On Windows x64, download the preview ZIP and its SHA-256 file from the dated release. Compare the complete checksum before extracting.",
    why: "The installation guide contains the exact filename, checksum and verification command.",
  },
  {
    k: "Extract and open",
    v: "Extract into a new directory. Keep the complete application folder together, including resources, then run Vivary.exe.",
    why: "This portable preview has no setup wizard. The app itself needs no global Node, Python or source checkout.",
  },
  {
    k: "Set up your agent",
    v: "Install and authenticate a supported coding CLI separately. Check runtime readiness in Vivary Settings before starting a model conversation.",
    why: "Local Vivary use needs no Vivary account. Claude Code and Codex use their own accounts and permissions.",
  },
  {
    k: "Choose a project and task",
    v: "Open a project and use a conversation for the work you want to do. Choose the supported runtime you have configured.",
    why: "Setting up an existing folder can show proposed changes. Applying those changes through the interface is unfinished in this preview.",
  },
  {
    k: "Review the work",
    v: "Ask for a specific change, inspect the result and respond to permission requests from your runtime. Check its tools and approval mode before relying on them.",
    why: "The preview does not establish complete support for every provider, tool or workflow.",
  },
  {
    k: "Keep a handoff and backup",
    v: "Ask the agent to record the goal, decisions and next step in a project file. Before upgrading, close Vivary and back up its profile and your project folders.",
    why: "Project notes and conversation history are separate. Follow the installation guide to preserve both.",
  },
];

const promises: Row[] = facts.product.promises.map((p) => {
  const [k, ...rest] = p.split(". ");
  return { k, v: rest.join(". ") };
});

const limits: Row[] = [
  { k: "Unsigned preview", v: "The September 22, 2026 Windows x64 download is development software built from source 9884670. It is not a stable release." },
  { k: "Workflows still being tested", v: "Applying setup changes to existing folders is unfinished. First launch with a new profile, some provider workflows and automation still need testing." },
  { k: "Newer source", v: "Changes on the development branch are not necessarily included in the public ZIP. Check evidence for the version you use." },
  { k: "Agent permissions", v: "Your selected runtime controls tools and approvals. A workspace example is not a guarantee that every action requires review." },
  { k: "File and profile storage", v: "Project files stay in their folders. Conversation history and settings also use a local app profile and SQLite database." },
];

const faq: { q: string; a: string }[] = [
  { q: "What is Vivary?", a: "Vivary is a desktop workspace for working with AI agents on your own projects. It brings conversations and project files into one window." },
  { q: "Who is Vivary for?", a: "People working with agents on writing, research, notes or code. You need to install the preview and configure a supported agent runtime. You do not need to be a software developer to work with project files." },
  { q: "Do I need a Vivary account?", a: "No Vivary account is needed for local desktop use. Claude Code and Codex require their own setup and authentication. Self-hosted browser access requires explicit setup and authentication." },
  { q: "Does my data leave my computer?", a: facts.product.dataBoundary },
  { q: "Which AI agents can I connect?", a: "Vivary has adapters for Claude Code and Codex. Install and authenticate the coding CLI separately, then check runtime readiness in Settings. Support depends on the runtime and the preview build." },
  { q: "What can I download now?", a: "An unsigned Windows x64 preview published on September 22, 2026, from source 9884670. It is a portable ZIP, not a stable release. Some desktop workflows still need testing." },
  { q: "Is Vivary open source?", a: "The app and command-line source repositories are public under the MIT license. Published command packages and the Windows desktop preview have separate release histories." },
  { q: "Does a skill link install a skill?", a: "No. The company skills collection is separate from the Windows preview. Read the skill and its prerequisites before installing it in a compatible agent host." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function WhatIsVivary() {
  return (
    <Shell current="what">
      <JsonLd data={jsonLd} />
      <Section className="doc in">
        <div className="wrap">
          <AgentsLine />
          <div className="two">
            <div className="lead">
              <h1 className="display display-lg">What is Vivary?</h1>
              <p className="define">{define}</p>
            </div>
            <div className="body">
              <p className="lede">
                Use it to work on a draft, a research folder, a collection of notes or a codebase.
                Choose a supported runtime for the task and review its output beside your files.
              </p>
              <p className="lede quiet">
                Claude Code and Codex keep their own authentication and provider settings.
                Local use needs no Vivary account. A provider can receive the context you send
                through its runtime.
              </p>
              <p className="status">{facts.product.status}</p>
              <p className="packages">
                <a href={facts.links.preview}>Windows preview and release notes</a>{" · "}
                <a href={facts.links.installGuide}>Installation instructions</a>{" · "}
                <a href={facts.links.product}>Source and current documentation</a>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="install" className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Install and try the Windows preview.</h2>
            <p className="lede">
              These steps summarize the September 22 preview guide. Read the full{" "}
              <a href={facts.links.installGuide}>Windows installation instructions</a> for
              checksums, upgrades, backups and known limits.
            </p>
          </div>
          <div className="body">
            <Ledger
              label="Windows preview setup steps"
              rows={steps.map((s, i) => ({
                k: (
                  <>
                    <span className="num">{i + 1}</span>
                    <small>{s.k}</small>
                  </>
                ),
                v: (
                  <>
                    <p>{s.v}</p>
                    <p className="cap">{s.why}</p>
                  </>
                ),
              }))}
            />
          </div>
        </div>
      </Section>

      <Section className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">How agents, files and memory fit together.</h2>
            <p className="lede">Check the dated preview guide for what the downloaded build supports.</p>
          </div>
          <div className="body">
            <Ledger rows={promises} plain label="Workspace and data boundaries" />
          </div>
        </div>
      </Section>

      <Section className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Who it is for.</h2>
          </div>
          <div className="body">
            <p className="lede" style={{ marginTop: 0 }}>
              A writer can share an outline and a draft. A researcher can ask for a comparison
              of source notes. A developer can ask for a patch and tests. Start with a clear task,
              choose the files the agent needs and check its result.
            </p>
            <p className="lede quiet">
              Claude Code and Codex keep their own authentication and settings. Read the
              installation guide before choosing and connecting a runtime.
            </p>
            <p className="packages">
              For reusable agent instructions, see <a href={facts.links.skills}>The Little AI Company skills collection</a>
              {" and its "}<a href={facts.links.statechartSkill}>Statechart Design and Review skill</a>.
              Read the skill before installing it. This website does not install skills or grant tools.
            </p>
          </div>
        </div>
      </Section>

      <Section className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Known preview limits.</h2>
          </div>
          <div className="body">
            <Ledger rows={limits} plain label="Preview limits" />
          </div>
        </div>
      </Section>

      <Section id="questions" className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Questions about Vivary.</h2>
            <p className="lede">
              Looking for terminal setup? The workspace commands have their own installation path.{" "}
              <Link href="/commands/">Read the CLI setup guide.</Link>
            </p>
          </div>
          <div className="body">
            <Ledger
              rows={faq.map((f) => ({ k: <span className="q">{f.q}</span>, v: f.a }))}
              plain
              label="Questions and answers"
            />
          </div>
        </div>
      </Section>
    </Shell>
  );
}
