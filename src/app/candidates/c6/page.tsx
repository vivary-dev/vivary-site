import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { facts } from "@/content/facts";
import { CapsuleScene, HeroScene, Section, SessionsScene } from "./scenes";
import "./c6.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-v6-display",
});

export const metadata: Metadata = {
  title: "Vivary, a workspace for your agents",
  description: facts.product.line,
};

export default function Candidate6() {
  return (
    <div className={`v6 ${display.variable}`}>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#top">
            <i aria-hidden="true" />
            Vivary
          </a>
          <nav aria-label="Site">
            <a href="#how">How it works</a>
            <a href={facts.links.github}>GitHub</a>
            <a href={facts.links.docs}>Docs</a>
          </nav>
        </div>
      </header>

      <Section id="top" className="hero in">
        <div className="wrap">
          <div>
            <h1 className="display display-xl reveal">
              Agents don&apos;t need a better chat. They need a workspace.
            </h1>
            <p className="lede reveal">
              Vivary is a desktop where your agents work from files you own. Every project, every
              decision, everything they learn about you, kept on your machine in files you can open.
            </p>
            <div className="cta reveal">
              <a className="btn btn-mint" href={facts.links.github}>
                See Vivary on GitHub
              </a>
              <a className="btn btn-ghost" href="#how">
                How it works
              </a>
            </div>
          </div>
          <HeroScene />
        </div>
      </Section>

      <Section id="how" className="vapor">
        <div className="wrap two">
          <div className="stack">
            <p className="kicker reveal">Where the work goes today</p>
            <h2 className="display display-lg reveal">Every chat ends the same way.</h2>
            <p className="lede reveal">
              You explain the project. The agent gets it. You get somewhere. Then the session ends,
              and tomorrow it knows nothing. The work lives in a transcript you do not own, in a
              window you cannot search, on a server you cannot see.
            </p>
            <p className="bigstat reveal">
              0<small>files carried forward when the chat ends</small>
            </p>
          </div>
          <div className="chatstack" aria-hidden="true">
            <p className="bubble me">Remember, the onboarding flow uses Postgres with no ORM.</p>
            <p className="bubble it">Got it. Postgres, no ORM.</p>
            <p className="bubble me">And do not touch the migrations. We agreed on that last week.</p>
            <p className="bubble it">I do not have access to previous conversations, but I will follow that now.</p>
            <div className="ended">
              <span>session ended</span>
              <b>carried forward: 0 files</b>
            </div>
          </div>
        </div>
      </Section>

      <Section className="paper">
        <div className="wrap">
          <div className="stack" style={{ maxWidth: "44rem" }}>
            <p className="kicker reveal">The shift</p>
            <h2 className="display display-lg reveal">
              In Vivary, nothing is lost when the chat ends. It is filed.
            </h2>
            <p className="lede reveal">
              Plans, decisions, results, and what the agent learned about you become plain files in
              your project. Open them in any editor. Keep them forever. The next session starts from
              all of it.
            </p>
          </div>
          <div style={{ marginTop: "3rem" }} className="reveal">
            <SessionsScene />
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <div className="stack" style={{ maxWidth: "44rem" }}>
            <p className="kicker reveal">Bounded context</p>
            <h2 className="display display-lg reveal">
              It sees only what it should. And it shows you what it saw.
            </h2>
            <p className="lede reveal">
              Before the agent works, Vivary hands it a capsule: the few files that matter for this
              task and nothing else. After, it leaves a receipt: what it read, what it changed, what
              it left alone.
            </p>
          </div>
          <div style={{ marginTop: "3rem" }}>
            <CapsuleScene />
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <div className="stack" style={{ maxWidth: "44rem" }}>
            <p className="kicker reveal">One window</p>
            <h2 className="display display-lg reveal">One window. Every project. Your machine.</h2>
            <p className="lede reveal">{facts.product.what}</p>
          </div>
          <div className="window reveal" style={{ marginTop: "3rem" }} aria-hidden="true">
            <div className="bar">
              <i />
              <i />
              <i />
              <span>Vivary</span>
            </div>
            <div className="cols">
              <div className="col">
                <h5>Projects</h5>
                <div className="on">my-workspace</div>
                <div>field-notes</div>
                <div>ledger</div>
              </div>
              <div className="col">
                <p className="msg">
                  <b>You</b>
                  Finish the onboarding flow. Same rules as the plan.
                </p>
                <p className="msg">
                  <b>Agent</b>
                  Working from plan.md, the no-ORM decision, and MEMORY.md. Migrations stay closed.
                  Receipt will be in receipts/ when I am done.
                </p>
              </div>
              <div className="col">
                <h5>Files</h5>
                <div>AGENTS.md</div>
                <div>STATE.md</div>
                <div>memory/MEMORY.md</div>
                <div>decisions/</div>
                <div>projects/onboarding/</div>
                <div>receipts/</div>
              </div>
            </div>
          </div>
          <div className="three">
            <div className="reveal">
              <h3>Runs the agents you already use</h3>
              <p>Local CLI models, your own keys, on your computer.</p>
            </div>
            <div className="reveal">
              <h3>No account. No cloud control plane.</h3>
              <p>Nothing to sign up for and no server to trust with your work.</p>
            </div>
            <div className="reveal">
              <h3>Version control is your choice</h3>
              <p>None, Git, or Jujutsu. Hosting a repository is a separate, optional step.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="paper">
        <div className="wrap">
          <div className="stack" style={{ maxWidth: "44rem" }}>
            <p className="kicker reveal">More than code</p>
            <h2 className="display display-lg reveal">A workspace for whatever you actually do.</h2>
            <p className="lede reveal">
              Second brains, knowledge bases, research, writing, and software. Each one composed from
              patterns you can rename or drop, and each one a folder of files that stays yours.
            </p>
          </div>
          <div className="kinds">
            <div className="kind reveal">
              <h3>Second brain</h3>
              <div>inbox/</div>
              <div>notes/</div>
              <div>memory/</div>
              <div>index.md</div>
            </div>
            <div className="kind reveal">
              <h3>Research</h3>
              <div>sources/</div>
              <div>claims/</div>
              <div>drafts/</div>
              <div>receipts/</div>
            </div>
            <div className="kind reveal">
              <h3>Writing</h3>
              <div>brief.md</div>
              <div>drafts/</div>
              <div>reviews/</div>
              <div>memory/</div>
            </div>
            <div className="kind reveal">
              <h3>Software</h3>
              <div>src/</div>
              <div>decisions/</div>
              <div>receipts/</div>
              <div>STATE.md</div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="engine">
        <div className="wrap">
          <div className="stack" style={{ maxWidth: "44rem" }}>
            <p className="kicker reveal">Built in the open</p>
            <h2 className="display display-md reveal">
              Vivary desktop runs on the Vivary library. The library ships today.
            </h2>
            <p className="lede reveal">{facts.engine.summary}</p>
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
            <span className="mono" style={{ color: "var(--text-3)" }}>
              create-vivary {facts.shipped.packages[0].version}, verified {facts.shipped.verifiedOn}
            </span>
          </div>
          <p className="status">{facts.product.status}</p>
        </div>
      </Section>

      <footer>
        <div className="wrap">
          <span>Vivary. Files you own. Agents that remember.</span>
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
