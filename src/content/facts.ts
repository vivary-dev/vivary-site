// The only source of product claims for every page. Verified 2026-09-13
// against the product repo (vivary-dev/Vivary-New README release table,
// docs/product/multi-project/design.md) and issue 215. Do not add a claim
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

  links: {
    github: "https://github.com/vivary-dev/vivary",
    docs: "https://vivary.vercel.app/",
    pypi: "https://pypi.org/project/create-vivary/",
    npm: "https://www.npmjs.com/package/@vivary/create",
  },
} as const;
