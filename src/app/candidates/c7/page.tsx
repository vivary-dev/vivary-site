import type { Metadata } from "next";
import { Big_Shoulders } from "next/font/google";
import { facts } from "@/content/facts";
import { Ledger, type Row } from "./ledger";
import { Section, TallyScene } from "./scenes";
import "./c7.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-v7-display",
});

export const metadata: Metadata = {
  title: "Vivary, a record from 2029",
  description: facts.product.line,
};

function key(main: string, sub: string) {
  return (
    <>
      {main}
      <small>{sub}</small>
    </>
  );
}

const memory: Row[] = [
  { k: key("2027-01-06", "entry 1"), v: "You write in the morning. Builds never get scheduled then." },
  {
    k: key("2027-03-18", "entry 40"),
    v: (
      <>
        Postgres, no ORM. Written to <span className="rec">decisions/2027-03-18-no-orm.md</span>.
      </>
    ),
  },
  { k: key("2027-11-04", "entry 118"), v: "Migrations stay closed unless you open them by hand." },
  {
    k: key("2028-06-21", "entry 240"),
    v: "Field notes live in a second workspace. They are never mixed into this one.",
  },
  {
    k: key("2029-09-13", "entry 312"),
    v: (
      <>
        The onboarding rewrite keeps the decision of <span className="rec">2027-03-18</span>. Receipt{" "}
        <span className="rec">run-04112</span>.
      </>
    ),
  },
];

const session: Row[] = [
  { k: key("you", "09:12"), v: "Finish the onboarding flow. Same rules as the plan." },
  {
    k: key("agent", "09:12"),
    v: (
      <>
        Working from <span className="rec">projects/onboarding/plan.md</span> and the decision of{" "}
        <span className="rec">2027-03-18</span>, Postgres with no ORM. Migrations stay closed.
      </>
    ),
  },
  {
    k: key("agent", "09:13"),
    v: (
      <>
        <span className="rec">notes/2025-archive.md</span> is not in this capsule. I did not read it.
      </>
    ),
  },
  {
    k: key("agent", "09:14"),
    v: (
      <>
        Done. The receipt is <span className="rec">receipts/run-04112.md</span>.
      </>
    ),
  },
];

const receipt: Row[] = [
  { k: "run", v: <span className="rec">04,112</span> },
  { k: "date", v: <span className="rec">2029-09-13</span> },
  {
    k: "capsule",
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
  { k: "changed", v: <span className="rec">src/onboarding/flow.ts</span> },
  { k: "left alone", v: <span className="rec">src/db/migrations/</span> },
  {
    k: "declined",
    v: (
      <>
        <span className="rec">notes/2025-archive.md</span>, not in the capsule
      </>
    ),
  },
  { k: "kept", v: "Here, as a file. Open it any time." },
];

function splitLead(sentence: string): Row {
  const cut = sentence.indexOf(". ");
  if (cut < 0) return { k: sentence, v: "" };
  return { k: sentence.slice(0, cut), v: sentence.slice(cut + 2) };
}

const promises: Row[] = facts.product.promises.map(splitLead);

const layers: Row[] = facts.layers.map((l) => ({ k: l.name, v: l.role }));

export default function Candidate7() {
  return (
    <div className={`v7 ${display.variable}`}>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#top">
            Vivary
          </a>
          <nav aria-label="Site">
            <a href="#report">The record</a>
            <a href="#engine">Engine</a>
            <a href={facts.links.github}>GitHub</a>
            <a href={facts.links.docs}>Docs</a>
          </nav>
        </div>
      </header>

      <Section id="top" className="hero in">
        <div className="wrap">
          <h1 className="display display-xl">By 2029, nobody works with an agent that forgets.</h1>
          <div className="hero-row">
            <div className="hero-copy">
              <p className="deck">
                {facts.product.line} {facts.product.what}
              </p>
              <div className="cta">
                <a className="btn btn-solid" href={facts.links.github}>
                  See Vivary on GitHub
                </a>
                <a className="btn" href="#report">
                  Read the record
                </a>
              </div>
            </div>
            <TallyScene />
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
                v: "The record below is dated 2029. It is written as if the next three years already happened, because that is the future Vivary is being built toward. It is not a claim about today. The product facts on this page are from the present, and the status line at the end is current.",
              },
            ]}
          />
        </div>
      </div>

      <Section id="report" className="report">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg reveal">Three years in. One workspace, read back.</h2>
            <p className="cap reveal">
              northfield, a software workspace opened <span className="nb">2027-01-06</span>. Read on{" "}
              <span className="nb">2029-09-13</span>, session 1,204.
            </p>
          </div>
          <div className="body">
            <div className="block reveal">
              <h3 className="display display-md">memory/MEMORY.md</h3>
              <p className="cap">312 entries. Five of them, years apart.</p>
              <Ledger rows={memory} label="Memory entries" />
            </div>

            <div className="block reveal">
              <h3 className="display display-md">Session 1,204</h3>
              <p className="cap">
                <span className="nb">2029-09-13</span>, from 09:12 to 09:14.
              </p>
              <Ledger rows={session} label="Session transcript" />
            </div>

            <div className="block reveal">
              <h3 className="display display-md">receipts/run-04112.md</h3>
              <p className="cap">One per run. This is number 4,112.</p>
              <Ledger rows={receipt} label="Receipt" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="calm">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg reveal">A workspace that remembers is calm.</h2>
            <p className="lede reveal">
              None of it is dramatic. That is the whole record. Nothing in it needed a reminder, a
              re-explanation, or a search through old chats. Here is what Vivary is, in the present
              tense.
            </p>
          </div>
          <div className="body">
            <div className="reveal">
              <Ledger rows={promises} plain label="What Vivary is" />
            </div>
            <div className="also reveal">
              <h3 className="display display-md">Also in the program</h3>
              <ul>
                {facts.product.alsoInTheProgram.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="engine" className="engine">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg reveal">{facts.engine.line}</h2>
            <p className="lede reveal">{facts.engine.summary}</p>
          </div>
          <div className="body">
            <div className="reveal">
              <Ledger rows={layers} label="Engine layers" />
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

      <footer>
        <div className="wrap">
          <span>Vivary. A record you can open.</span>
          <span>
            <a href={facts.links.github}>GitHub</a>
            <a href={facts.links.docs}>Docs</a>
            <a href={facts.links.pypi}>PyPI</a>
            <a href={facts.links.npm}>npm</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
