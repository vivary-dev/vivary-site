// The only source of product claims for every page. The `product` block
// describes the Vivary desktop app from the program design documents.
// The `shipped` and `commands` blocks describe the commands that ship today.
// Public availability and links verified 2026-10-03 against vivary-dev/vivary.
// Release: releases/tag/desktop-preview-2026-09-22, INSTALL-WINDOWS.md asset.
// Keep downloaded-preview evidence separate from newer dev source.

export const facts = {
  name: "Vivary",

  // Settled by Jeff on 2026-07-25 (issue 215) as the first-screen sentence.
  firstScreen:
    "Chat fades, files persist. Vivary is the part that decides which of those files your agent gets to see, and shows you what it saw.",

  // The product line, from the 2026-09-05 direction in design.md. Draft wording.
  productLine: "Local desktop workspaces where agents work from files you own.",

  // Install-verified baseline from product docs/ORIGINAL-CLI.md, 2026-08-15.
  // Newer registry availability is listed there separately from runtime evidence.
  shipped: {
    install: "uvx --from create-vivary==0.4.2 create-vivary init my-workspace --preset coding --no-wizard",
    installNpm: "npx @vivary/create@0.4.2 init my-workspace --preset coding --no-wizard",
    packages: [
      { name: "create-vivary", version: "0.4.2", registry: "PyPI" },
      { name: "@vivary/create", version: "0.4.2", registry: "npm" },
      { name: "vivary-tropo", version: "0.5.3", registry: "PyPI" },
      { name: "vivary-strato", version: "0.1.2", registry: "PyPI" },
      { name: "vivary-ozone", version: "0.3.1", registry: "PyPI" },
      { name: "vivary-exo", version: "0.3.0", registry: "PyPI" },
    ],
    verifiedOn: "2026-08-15",
    fiveFiles: ["AGENTS.md", "STATE.md", ".gitignore", ".vivary/context.md", ".vivary/workspace.toml"],
  },

  // Verified behavior of the shipped CLI.
  claims: [
    "A new workspace starts with five small files. Nothing else is written until real work needs it.",
    "Adopting an existing project starts with a dry run. It adds at most three files and asks for approval against an exact hash before writing.",
    "Doctor checks the contract and the privacy boundary without touching your files.",
    "The agent gets a bounded capsule of context, and a receipt records what it saw.",
    "Workspace files stay in your project. An agent runtime may send context to its provider under your settings.",
  ],

  // The four layers, as the product describes them.
  layers: [
    { name: "tropo", role: "A typed knowledge graph of what the workspace knows and what depends on what." },
    { name: "strato", role: "One visible state surface, private boundaries, and a loop that only grows when work earns it." },
    { name: "ozone", role: "Graph-aware review and human gates for changes that are durable, destructive, or public." },
    { name: "exo", role: "Claims, conflicts, and role contracts for the moment one agent becomes many." },
  ],

  // Public GitHub prerelease and its installation asset, verified 2026-10-03.
  product: {
    name: "Vivary",
    line: "A desktop workspace for working with AI agents on your own projects.",
    status:
      "A public, unsigned Windows x64 preview is available. Development continues. Some desktop workflows still need testing.",
    previewTag: "desktop-preview-2026-09-22",
    previewPublished: "2026-09-22",
    previewSource: "9884670",
    // Current public README and preview installation guide. These describe
    // product boundaries, not acceptance claims for every provider or workflow.
    promises: [
      "Projects and conversations. Work with agents and files in one desktop workspace.",
      "Your files. Project documents stay in their folders. App history and settings also use a local profile and database.",
      "Your agent tools. Claude Code and Codex use their own authentication and provider settings.",
      "Local use. No Vivary account is needed for local desktop use. Self-hosted browser access is explicit and authenticated.",
      "Inspectable project memory. Keep instructions and handoffs in files you can read and edit. Conversation history is separate.",
      "Preview limits. Read the dated installation guide and release notes before using the Windows preview.",
    ],
    dataBoundary:
      "Project files and the app profile live on the host. The selected runtime or provider can receive context under your settings. Self-hosted browser access is explicit and authenticated.",
  },

  // The workspace commands inside Vivary. Bundled in the app and published
  // today as packages, so a terminal can use them without the app.
  // Decided 2026-09-16: one product. Never describe these as a separate or
  // earlier Vivary.
  commands: {
    line: "The workspace commands ship today.",
    summary:
      "Inside the app, Vivary sets up and operates workspaces with a small set of commands: a typed knowledge graph, one visible state surface, review with human gates, and coordination for many agents. The same commands are published as packages, so you can use them from a terminal right now.",
    names: ["vivary", "create-vivary", "tropo", "strato", "ozone", "exo"],
  },

  // Distribution facts verified from the September 22 public GitHub prerelease.
  // This is not a fresh acceptance matrix for all code currently on dev.
  today: {
    working: [
      "public Windows x64 preview, published 2026-09-22",
      "unsigned development build from source 9884670",
      "installation instructions, release notes and SHA-256 file with the release",
      "public app source under the MIT license",
    ],
    notYet: [
      "a stable desktop release",
      "a guarantee that newer dev changes are in the September preview",
      "verified support for every provider, tool or workflow",
      "an automatic installation from a website or skill link",
    ],
  },

  links: {
    github: "https://github.com/vivary-dev/vivary",
    org: "https://github.com/vivary-dev",
    // The product repository. Public since 2026-09-16. "Follow the build" goes here.
    product: "https://github.com/vivary-dev/vivary",
    preview: "https://github.com/vivary-dev/vivary/releases/tag/desktop-preview-2026-09-22",
    installGuide: "https://github.com/vivary-dev/vivary/releases/download/desktop-preview-2026-09-22/INSTALL-WINDOWS.md",
    skills: "https://github.com/The-Little-AI-Company/skills",
    statechartSkill: "https://github.com/The-Little-AI-Company/skills/blob/main/skills/design/statechart-design-review/SKILL.md",
    commandSource: "https://github.com/vivary-dev/vivary-cli",
    commandReference: "https://github.com/vivary-dev/vivary-cli/blob/dev/docs/COMMANDS.md",
    pypi: "https://pypi.org/project/create-vivary/",
    npm: "https://www.npmjs.com/package/@vivary/create",
  },
} as const;
