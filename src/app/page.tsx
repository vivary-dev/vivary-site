import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
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
      url: `${SITE_URL}/`,
    },
    { "@type": "Organization", name: "The Little AI Company", url: "https://littleaicompany.com/", sameAs: ["https://github.com/The-Little-AI-Company"] },
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
    text: "A book, a newsletter, a script. Choose the outline, style notes and draft to share with your agent. Review your runtime permissions to control access beyond the project.",
  },
  {
    mark: "wave-globe",
    name: "Researchers",
    text: "Keep sources, notes and claims together in a project. Ask the agent to cite source files in its summary, then check those references.",
  },
  {
    mark: "seed-world",
    name: "Second brain keepers",
    text: "Keep notes in an Obsidian vault or a plain folder. Choose which files to give the agent as context, and review any proposed changes before saving them.",
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
    text: facts.product.dataBoundary,
  },
  {
    ord: "03",
    name: "Plain files",
    text: "Project instructions, notes and handoffs can be text files in the project folder. App history and settings also live in its local profile and database. Back up both when needed.",
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
              plans and code, each in its own project, in one window. Open a project, choose an
              agent and keep its work beside your files.
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
                ["status", "public Windows preview"],
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
              The workspace commands support bounded context and inspectable records. These
              examples illustrate that workflow. They do not promise an automatic receipt for
              every turn in the downloaded desktop preview.
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
                A capsule lists the files selected for a task. This example uses a field guide,
                its plan and project instructions. Inspect the actual context and permissions
                offered by the selected runtime.
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
                A receipt records what a workflow saw, changed and left alone. This example
                shows a text record you can inspect. Check the relevant command or runtime
                documentation for the records it actually produces.
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="memory-mascot"
              src="/brand/mascot/v1/lead-transparent.png"
              width={1402}
              height={1122}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <h2 className="display display-lg reveal">Project memory you can open.</h2>
            <p className="lede reveal">
              This is an example project memory file. You can write it yourself or review a line
              proposed by an agent. Keep instructions and handoffs in files you can inspect.
              Conversation history is stored separately in the app profile.
            </p>
            <p className="lede reveal">
              Choose which project files to share with an agent. Editing a memory file does not
              erase context already sent to a provider or retained in conversation history.
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
              The open-source workspace commands can assemble context, record work and support
              review steps in a configured workflow. Your selected runtime controls its own
              permissions; these commands do not guarantee approval for every desktop action.
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
              {facts.product.status}
            </p>
          </div>
          <div className="today reveal">
            <Rows tight label="Available preview" rows={facts.today.working.map((w) => ["available", w] as [string, string])} />
            <Rows tight label="Not yet" rows={facts.today.notYet.map((w) => ["not yet", w] as [string, string])} />
          </div>
          <p className="lede reveal" style={{ maxWidth: "none", fontSize: "var(--t-sm)" }}>
            <a className="link" href={facts.links.preview}>Windows preview and release notes</a>{" · "}
            <a className="link" href={facts.links.installGuide}>Installation instructions</a>{" · "}
            <a className="link" href={facts.links.product}>Current source</a>{" · "}
            <a className="link" href={facts.links.skills}>Company skills collection</a>.
            The skill collection is separate from the Windows download. A link does not install a skill.
          </p>
        </div>
      </Section>
    </Shell>
  );
}
