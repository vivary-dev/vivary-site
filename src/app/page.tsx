import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { facts } from "@/content/facts";
import { JsonLd, Shell } from "./shell";

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

const tasks = [
  { name: "Writing", text: "Bring an outline, style notes and a draft. Ask for a revision you can read and check.", mark: "dome-sprout" },
  { name: "Research", text: "Keep sources and notes in one project. Compare claims and check the files behind a summary.", mark: "wave-globe" },
  { name: "Notes", text: "Work with a plain folder or an Obsidian vault. Choose the notes to share as context.", mark: "seed-world" },
  { name: "Code", text: "Keep code, plans and decisions together. Ask for a change, then inspect its edits and tests.", mark: "strata-sprout" },
];

export default function Home() {
  return (
    <Shell current="home">
      <JsonLd data={jsonLd} />
      <section id="top" className="landing-hero">
        <div className="wrap">
          <div className="landing-copy">
            <p className="eyebrow">Projects, files and conversations</p>
            <h1 className="display">Your projects.<br />Your AI agents.</h1>
            <p className="deck">
              Vivary is a desktop workspace for working with AI agents on your own projects.
              Keep conversations beside your notes, research, drafts and code.
            </p>
            <div className="cta">
              <a className="btn btn-solid" href={facts.links.preview}>Get the Windows preview <span aria-hidden="true">↗</span></a>
              <Link className="text-link" href="/what-is-vivary/#install">Read the setup guide <span aria-hidden="true">→</span></Link>
            </div>
            <p className="release-note">Windows x64 · Unsigned preview · September 22, 2026</p>
          </div>
          <div className="character">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/mascot/v1/lead-transparent.png" width={1402} height={1122} alt="" aria-hidden="true" fetchPriority="high" />
            <p>It knows you. Because you wrote it down.</p>
          </div>
        </div>
        <div className="wrap">
          <div className="hero-facts">
            <span>Use Claude Code or Codex</span>
            <span>Bring your own runtime and account</span>
            <span>Keep project files on your machine</span>
          </div>
        </div>
      </section>

      <section id="projects" className="sec workspace-section">
        <div className="wrap stack">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Inside the workspace</p>
              <h2 className="display display-lg">A conversation.<br />A project to work on.</h2>
            </div>
            <p className="lede">Open a project, choose a configured runtime and give the conversation a task. Your files and the conversation stay within reach.</p>
          </div>
          <figure className="product-figure">
            <a href="/brand/product/workspace-development.png" aria-label="Open the full-size Vivary development screenshot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/product/workspace-development.png" width={1280} height={900} loading="lazy" decoding="async" alt="Vivary development workspace with project navigation, an empty agent conversation and runtime setup controls." />
            </a>
            <figcaption>Browser capture of the development app, October 3, 2026. An empty workspace before Claude Code sign-in. The September 22 Windows download differs. Read its <a href={facts.links.installGuide}>preview guide</a>.</figcaption>
          </figure>
          <ol id="how" className="workflow" role="list">
            <li><span className="step-number" aria-hidden="true">01</span><h3>Open your project</h3><p>Start with the files for your task. Keep separate conversations for separate pieces of work.</p></li>
            <li><span className="step-number" aria-hidden="true">02</span><h3>Connect your agent</h3><p>Install and authenticate Claude Code or Codex separately. Check runtime readiness in Settings.</p></li>
            <li><span className="step-number" aria-hidden="true">03</span><h3>Review what changes</h3><p>Inspect the result and respond to your runtime’s permission requests. Its settings control tools and access.</p></li>
          </ol>
        </div>
      </section>

      <section id="for" className="sec">
        <div className="wrap stack">
          <div className="section-heading">
            <div><p className="eyebrow">Start with a task</p><h2 className="display display-lg">More than a code folder.</h2></div>
            <p className="lede">Writing, research, notes and code can all begin with project files. Available tools depend on the runtime you choose.</p>
          </div>
          <div className="task-grid">
            {tasks.map((task) => (
              <article key={task.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/brand/vivary-mark-${task.mark}-bone.svg`} width={48} height={48} alt="" loading="lazy" />
                <h3>{task.name}</h3><p>{task.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="memory" className="sec">
        <div className="wrap memory-layout">
          <div>
            <p className="eyebrow">Keep the useful context</p>
            <h2 className="display display-lg">A memory file<br />you can open.</h2>
            <p className="lede">Keep instructions and handoffs in files you can read and edit. Write them yourself, or review a line proposed by an agent.</p>
            <p className="lede">Conversation history is stored separately in the app profile. Changing a memory file does not erase context already sent to a provider.</p>
            <Link className="text-link" href="/what-is-vivary/#workspace">How files and memory fit together <span aria-hidden="true">→</span></Link>
          </div>
          <figure className="memory-example">
            <div className="file-label"><span>field-guide / MEMORY.md</span><span>Example</span></div>
            <blockquote className="speaks">Short chapters. Plain names for plants, Latin in a footnote. The reader is a beginner with a shovel, not a botanist.</blockquote>
            <figcaption>A plain-text project note. You choose what to share with the runtime.</figcaption>
          </figure>
        </div>
      </section>

      <section id="engine" className="sec command-teaser">
        <div className="wrap section-heading">
          <div><p className="eyebrow">Prefer a terminal?</p><h2 className="display display-lg">The workspace commands<br />are here, too.</h2></div>
          <div>
            <p className="lede">Create a workspace, assemble context and inspect records with the published CLI packages. Configured command workflows have their own review steps.</p>
            <Link className="text-link" href="/commands/">Open the command guide <span aria-hidden="true">→</span></Link>
            <p className="cap">CLI installation and the desktop download are separate.</p>
          </div>
        </div>
      </section>

      <section id="status" className="sec">
        <div className="wrap download-panel">
          <div>
            <p className="eyebrow">Try Vivary</p>
            <h2 className="display display-lg">Start with the Windows preview.</h2>
            <p className="lede">{facts.product.status}</p>
            <div className="cta">
              <a className="btn btn-solid" href={facts.links.preview}>Download and release notes <span aria-hidden="true">↗</span></a>
              <Link className="text-link" href="/what-is-vivary/#limits">Read the known limits</Link>
            </div>
          </div>
          <div className="download-details">
            <h3>Before you begin</h3>
            <p>Read the installation guide, verify the ZIP checksum and keep your project folders and app profile backed up.</p>
            <p>{facts.product.dataBoundary}</p>
            <a className="text-link" href={facts.links.installGuide}>Windows installation instructions <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
