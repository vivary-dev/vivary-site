// The only source of product claims for every page. The `product` block
// describes the new Vivary desktop app from the program design documents.
// The `shipped` and `engine` blocks describe the library that ships today.
// Verified 2026-09-13 against vivary-dev/Vivary-New. Do not add a claim
// here without a source line.

export const facts = {
  name: "Vivary",

  // Settled by Jeff on 2026-07-25 (issue 215) as the first-screen sentence.
  firstScreen:
    "Chat fades, files persist. Vivary is the part that decides which of those files your agent gets to see, and shows you what it saw.",

  // The new product line, from the 2026-09-05 direction in design.md. Draft wording.
  productLine: "Local desktop workspaces where agents work from files you own.",

  // What a stranger can install today. README release table, verified 2026-08-15.
  shipped: {
    install: "uvx create-vivary init my-workspace --preset coding --no-wizard",
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
    "No account, no cloud control plane, no telemetry from the workspace. Files stay on your machine.",
  ],

  // The four layers, as the product describes them.
  layers: [
    { name: "tropo", role: "A typed knowledge graph of what the workspace knows and what depends on what." },
    { name: "strato", role: "One visible state surface, private boundaries, and a loop that only grows when work earns it." },
    { name: "ozone", role: "Graph-aware review and human gates for changes that are durable, destructive, or public." },
    { name: "exo", role: "Claims, conflicts, and role contracts for the moment one agent becomes many." },
  ],

  // In development. Never describe as installable.
  inDevelopment: {
    label: "In development",
    summary:
      "A desktop app that holds every project in one place, remembers you from your files, and runs the agents you already use. Not released.",
  },

  // The new Vivary: the desktop application. This site markets the app.
  // Each line cites the program document that owns the decision, read
  // 2026-09-13 in docs/product/multi-project of vivary-dev/Vivary-New.
  // The engine below is what runs underneath and what ships today.
  product: {
    name: "Vivary",
    // Jeff's phrase for the site, 2026-09-13.
    meet: "Meet the new Vivary.",
    // Draft product line for the app. Jeff picks the final wording.
    line: "A desktop workspace where your agents work from files you own.",
    // design.md, product direction and the 2026-09-12 local desktop delivery decision.
    what:
      "One window for every project. Your files, your machine, and the agents and models you already use. No Vivary account, no cloud control plane.",
    promises: [
      // design.md: new and existing projects, registration inspects read-only first.
      "Every project in one place. Open a new folder or one you already have. Opening it changes nothing inside it until you say so.",
      // design.md: files remain authoritative; release.md: find its real files.
      "Files first. Plans, memory, decisions, and results live in plain files you can open with any editor and keep forever.",
      // 2026-09-12 decision and the repo AGENTS.md self-hosted rule.
      "Runs the agents you already use. Local CLI models, your own keys, on your computer. No account to create and no server to trust.",
      // 2026-09-13 Vivary-New decision: useful setup and memory slices; the memory research folded into the plan.
      "It knows you from your files. What Vivary learns about you and your projects is saved as files you can read, edit, and delete.",
      // 2026-09-13 workspace setup direction: composable patterns for second brains, knowledge bases, research, writing, and code.
      "Workspaces for more than code. Second brains, knowledge bases, research, writing, and software, composed from patterns you can rename or drop.",
      // design.md: version control optional; hosting separate.
      "Version control is your choice. None, Git, or Jujutsu. Hosting a repository is a separate, optional step.",
      // The engine's verified behavior: bounded capsule and receipt.
      "Bounded context, every time. The agent gets a capsule of the files that matter, and every run leaves a receipt of what it saw.",
      // release.md guide inventory: plan and execute work with review and evidence.
      "Plan, run, review. Editable plans, tasks with dependencies, reviewed execution, and evidence you can open.",
    ],
    // design.md: the full little-agent scope survives. Named plainly, not as a secret.
    alsoInTheProgram: [
      "Workspace templates installed inside a project",
      "An optional Brain that learns from verified work",
      "Portable handoffs between sessions and agents",
      "Bounded automation: factory runs, email intake, heartbeat maintenance, with stop and recovery",
      "Agent integration with structured operations and discovery",
    ],
    // What is real about the app today, stated once and plainly.
    status:
      "Vivary desktop is being built in the open in the Vivary-New repository. This site goes live with the app. The engine it runs on ships today.",
  },

  // The engine underneath the app: the Vivary library, shipped today as CLI packages.
  engine: {
    line: "The same engine, standalone, ships today.",
    summary:
      "Vivary desktop runs on the Vivary library: a typed knowledge graph, one visible state surface, review with human gates, and coordination for many agents. You can use it from the command line right now.",
  },

  links: {
    github: "https://github.com/vivary-dev/vivary",
    docs: "https://vivary.vercel.app/",
    pypi: "https://pypi.org/project/create-vivary/",
    npm: "https://www.npmjs.com/package/@vivary/create",
  },
} as const;
