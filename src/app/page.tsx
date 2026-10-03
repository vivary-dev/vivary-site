import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { facts } from "@/content/facts";
import { Section } from "./scenes";
import { JsonLd, Shell } from "./shell";

// The home page, from the design canvas of 2026-09-16
// (docs/design/2026-09-16-home). Knowledge first: the claim, who it is
// for, capsule and receipt, the memory file, the window, the agents, the
// four layers, and where the build is today. Product claims come from facts.

export const metadata = pageMetadata(
  "Vivary | Desktop workspace for AI agents",
  "Work with AI agents, conversations and project files in one desktop workspace. Explore Vivary and its unsigned Windows preview for writing, research and code.",
  "/",
);

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
    name: "Note keepers",
    text: "Keep notes in an Obsidian vault or a plain folder. Choose which files to give the agent as context, and review any proposed changes before saving them.",
  },
  {
    mark: "strata-sprout",
    name: "Developers",
    text: "Keep code, plans and decisions in a project. Connect a supported coding runtime, ask it to inspect a change, and review its edits and test results.",
  },
];

const agentsCards = [
  {
    ord: "01",
    name: "Connect your agent tools",
    text: "Install and authenticate Claude Code or Codex separately, then check runtime readiness in Settings. Provider accounts, tools and permissions belong to the selected runtime.",
  },
  {
    ord: "02",
    name: "Know where context goes",
    text: facts.product.dataBoundary,
  },
  {
    ord: "03",
    name: "Keep files and history",
    text: "Project instructions, notes and handoffs can be text files in the project folder. App history and settings also live in its local profile and database. Back up both when needed.",
  },
];

const layers: [string, string][] = [
  ["tropo", "What the workspace knows. Your files, indexed and typed, so the engine can tell a plan from a draft from a source."],
  ["strato", "Workspace state and policy decisions in configured command workflows."],
  ["ozone", "Review rules and human gates for configured workflows. The runtime still owns its permissions."],
  ["exo", "Claims and conflicts. When more than one agent works in a project, who holds which file, and what happens when two want the same one."],
];

export default function Home() {
  return (
    <Shell current="home">
      <JsonLd data={jsonLd} />

      <Section id="top" className="hero in">
        <div className="wrap">
          <div className="hero-copy">
            <h1 className="display display-xl">Your projects. Your AI agents.</h1>
            <p className="deck">
              Vivary is a desktop workspace for working with AI agents on your own projects.
              Keep conversations beside your notes, research, drafts and code. Use Claude Code
              or Codex with its own account and permissions.
            </p>
            <p className="cap">It knows you. Because you wrote it down.</p>
            <div className="cta">
              <a className="btn btn-solid" href={facts.links.preview}>
                Get the Windows preview
              </a>
              <a className="btn" href="#how">
                See how it works
              </a>
            </div>
            <KV
              rows={[
                ["status", "unsigned Windows preview"],
                ["platform", "Windows x64"],
                ["account", "no Vivary account for local use"],
                ["agents", "Claude Code and Codex, separately installed"],
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
            <h2 className="display display-lg reveal">Writing, research, notes and code.</h2>
            <p className="lede reveal">
              Start with a project folder and a task. Ask an agent to revise a draft, compare
              research notes or work on code. These are ways to use the workspace, with tools
              and access determined by the runtime you choose.
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
            <h2 className="display display-lg reveal">Choose context. Review the record.</h2>
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
            <h2 className="display display-lg reveal">Projects, conversations and files.</h2>
            <p className="lede reveal">
              The workspace brings project conversations and files together. This illustration
              shows the intended arrangement, not a screenshot of the Windows preview. Read the
              preview guide for the downloaded build and its remaining limits.
            </p>
          </div>

          <div className="app-frame reveal" aria-label="Illustration of project navigation, an agent conversation and a file in Vivary" role="img">
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
                Keep separate tasks in separate conversations. Ask for a handoff when you need
                to carry decisions and unfinished work into another conversation.
              </p>
            </div>
            <div className="note">
              <div className="key">files</div>
              <p>
                Keep project files available while you work. Check what context you send to the
                selected runtime and what file access its permissions allow.
              </p>
            </div>
            <div className="note">
              <div className="key">control</div>
              <p>
                Review permission requests from the runtime you selected. Check its approval
                mode before starting work, and use Stop when you need to interrupt a run.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="sec">
        <div className="wrap stack">
          <h2 className="display display-lg reveal" style={{ maxWidth: "22ch" }}>
            Agent setup and your data.
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
            <h2 className="display display-lg reveal">Workspace commands for context and review.</h2>
            <p className="lede reveal">
              The open-source workspace commands can assemble context, record work and support
              review steps in a configured workflow. Your selected runtime controls its own
              permissions; these commands do not guarantee approval for every desktop action.
            </p>
            <p className="reveal" style={{ margin: 0, fontSize: "var(--t-sm)" }}>
              <a className="link" href="/commands/">
                Explore the workspace commands
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
            <h2 className="display display-lg reveal">Windows preview: download and limits.</h2>
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
            Read <a className="link" href="/what-is-vivary/">setup steps and preview limits</a> before starting.
            The skill collection is separate from the Windows download. A link does not install a skill.
          </p>
        </div>
      </Section>
    </Shell>
  );
}
