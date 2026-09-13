import { facts } from "@/content/facts";

export type Entry = {
  kind: "file" | "folder";
  path: string;
  name: string;
  depth: number;
  body: string;
};

const packageLines = facts.shipped.packages
  .map((p) => `${p.name.padEnd(16)} ${p.version.padEnd(7)} ${p.registry}`)
  .join("\n");

export const entries: Entry[] = [
  {
    kind: "file",
    path: "AGENTS.md",
    name: "AGENTS.md",
    depth: 0,
    body: `# AGENTS.md

This workspace was made with create-vivary. Vivary is the part
that decides which of these files the agent gets to see, and
shows you what it saw.

## What is here

AGENTS.md               how the agent behaves in this workspace
STATE.md                what is true right now
.vivary/context.md      how the agent gets its context
.vivary/workspace.toml  the settings, all of them
inbox/                  things that arrived and are not sorted
projects/               the work

## How the agent behaves

- Read STATE.md before doing anything.
- Work from the files in this folder. Chat fades. Files persist.
- You get a bounded capsule of context, not the whole disk.
- Leave a receipt of what you saw.
- Changes that are durable, destructive, or public wait for a
  human gate.
- Nothing leaves this folder. No account, no cloud control
  plane, no telemetry.
`,
  },
  {
    kind: "file",
    path: "STATE.md",
    name: "STATE.md",
    depth: 0,
    body: `# STATE.md

One visible state surface. Kept by hand, read by everyone.

## Today

Fresh workspace. Five small files. Nothing else is written
until real work needs it.

## Installed (verified ${facts.shipped.verifiedOn})

${packageLines}

## Not here yet

${facts.inDevelopment.summary}

## Next

- Move the first project into projects/.
- Run doctor. It checks the contract and the privacy boundary
  without touching your files.
`,
  },
  {
    kind: "folder",
    path: ".vivary",
    name: ".vivary/",
    depth: 0,
    body: `.vivary/

Two files. context.md describes the capsule and the receipt.
workspace.toml holds the settings.
`,
  },
  {
    kind: "file",
    path: ".vivary/context.md",
    name: "context.md",
    depth: 1,
    body: `# context.md

How this workspace hands context to an agent.

## Capsule

The agent gets a bounded capsule of context. Not the whole
disk, not the chat history. This file describes the boundary
so you can read it before the agent does.

## Receipt

A receipt records what the agent saw. Read it after a run to
check what the agent worked from.

## Boundary

No account. No cloud control plane. No telemetry from this
workspace. Files stay on this machine.

Last receipt: none yet. Fresh workspace.
`,
  },
  {
    kind: "file",
    path: ".vivary/workspace.toml",
    name: "workspace.toml",
    depth: 1,
    body: `# workspace.toml
# Written by create-vivary ${facts.shipped.packages[0].version}. Small on purpose.

[workspace]
name = "my-workspace"
preset = "coding"

[context]
capsule = "bounded"
receipt = true

[privacy]
account = false
cloud_control_plane = false
telemetry = false
`,
  },
  {
    kind: "folder",
    path: "inbox",
    name: "inbox/",
    depth: 0,
    body: `inbox/

Empty. Things that arrive and are not sorted yet go here.
Nothing is written until real work needs it.
`,
  },
  {
    kind: "folder",
    path: "projects",
    name: "projects/",
    depth: 0,
    body: `projects/

Empty. The work goes here, one folder per project.
Nothing is written until real work needs it.
`,
  },
  {
    kind: "file",
    path: ".gitignore",
    name: ".gitignore",
    depth: 0,
    body: `# create-vivary ${facts.shipped.packages[0].version}
# Receipts are for you, not for the repo.
.vivary/receipts/
`,
  },
];
