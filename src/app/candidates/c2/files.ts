export type Entry = {
  kind: "file" | "folder";
  path: string;
  name: string;
  depth: number;
  body: string;
};

export const projectName = "field-notes";

export const entries: Entry[] = [
  {
    kind: "file",
    path: "AGENTS.md",
    name: "AGENTS.md",
    depth: 0,
    body: `# AGENTS.md

This project is open in Vivary, a desktop workspace where agents
work from files you own.

## What is here

AGENTS.md               how agents behave in this project
STATE.md                what is true right now
memory/MEMORY.md        what Vivary has learned, kept as a file
inbox/                  things that arrived and are not sorted
.vivary/context.md      what an agent gets to see, and the receipt
.vivary/workspace.toml  the settings, all of them

## How agents behave here

- Read STATE.md before doing anything.
- Work from these files. Plans, memory, decisions, and results
  live in plain files, not in a chat.
- You get a capsule of the files that matter, not the whole
  project. Every run leaves a receipt of what you saw.
- Plans are editable and tasks have dependencies. Execution is
  reviewed and leaves evidence a person can open.
- You run as a local CLI model with the owner's own keys, on
  this computer. There is no account and no server.
`,
  },
  {
    kind: "file",
    path: "STATE.md",
    name: "STATE.md",
    depth: 0,
    body: `# STATE.md

One file that says what is true right now. Kept by hand.

## Today

Opened in Vivary. Opening it changed nothing in this folder.
Patterns in use: writing and research. Both can be renamed or
dropped.

## Working on

- The first plan. Tasks have dependencies, runs are reviewed,
  and each run leaves evidence you can open.
- Reading what arrived in inbox/.

## Choices made

Version control: none yet. Git or Jujutsu can come later.
Hosting: not set up. It is a separate, optional step.
Agents: local CLI models with my own keys, on this computer.
`,
  },
  {
    kind: "folder",
    path: "memory",
    name: "memory/",
    depth: 0,
    body: `memory/

One file. MEMORY.md is what Vivary has learned about you and this
project, saved as a file you can read, edit, and delete.
`,
  },
  {
    kind: "file",
    path: "memory/MEMORY.md",
    name: "MEMORY.md",
    depth: 1,
    body: `# MEMORY.md

What Vivary has learned about you and this project. Plain
Markdown. Read it, edit it, delete what is wrong.

## About you

- Prefers short plain sentences.
- Wants a summary before a change, not after.
- Keeps decisions in STATE.md, not in chat.
- Reads sources in inbox/ before they are filed.

## About this project

- A writing project with a research folder.
- Sources arrive in inbox/ and stay there until read.
- Not under version control yet, by choice.
- The first plan is still being edited.
`,
  },
  {
    kind: "folder",
    path: "inbox",
    name: "inbox/",
    depth: 0,
    body: `inbox/

Empty. Things that arrive go here until they are sorted.
`,
  },
  {
    kind: "folder",
    path: ".vivary",
    name: ".vivary/",
    depth: 0,
    body: `.vivary/

Two files. context.md says what an agent gets to see and where
the receipt goes. workspace.toml holds the settings.
`,
  },
  {
    kind: "file",
    path: ".vivary/context.md",
    name: "context.md",
    depth: 1,
    body: `# context.md

What an agent gets to see in this project.

## Capsule

The agent gets a capsule of the files that matter, not the
whole project. Bounded, every time.

## Receipt

Every run leaves a receipt of what the agent saw. Open it after
a run to check what the agent worked from.

Last receipt: none yet. Project just opened.
`,
  },
  {
    kind: "file",
    path: ".vivary/workspace.toml",
    name: "workspace.toml",
    depth: 1,
    body: `# workspace.toml
# Written by Vivary. Small on purpose.

[project]
name = "${projectName}"
patterns = ["writing", "research"]

[agents]
models = "local"
keys = "yours"

[memory]
dir = "memory"

[version_control]
kind = "none"

[hosting]
enabled = false
`,
  },
  {
    kind: "file",
    path: ".gitignore",
    name: ".gitignore",
    depth: 0,
    body: `# Version control is your choice. This file waits for the day
# you pick Git or Jujutsu.
.vivary/receipts/
`,
  },
];
