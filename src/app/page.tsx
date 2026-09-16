import type { Metadata } from "next";
import { facts } from "@/content/facts";
import { Ledger, type Row } from "./ledger";
import { MemoryScene, Section } from "./scenes";
import { JsonLd, Shell } from "./shell";
import { LucideFolderOpen } from "@/components/icons/lucide/folder-open";
import { LucideFileText } from "@/components/icons/lucide/file-text";

export const metadata: Metadata = {
  title: { absolute: "Vivary knows you because you wrote it down" },
  description: facts.product.line,
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Vivary",
      description: facts.product.line,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows",
      author: { "@type": "Organization", name: "The Little AI Company" },
      creator: { "@type": "Person", name: "Jeff Kazzee" },
      url: "/",
    },
    {
      "@type": "Organization",
      name: "Vivary",
      url: "/",
      sameAs: [facts.links.org, facts.links.github],
    },
  ],
};

function key(main: string, sub: string) {
  return (
    <>
      {main}
      <small>{sub}</small>
    </>
  );
}

const receipt: Row[] = [
  { k: "run", v: <span className="rec">04,112</span> },
  { k: "date", v: <span className="rec">2029-09-13</span> },
  {
    k: "what I saw",
    v: (
      <>
        4 of 1,318 files
        <ul>
          <li>AGENTS.md</li>
          <li>STATE.md</li>
          <li>memory/MEMORY.md</li>
          <li>decisions/2027-03-18-no-orm.md</li>
        </ul>
      </>
    ),
  },
  { k: "what I changed", v: <span className="rec">src/onboarding/flow.ts</span> },
  {
    k: "what I left alone",
    v: (
      <>
        <span className="rec">src/db/migrations/</span>. Everything you did not ask for.
      </>
    ),
  },
  {
    k: "what I declined",
    v: (
      <>
        <span className="rec">notes/2025-archive.md</span>. It was not in the capsule, so I did not
        read it.
      </>
    ),
  },
  { k: "kept", v: "Here, as a file. You can read the same files I read." },
];

const memory: Row[] = [
  {
    k: key("2027-01-06", "entry 1"),
    v: <em className="voice">You write in the morning. I do not schedule builds then.</em>,
  },
  {
    k: key("2027-03-18", "entry 40"),
    v: (
      <em className="voice">
        You dislike ORMs. You said so today. I wrote it to{" "}
        <span className="rec">decisions/2027-03-18-no-orm.md</span>.
      </em>
    ),
  },
  {
    k: key("2027-11-04", "entry 118"),
    v: <em className="voice">You told me not to touch the migrations. I have not.</em>,
  },
  {
    k: key("2028-06-21", "entry 240"),
    v: (
      <em className="voice">
        You keep field notes in a second workspace. I do not mix them.
      </em>
    ),
  },
  {
    k: key("2029-09-13", "entry 312"),
    v: (
      <em className="voice">
        You asked for the onboarding rewrite. I kept the decision of{" "}
        <span className="rec">2027-03-18</span>. The receipt is <span className="rec">run-04112</span>.
      </em>
    ),
  },
];

const promises: Row[] = [
  { k: "No account", v: "Nothing to sign up for and no server to trust with your work." },
  {
    k: "Your machine, your keys",
    v: "Local CLI models and the keys you already have, running on your computer.",
  },
  {
    k: "Your folder stays yours",
    v: "Open a folder you already have. Opening it changes nothing inside it until you say so.",
  },
  {
    k: "Version control is your choice",
    v: "None, Git, or Jujutsu. Hosting a repository is a separate, optional step.",
  },
];

const rooms = [
  { name: "northfield", kind: "software", on: true },
  { name: "field-notes", kind: "second brain" },
  { name: "the-second-novel", kind: "writing" },
  { name: "transit-study", kind: "research" },
  { name: "ledger", kind: "knowledge base" },
];

const files = ["AGENTS.md", "STATE.md", "memory/MEMORY.md", "decisions/", "projects/onboarding/", "receipts/"];

const sessions = [
  { when: "Session 1", said: [{ t: "You write in the morning.", add: true }] },
  {
    when: "Session 12",
    said: [
      { t: "You write in the morning." },
      { t: "You dislike ORMs. You said so in March.", add: true },
      { t: "Short pull requests. One concern each.", add: true },
    ],
  },
  {
    when: "Session 40",
    said: [
      { t: "You write in the morning." },
      { t: "You dislike ORMs. You said so in March." },
      { t: "Short pull requests. One concern each." },
      { t: "Tests run before the pull request opens.", add: true },
      { t: "Redis is gone. Sessions live in Postgres.", add: true },
      { t: "You keep field notes in a second workspace.", add: true },
      { t: "Migrations stay closed unless you open them.", add: true },
    ],
  },
];

const layers: Row[] = facts.layers.map((l) => ({ k: l.name, v: l.role }));

function IntroObject({ kind }: { kind: "folder" | "file" }) {
  const Icon = kind === "folder" ? LucideFolderOpen : LucideFileText;
  return (
    <div className="intro-object" aria-hidden="true">
      <Icon focusable="false" />
      <span /><span /><span className="recorded" />
    </div>
  );
}

export default function Home() {
  return (
    <Shell current="home">
      <JsonLd data={jsonLd} />
      <Section id="top" className="hero in">
        <div className="wrap">
          <h1 className="display display-xl">
            <span>It knows you.</span>
            <span>Because you wrote it down.</span>
          </h1>
          <div className="hero-row">
            <div className="hero-copy">
              <p className="deck">{facts.product.what}</p>
              <div className="cta">
                <a className="btn btn-solid" href={facts.links.github}>
                  See Vivary on GitHub
                </a>
                <a className="btn" href="#memory">
                  What it remembers
                </a>
              </div>
            </div>
            <MemoryScene />
          </div>
        </div>
      </Section>

      <div className="frame">
        <div className="wrap">
          <Ledger
            label="How to read this page"
            rows={[
              {
                k: "About the dates",
                v: "The record on this page runs to 2029, three years out. That is the future Vivary is being built toward, not a claim about today. The product facts are from the present.",
              },
            ]}
          />
        </div>
      </div>

      <Section className="account">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg reveal">Every run ends with an account of itself.</h2>
            <p className="lede reveal">
              Before the agent works, Vivary hands it a capsule, the few files that matter for this
              task and nothing else. After, it leaves a receipt. The receipt is a file that stays in
              your project.
            </p>
            <p className="lede quiet reveal">
              You do not have to trust the summary. You can read the same files it read.
            </p>
          </div>
          <div className="body">
            <div className="block reveal">
              <h3 className="display display-md">receipts/run-04112.md</h3>
              <p className="cap">One per run. This is number 4,112.</p>
              <Ledger rows={receipt} label="Receipt" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="memory" className="record">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg reveal">Three years in. One workspace, read back.</h2>
            <p className="lede reveal">
              northfield, a software workspace opened <span className="nb">2027-01-06</span>. Read on{" "}
              <span className="nb">2029-09-13</span>, session 1,204. Five entries from a file of 312.
            </p>
          </div>
          <div className="body">
            <div className="block reveal">
              <h3 className="display display-md">memory/MEMORY.md</h3>
              <p className="cap">Written by the agent, kept by you. About you as much as the project.</p>
              <Ledger rows={memory} label="Memory entries" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="rooms">
        <div className="wrap">
          <div className="intro">
            <h2 className="display display-lg reveal">
              Every project is a room. One window opens all of them.
            </h2>
            <div className="intro-detail reveal">
              <div>
                <p className="lede">{facts.product.what}</p>
                <p className="lede quiet">
                  Second brains, knowledge bases, research, writing, and software, each one composed
                  from patterns you can rename or drop.
                </p>
              </div>
              <IntroObject kind="folder" />
            </div>
          </div>
          <div className="window reveal" aria-hidden="true">
            <div className="bar">
              <span>Vivary</span>
              <span>2029-09-13</span>
            </div>
            <div className="cols">
              <div className="col">
                <p className="rail">Projects</p>
                {rooms.map((r) => (
                  <p key={r.name} className={r.on ? "room on" : "room"}>
                    {r.name}
                    <span>{r.kind}</span>
                  </p>
                ))}
              </div>
              <div className="col talk">
                <p className="msg">
                  <b>you</b>
                  Finish the onboarding flow. Same rules as the plan.
                </p>
                <p className="msg them">
                  <b>Vivary</b>
                  Working from projects/onboarding/plan.md, the decision of 2027-03-18, and what I
                  know about you. The migrations stay closed.
                </p>
                <p className="msg them">
                  <b>Vivary</b>
                  Done. I read four files and changed one. The receipt is receipts/run-04112.md.
                </p>
              </div>
              <div className="col">
                <p className="rail">Files</p>
                {files.map((f) => (
                  <p key={f} className={f === "memory/MEMORY.md" ? "f open" : "f"}>
                    {f}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="kept">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg reveal">It keeps the promises you can check.</h2>
            <p className="lede reveal">
              Every promise below is one you can verify by looking at your own machine.
            </p>
          </div>
          <div className="body">
            <div className="reveal">
              <Ledger rows={promises} plain label="Promises" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="grow">
        <div className="wrap">
          <div className="intro">
            <h2 className="display display-lg reveal">The file gets longer. That is the whole trick.</h2>
            <div className="intro-detail reveal">
              <p className="lede">
                Each session adds a line or two. A year later it is still a file, still yours, still
                plain text you can read from the top. Nothing about you is held anywhere you cannot open.
              </p>
              <IntroObject kind="file" />
            </div>
          </div>
          <p className="filehead group reveal">
            <span>memory/MEMORY.md</span>
            <span>one file, three moments</span>
          </p>
          <div className="moments reveal">
            {sessions.map((s) => (
              <div key={s.when} className="moment">
                <h3 className="display display-md">{s.when}</h3>
                {s.said.map((l) => (
                  <p key={l.t} className={l.add ? "voice said add" : "voice said"}>
                    {l.t}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="commands" className="engine">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg reveal">{facts.commands.line}</h2>
            <p className="lede reveal">{facts.commands.summary}</p>
          </div>
          <div className="body">
            <div className="reveal">
              <Ledger rows={layers} label="The commands" />
            </div>
            <div className="install reveal">
              <code>{facts.shipped.install}</code>
            </div>
            <p className="packages reveal">
              {facts.shipped.packages.map((p, i) => (
                <span key={p.name}>
                  {p.name} {p.version} on {p.registry}
                  {i < facts.shipped.packages.length - 1 ? ", " : "."}
                </span>
              ))}{" "}
              Verified {facts.shipped.verifiedOn}.
            </p>
            <p className="status reveal">{facts.product.status}</p>
          </div>
        </div>
      </Section>

    </Shell>
  );
}
