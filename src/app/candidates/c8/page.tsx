import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { facts } from "@/content/facts";
import { Section, Whispers } from "./scenes";
import "./c8.css";

const serif = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-c8-serif",
});

export const metadata: Metadata = {
  title: "Vivary, the workspace that knows you from your files",
  description: facts.product.line,
};

const years = [
  {
    when: "Session 1",
    said: [{ t: "You write in the morning.", add: true }],
  },
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

const promises = [
  {
    head: "No account",
    body: "Nothing to sign up for and no server to trust with your work.",
  },
  {
    head: "Your machine, your keys",
    body: "Local CLI models and the keys you already have, running on your computer.",
  },
  {
    head: "Your folder stays yours",
    body: "Open a folder you already have. Opening it changes nothing inside it until you say so.",
  },
  {
    head: "Version control is your choice",
    body: "None, Git, or Jujutsu. Hosting a repository is a separate, optional step.",
  },
];

export default function Candidate8() {
  return (
    <div className={`c8 ${serif.variable}`}>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#top">
            Vivary
          </a>
          <nav aria-label="Site">
            <a href="#memory">Memory</a>
            <a href="#engine">Engine</a>
            <a href={facts.links.github}>GitHub</a>
          </nav>
        </div>
      </header>

      <Section id="top" className="hero">
        <div className="wrap">
          <Whispers />
          <hr className="horizon" />
          <div className="claim">
            <h1>
              <span>It knows you.</span>
              <span>Because you wrote it down.</span>
            </h1>
            <div className="claim-side">
              <p className="deck">
                {facts.product.line} What it learns about you is saved as files you can read, edit,
                and delete.
              </p>
              <div className="cta">
                <a className="btn btn-paper" href={facts.links.github}>
                  See Vivary on GitHub
                </a>
                <a className="btn btn-quiet" href="#memory">
                  What it remembers
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="paper confession">
        <div className="wrap two">
          <div className="stack">
            <h2>Every run ends with an account of itself.</h2>
            <p className="body">
              Before the agent works, Vivary hands it a capsule. The few files that matter for this
              task and nothing else. After, it leaves a receipt of what it saw, and the receipt is a
              file that stays in your project.
            </p>
            <p className="body quiet">
              You do not have to trust the summary. You can read the same files it read.
            </p>
          </div>
          <div className="receipt reveal">
            <p className="filename">
              <span>receipts/run-0412.md</span>
              <span className="lines">2026-09-13</span>
            </p>
            <h3>What I saw</h3>
            <p className="f">STATE.md</p>
            <p className="f">memory/MEMORY.md</p>
            <p className="f">decisions/2026-09-02-no-orm.md</p>
            <p className="note">3 of 41 files in this project.</p>
            <h3>What I changed</h3>
            <p className="f">src/onboarding/flow.ts</p>
            <h3>What I left alone</h3>
            <p className="f held">src/db/migrations/</p>
            <p className="note held">Everything you did not ask for.</p>
          </div>
        </div>
      </Section>

      <Section className="house">
        <div className="wrap">
          <div className="stack lead">
            <h2>Every project is a room. One window opens all of them.</h2>
            <p className="body">{facts.product.what}</p>
            <p className="body quiet">
              Second brains, knowledge bases, research, writing, and software, each one composed from
              patterns you can rename or drop.
            </p>
          </div>
          <div className="window reveal" aria-hidden="true">
            <div className="bar">
              <span>Vivary</span>
            </div>
            <div className="cols">
              <div className="col rooms">
                <p className="rail">Projects</p>
                <p className="room on">
                  my-workspace<span>software</span>
                </p>
                <p className="room">
                  field-notes<span>second brain</span>
                </p>
                <p className="room">
                  the-second-novel<span>writing</span>
                </p>
                <p className="room">
                  transit-study<span>research</span>
                </p>
                <p className="room">
                  ledger<span>knowledge base</span>
                </p>
              </div>
              <div className="col talk">
                <p className="msg">
                  <b>You</b>
                  Finish the onboarding flow. Same rules as the plan.
                </p>
                <p className="msg them">
                  <b>Vivary</b>
                  Working from plan.md, the no-ORM decision, and what I know about you. The
                  migrations stay closed.
                </p>
                <p className="msg them">
                  <b>Vivary</b>
                  Done. I read three files and changed one. The receipt is in
                  receipts/run-0412.md.
                </p>
              </div>
              <div className="col files">
                <p className="rail">Files</p>
                <p className="f">AGENTS.md</p>
                <p className="f">STATE.md</p>
                <p className="f open">memory/MEMORY.md</p>
                <p className="f">decisions/</p>
                <p className="f">projects/onboarding/</p>
                <p className="f">receipts/</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="kept ruled">
        <div className="wrap two">
          <div className="stack">
            <h2>It keeps the promises you can check.</h2>
            <p className="body">
              A familiar that lives in your house does not phone home. Every promise below is one you
              can verify by looking at your own machine.
            </p>
          </div>
          <dl className="promises">
            {promises.map((p) => (
              <div key={p.head} className="reveal">
                <dt>{p.head}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="memory" className="paper year">
        <div className="wrap">
          <div className="stack lead">
            <h2>The file gets longer. That is the whole trick.</h2>
            <p className="body">
              Each session adds a line or two. A year later it is still a file, still yours, still
              plain text you can read from the top. Nothing about you is held anywhere you cannot
              open.
            </p>
          </div>
          <p className="filename group">
            <span>memory/MEMORY.md</span>
            <span className="lines">one file, three moments</span>
          </p>
          <div className="grow">
            {years.map((y) => (
              <div key={y.when} className="moment reveal">
                <h3>{y.when}</h3>
                {y.said.map((s) => (
                  <p key={s.t} className={s.add ? "said add" : "said"}>
                    {s.t}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="engine" className="engine">
        <div className="wrap">
          <div className="stack lead">
            <h2>{facts.engine.line}</h2>
            <p className="body">{facts.engine.summary}</p>
          </div>
          <div className="layers">
            {facts.layers.map((l) => (
              <div key={l.name} className="reveal">
                <h3>{l.name}</h3>
                <p>{l.role}</p>
              </div>
            ))}
          </div>
          <div className="install reveal">
            <code>{facts.shipped.install}</code>
            <p className="note">
              create-vivary {facts.shipped.packages[0].version}, verified {facts.shipped.verifiedOn}
            </p>
          </div>
          <div className="status-band">
            <p className="status">{facts.product.status}</p>
          </div>
        </div>
      </Section>

      <footer>
        <div className="wrap">
          <p>Vivary. It knows you because you wrote it down.</p>
          <nav aria-label="Elsewhere">
            <a href={facts.links.github}>GitHub</a>
            <a href={facts.links.docs}>Docs</a>
            <a href={facts.links.pypi}>PyPI</a>
            <a href={facts.links.npm}>npm</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
