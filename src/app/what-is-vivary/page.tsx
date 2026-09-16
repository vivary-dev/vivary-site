import type { Metadata } from "next";
import Link from "next/link";
import { facts } from "@/content/facts";
import { Ledger, type Row } from "../ledger";
import { Section } from "../scenes";
import { AgentsLine, JsonLd, Shell } from "../shell";

// The product description as a real page. Same facts as public/llms.txt and
// docs/brand/08-product-description.md. The first sentence defines the thing.

export const metadata: Metadata = {
  title: "What Vivary is",
  description:
    "Vivary is a desktop application for working with AI agents on your own projects. One window for every project. No account. Your files stay on your machine.",
  alternates: { canonical: "/what-is-vivary/" },
};

const define =
  "Vivary is a desktop application for working with AI agents on your own projects. It brings agent chat, project files, tools, and memory into one window on your computer.";

const steps: { k: string; v: string; why: string }[] = [
  {
    k: "Choose a project",
    v: "Open a new folder or one you already have. Opening a folder changes nothing inside it until you say so.",
    why: "You should not have to remember which window or agent owns your work.",
  },
  {
    k: "Return to a conversation",
    v: "Or start another. A project holds several independent chats. One shows in the center at a time, with its own history and its own bounded context.",
    why: "A long project needs more than one context window, and separate work should not blur into one transcript.",
  },
  {
    k: "Choose a harness and model",
    v: "New conversations select Claude Code or Codex. Vivary shows what the installed tool actually offers and adds no second tool picker.",
    why: "A model is a choice within a harness. The harness owns its tools and permissions.",
  },
  {
    k: "Approve or decline work",
    v: "Send starts immediately. When the selected permission mode requires a decision, you approve or deny the exact request. Stop is always reachable.",
    why: "Background work must be visible and understandable.",
  },
  {
    k: "Open a file when you need it",
    v: "Read it beside the conversation. Choose Edit to change it. Viewing a file does not send it to a model.",
    why: "Inspecting a file should not interrupt the conversation or lose a draft.",
  },
  {
    k: "Leave a continuation record",
    v: "Ask the agent to update the handoff: goal, state, decisions, evidence, next step.",
    why: "A future conversation should have a useful starting point.",
  },
];

const promises: Row[] = facts.product.promises.map((p) => {
  const [k, ...rest] = p.split(". ");
  return { k, v: rest.join(". ") };
});

const not: Row[] = [
  { k: "Not an agent or a model", v: "Vivary is the workspace around the agents you already use." },
  { k: "Not a platform", v: "Nothing to adopt. Not tied to one editor, one AI tool, or one model." },
  { k: "Not a course", v: "A tool for doing real work, not for learning how." },
  { k: "Not a marketplace", v: "Templates start as an offline baseline. Downloads never imply execution." },
  { k: "Not a cloud", v: "No control plane, no telemetry from the workspace, no account." },
];

const faq: { q: string; a: string }[] = [
  { q: "Is Vivary an AI model or an agent?", a: "No. Vivary is the workspace around the agents you already use." },
  { q: "Does it need an account?", a: "No. The desktop app opens without one." },
  {
    q: "Does my data leave my computer?",
    a: "Vivary itself sends nothing. The harness you select sends model context to its provider according to your own account and settings.",
  },
  { q: "Does it work with Claude Code?", a: "Yes. Claude Code and Codex are the first supported harnesses, through adapters." },
  { q: "Does it require Git?", a: "No. A project can use no version control, Git, or Jujutsu." },
  { q: "Is it only for developers?", a: "No. It serves coding, research, writing, and second-brain work." },
  { q: "Can I download it?", a: "Not yet. Vivary is in development and not released. This site goes live with the app." },
  {
    q: "Is it open source?",
    a: "The workspace commands are published under MIT. The desktop application is in private development.",
  },
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
              <h1 className="display display-lg">What Vivary is.</h1>
              <p className="define">{define}</p>
            </div>
            <div className="body">
              <p className="lede">
                It runs the coding agents you already use, such as Claude Code and Codex, with your
                own keys. No Vivary account. No cloud control plane. Your files, history, and memory
                stay on your machine.
              </p>
              <p className="lede quiet">
                The name comes from vivarium, an old word for a small self-contained world where
                living things are kept in stacked layers. Your project lives inside a small,
                well-formed world with a substrate, an atmosphere of rules and review, and gates at
                the edges.
              </p>
              <p className="status">{facts.product.status}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">How it works, in six steps.</h2>
            <p className="lede">
              Before an agent works, Vivary hands it a bounded capsule of the files that matter.
              After, it leaves a receipt: what it saw, what it changed, what it left alone.
            </p>
          </div>
          <div className="body">
            <Ledger
              label="Six steps"
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
            <h2 className="display display-lg">What it promises.</h2>
            <p className="lede">Each one is something you can check on your own machine.</p>
          </div>
          <div className="body">
            <Ledger rows={promises} plain label="Promises" />
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
              Professionals doing coding, research, writing, and second-brain work. You need to be
              able to install software and message an agent. You do not need to program.
            </p>
            <p className="lede quiet">
              Existing Claude Code and Codex subscriptions are the intended first connection. The
              desired action is one button to connect the coding agent you already have.
            </p>
          </div>
        </div>
      </Section>

      <Section className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">What it is not.</h2>
          </div>
          <div className="body">
            <Ledger rows={not} plain label="What Vivary is not" />
          </div>
        </div>
      </Section>

      <Section id="questions" className="chapter in">
        <div className="wrap two">
          <div className="lead">
            <h2 className="display display-lg">Questions people ask.</h2>
            <p className="lede">
              Short answers. The workspace commands have their own page.{" "}
              <Link href="/commands/">Read about the commands.</Link>
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
