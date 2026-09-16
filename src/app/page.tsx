import type { Metadata } from "next";
import { facts } from "@/content/facts";
import { Section } from "./scenes";
import { JsonLd, Shell } from "./shell";

// The home page, from the design canvas of 2026-09-16
// (docs/design/2026-09-16-home). Knowledge first: the claim, who it is
// for, capsule and receipt, the memory file, the window, the agents, the
// four layers, and where the build is today. Product claims come from facts.

export const metadata: Metadata = {
  title: { absolute: "Vivary knows you because you wrote it down" },
  description:
    "Vivary is a desktop workspace where your agents work from the files you own. It knows you. Because you wrote it down.",
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
    { "@type": "Organization", name: "Vivary", url: "/", sameAs: [facts.links.org, facts.links.product, facts.links.github] },
  ],
};

function KV({ rows, col }: { rows: [React.ReactNode, React.ReactNode][]; col?: string }) {
  return (
    <dl className="kv num" style={col ? ({ "--kv-col": col } as React.CSSProperties) : undefined}>
      {rows.map(([k, v], i) => (
        <div key={i}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Rows({ rows, tight, label }: { rows: [React.ReactNode, React.ReactNode][]; tight?: boolean; label: string }) {
  return (
    <dl className={`rows num ${tight ? "rows-tight" : ""}`.trim()} aria-label={label}>
      {rows.map(([k, v], i) => (
        <div key={i}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const audiences = [
  {
    mark: "dome-sprout",
    name: "Writers",
    text: "A book, a newsletter, a script. The agent reads your outline, your style notes and the last draft before it touches a word. It does not read your other projects.",
  },
  {
    mark: "wave-globe",
    name: "Researchers",
    text: "Sources, notes and claims stay inside the project. Ask for a summary and the answer names the files it came from.",
  },
  {
    mark: "seed-world",
    name: "Second brain keepers",
    text: "Your notes are already the memory. Vivary reads the files you keep instead of building a memory you cannot open. Obsidian vault, plain folder, either works.",
  },
  {
    mark: "strata-sprout",
    name: "Builders",
    text: "Claude Code and Codex run here the same way they run in your terminal, with your keys and your permission settings. The plan and the decisions sit next to the code as files.",
  },
];

const agentsCards = [
  {
    ord: "01",
    name: "Runs the agents you already pay for",
    text: "Claude Code and Codex are your tools, installed on your machine, on your subscription. Vivary shows what the one you picked can actually do and keeps unknown states unknown.",
  },
  {
    ord: "02",
    name: "No account",
    text: "There is no Vivary account and no cloud control plane. Vivary never sees your files. Nothing leaves your machine unless the agent you chose sends it, under the rules you gave it.",
  },
  {
    ord: "03",
    name: "Plain files",
    text: "Plans, memory, decisions and receipts are text files in the project folder. Git is optional. Sync them, back them up, or open them in another tool. Nothing is locked in.",
  },
];

const layers: [string, string][] = [
  ["tropo", "What the workspace knows. Your files, indexed and typed, so the engine can tell a plan from a draft from a source."],
  ["strato", "One visible state. The boundaries between projects, and the loop a turn runs in: capsule, work, receipt."],
  ["ozone", "Review. A change that would last, to memory, to a plan, to a rule, waits for you."],
  ["exo", "Claims and conflicts. When more than one agent works in a project, who holds which file, and what happens when two want the same one."],
];

export default function Home() {
  return (
    <Shell current="home">
      <JsonLd data={jsonLd} />

      <Section id="top" className="hero in">
        <div className="wrap">
          <div className="hero-copy">
            <h1 className="display display-xl">It knows you. Because you wrote it down.</h1>
            <p className="deck">
              Vivary is a desktop workspace for people who think in files. Notes, research, drafts,
              plans and code, each in its own project, in one window. Your agents read what you
              wrote before they work. They leave a receipt after.
            </p>
            <div className="cta">
              <a className="btn btn-solid" href={facts.links.product}>
                Follow the build on GitHub
              </a>
              <a className="btn" href="#how">
                See how it works
              </a>
            </div>
            <KV
              rows={[
                ["status", "in development"],
                ["platform", "windows first"],
                ["account", "none. it runs on your machine"],
                ["agents", "claude code, codex. yours, with your keys"],
              ]}
            />
          </div>
          <div className="hero-art">
            <picture>
              <source srcSet="/brand/vivary-hero-vivarium.webp" type="image/webp" />
              <img
                src="/brand/vivary-hero-vivarium.png"
                width={1600}
                height={900}
                alt="A vivarium in cross section: a glass cloche over four strata, ferns and sprouts, a door at the edge of the world, and a label leaning on the plate"
              />
            </picture>
          </div>
        </div>
      </Section>

      <Section id="for" className="sec">
        <div className="wrap stack">
          <div className="intro">
            <h2 className="display display-lg reveal">Made for people who write things down.</h2>
            <p className="lede reveal">
              Most agent tools were built for code and then pointed at everything else. Vivary
              starts from the other end. A project is a folder of things you wrote. Code is one
              kind of project. It is not the only kind.
            </p>
          </div>
          <div className="cards reveal">
            {audiences.map((a) => (
              <article key={a.name} className="card scan">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/brand/vivary-mark-${a.mark}-bone.svg`} alt="" width={56} height={56} />
                <h3>{a.name}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="how" className="sec">
        <div className="wrap stack">
          <div className="intro">
            <h2 className="display display-lg reveal">Before the agent works. After it is done.</h2>
            <p className="lede reveal">
              An agent with your whole disk in front of it guesses. An agent with six files in
              front of it reads. Vivary does the choosing before the turn starts and the accounting
              after it ends.
            </p>
          </div>
          <div className="cards cards-2 reveal">
            <article className="card card-wide scan">
              <div className="card-head">
                <span>before the turn</span>
                <span>capsule.json</span>
              </div>
              <h3>The capsule</h3>
              <p>
                Before a turn starts, Vivary hands the agent a bounded set of files: the ones that
                matter for this conversation, and nothing else. You can open the list. You can
                change it.
              </p>
              <KV
                rows={[
                  ["project", "field-guide"],
                  ["conversation", "chapter four rewrite"],
                  ["memory", "MEMORY.md"],
                  ["plan", "plan.md"],
                  [
                    "files",
                    <>
                      6 <span>chapter-03.md, chapter-04.md, outline.md, style.md, sources.md, plan.md</span>
                    </>,
                  ],
                  ["left out", "212 files"],
                ]}
              />
            </article>
            <article className="card card-wide scan">
              <div className="card-head">
                <span>after the turn</span>
                <span>receipts/2026-09-16-1412.md</span>
              </div>
              <h3>The receipt</h3>
              <p>
                After the turn ends, Vivary writes down what happened. What it saw, what it
                changed, what it left alone. It is a text file. Read it, keep it, or delete it.
              </p>
              <KV
                rows={[
                  ["agent", "claude code"],
                  ["saw", "6 files"],
                  [
                    "changed",
                    <>
                      2 <span>chapter-03.md (+38, -4), plan.md (+2)</span>
                    </>,
                  ],
                  ["left alone", "everything else"],
                  ["approved by", "you, 14:12"],
                  ["memory added", "1 line, pending your review"],
                ]}
              />
            </article>
          </div>
        </div>
      </Section>

      <Section id="memory" className="sec">
        <div className="wrap memory-grid">
          <figure className="memfig scan reveal">
            <div className="card-head">
              <span>field-guide / MEMORY.md</span>
              <span>plain text, 11 lines</span>
            </div>
            <blockquote className="speaks">
              Short chapters. Plain names for plants, Latin in a footnote. The reader is a beginner
              with a shovel, not a botanist. Chapter four was cut on the twelfth. Do not bring it
              back as a chapter. A sidebar is fine.
            </blockquote>
            <figcaption>
              Last line <span className="rec">added 2026-09-16 14:12</span>, approved by you.
            </figcaption>
          </figure>
          <div className="memory-copy">
            <h2 className="display display-lg reveal">The memory is a file you can open.</h2>
            <p className="lede reveal">
              That is a memory file. You wrote it, or the agent proposed a line and you approved
              it. It sits in the project folder as text. Open it in any editor. Change a line and
              the next conversation knows. Delete it and the agent forgets. There is no hidden
              store and no account holding a copy.
            </p>
            <p className="lede reveal">
              Memory is scoped to the project. Your field guide does not know about your grant
              application unless you say so.
            </p>
          </div>
        </div>
      </Section>

      <Section id="projects" className="sec">
        <div className="wrap stack">
          <div className="intro">
            <h2 className="display display-lg reveal">One window. Every project.</h2>
            <p className="lede reveal">
              Projects on the left. One conversation in the middle. Files open beside it when you
              ask. A project can hold several conversations, each with its own history and its
              own context.
            </p>
          </div>

          <div className="app-frame reveal" aria-label="The Vivary window, drawn" role="img">
            <div className="app" aria-hidden="true">
              <div className="app-nav">
                <div className="rail">PROJECTS</div>
                <div className="proj on">Field guide</div>
                <div className="conv on">Chapter four rewrite</div>
                <div className="conv">Sources check</div>
                <div className="conv">Intro draft</div>
                <div className="proj" style={{ paddingTop: "0.75rem" }}>
                  Grant application
                </div>
                <div className="proj">Newsletter, issue 31</div>
                <div className="proj">Reading notes</div>
                <div className="proj">Shop site</div>
                <div className="grow" />
                <span className="app-btn outline-lime" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  New conversation
                </span>
              </div>
              <div className="app-main">
                <div className="app-bar">
                  <div>
                    <b>
                      Field guide <span>/ Chapter four rewrite</span>
                    </b>
                    <small>
                      <span className="phone-only">Claude Code · approval: ask</span>
                      <span className="desk-only">C:\Users\you\Documents\field-guide · Claude Code · approval: ask</span>
                    </small>
                  </div>
                  <div className="tabs">
                    <span className="phone-only">Projects</span>
                    <span className="desk-only">Details</span>
                    <span className="on">Files</span>
                    <span className="desk-only">Changes</span>
                  </div>
                </div>
                <div className="app-thread">
                  <div className="app-me">
                    Bring chapter four back as a short sidebar inside chapter three. Keep the plant
                    names plain.
                  </div>
                  <div className="app-turn">
                    <div className="who">Claude Code · working</div>
                    <div className="read">read MEMORY.md, plan.md, chapter-03.md, chapter-04.md, style.md</div>
                    <div>
                      Chapter four is 1,900 words. The memory says not to bring it back as a
                      chapter. I cut it to a 240 word sidebar after the soil section in chapter
                      three and kept the plain names. One edit, one file.
                    </div>
                    <div className="app-ask">
                      <div className="sub">Requests permission to edit</div>
                      <b>
                        chapter-03.md <span>+38 lines, -4 lines</span>
                      </b>
                      <div className="row">
                        <span className="app-btn primary" style={{ display: "inline-flex", alignItems: "center" }}>
                          Approve
                        </span>
                        <span className="app-btn" style={{ display: "inline-flex", alignItems: "center" }}>
                          Decline
                        </span>
                        <span className="app-btn" style={{ display: "inline-flex", alignItems: "center" }}>
                          Stop
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="app-compose">
                  <div className="field">Ask for the next step</div>
                  <div className="row">
                    <div className="pick">
                      <span className="on">Claude Code</span>
                      <span>Codex</span>
                    </div>
                    <span className="app-btn primary" style={{ display: "inline-flex", alignItems: "center" }}>
                      Send
                    </span>
                  </div>
                </div>
              </div>
              <div className="app-files">
                <div className="head">
                  chapter-03.md <span>Close</span>
                </div>
                <div className="doc">
                  <h4>3. Soil, and what it wants</h4>
                  <p>
                    Dig a hole the depth of your hand. If the bottom holds water for an hour, you
                    have clay. If it drains before you find the kettle, you have sand. Most of us
                    have something in between and a lot of opinions.
                  </p>
                  <div className="aside">
                    Sidebar: The four plants that forgive a bad first year. Comfrey, chard, mint in
                    a pot, and the potato you forgot.
                  </div>
                  <p>Feed the soil, not the plant. Compost in autumn, mulch in spring, and the rest is patience.</p>
                </div>
                <div className="foot">
                  <span className="app-btn" style={{ display: "inline-flex", alignItems: "center" }}>
                    Edit
                  </span>
                  <span className="app-btn" style={{ display: "inline-flex", alignItems: "center" }}>
                    Add to conversation
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="notes reveal">
            <div className="note">
              <div className="key">conversations</div>
              <p>
                Each project holds several. Start another when the context is full or the work is
                separate. The old one stays where it was.
              </p>
            </div>
            <div className="note">
              <div className="key">files</div>
              <p>
                Open beside the conversation when you ask. Reading a file does not send it to the
                model. Adding it to the conversation is a separate, visible step.
              </p>
            </div>
            <div className="note">
              <div className="key">control</div>
              <p>
                Approve, decline and Stop stay in view while the agent works. The agent you chose
                keeps its own tools and permission rules. Vivary does not add a second set.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="sec">
        <div className="wrap stack">
          <h2 className="display display-lg reveal" style={{ maxWidth: "22ch" }}>
            Your agents. Your keys. Your machine.
          </h2>
          <div className="cards cards-3 reveal">
            {agentsCards.map((c) => (
              <article key={c.ord} className="card scan">
                <div className="ord">{c.ord}</div>
                <h3>{c.name}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="engine" className="sec">
        <div className="wrap two">
          <div className="lead engine-copy">
            <h2 className="display display-lg reveal">Four layers, named for the sky.</h2>
            <p className="lede reveal">
              Underneath the window is the Vivary engine, open source: the workspace commands. It
              is what decides which files go in the capsule, what gets written down, and what
              needs a human before it becomes permanent.
            </p>
            <p className="reveal" style={{ margin: 0, fontSize: "var(--t-sm)" }}>
              <a className="link" href="/commands/">
                Read about the commands
              </a>
            </p>
          </div>
          <div className="body reveal">
            <Rows rows={layers} label="The four layers" />
          </div>
        </div>
      </Section>

      <Section id="status" className="sec">
        <div className="wrap stack">
          <div className="intro">
            <h2 className="display display-lg reveal">Where it is today.</h2>
            <p className="lede reveal">
              Vivary is in development, Windows first. It is not released. This page describes
              what it is built to do. The list below says what is working now and what is not. It
              is updated when the build moves.
            </p>
          </div>
          <div className="today reveal">
            <Rows tight label="Working now" rows={facts.today.working.map((w) => ["working", w] as [string, string])} />
            <Rows tight label="Not yet" rows={facts.today.notYet.map((w) => ["not yet", w] as [string, string])} />
          </div>
          <p className="lede reveal" style={{ maxWidth: "none", fontSize: "var(--t-sm)" }}>
            The build happens in the open. Commits, decisions and the specification are on GitHub.{" "}
            <a className="link" href={facts.links.product}>
              Follow the build
            </a>{" "}
            is the only ask on this page.
          </p>
        </div>
      </Section>
    </Shell>
  );
}
