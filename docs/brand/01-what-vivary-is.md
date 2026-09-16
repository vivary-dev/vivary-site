# What Vivary is

## Two products share one name

Everything confusing about Vivary comes from this. There are two products
called Vivary and they have different definitions, different visual identities,
and different websites.

**The original Vivary** is a set of Python command line tools and a five-file
workspace contract. It is public, MIT licensed, published on PyPI and npm, and
marketed today at vivary.vercel.app. Its own docs define it as "a lightweight,
local-first governed-context layer for agent work" (`docs/ARCHITECTURE.md` in
`vivary-dev/vivary`). It is being retired as the product but kept as the engine.

**The new Vivary** is a desktop application and a self-hosted web app. It is
private, in development in `vivary-dev/Vivary-New`, and has no public page yet.
Its README defines it in one line:

> A workspace for working with agents on your own projects.

and expands it as:

> Vivary brings agent chat, project files, tools, and memory into one desktop
> app. The product target is a Windows desktop app and a responsive web client
> connected to the same Vivary instance. That instance can run on your computer
> or a suitable server. Your agents, credentials, files, and history stay on the
> host.

Jeff decided on 2026-09-13 that this site markets the new Vivary and presents
the original tools as the engine underneath. Every page states the app's status
once and never shows a download.

## The name

From `docs/CONCEPTS.md` in both repos:

> A vivary is an old word for a vivarium: a small, self-contained world where
> living things are kept, arranged in stacked layers. Your project lives inside
> a small, well-formed world, with a substrate to stand on, an atmosphere of
> rules and review around it, and gates at the edges.

The four engine tools are named for layers of the sky: tropo, strato, ozone,
exo. Always lowercase.

## What the new product promises

From `docs/product/multi-project/design.md` and `desktop-release.md` in
Vivary-New, already distilled into `src/content/facts.ts`:

- Every project in one place. Open a new folder or one you already have.
  Opening it changes nothing inside it until you say so.
- Files first. Plans, memory, decisions, and results are plain files.
- Runs the agents you already use. Claude Code, Codex, and others through
  adapters. Your keys, your machine. "The loop never requires its own model API
  key and never resells tokens" (design.md, decision four, 2026-09-06).
- No Vivary account. Local desktop opens without login. Remote browser access
  is explicit and authenticated.
- It knows you from your files. What it learns is saved as files you can read,
  edit, and delete. "A transcript is not automatically active memory."
- Workspaces for more than code: second brains, knowledge bases, research,
  writing, and software.
- Version control is your choice. None, Git, or Jujutsu.
- Bounded context and a receipt for every run.

## Who it is for

Decided 2026-09-06 (design.md, "Approachable workspace decision"):

> Developers are only one audience. Vivary serves professionals doing coding,
> research, writing, second-brain work, and other tasks. Assume basic ability
> to install and message an agent, not professional programming expertise.
> Use direct, respectful product language.

> Vivary is a tool for accomplishing real work, not an educational product.

> Existing Claude Code and Codex subscriptions are an intended connection
> journey. The desired action is one button to connect an existing coding agent.

## Vocabulary the brand must use consistently

Owner: `docs/product/multi-project/CONTEXT.md` in Vivary-New.

| Term | Meaning |
| --- | --- |
| Workspace | A bounded collection of files, instructions, knowledge, and operating context usable by an agent. |
| Project | A named unit of work with a stable identity and a selected folder. Code, research, writing, or a Brain. Version control optional. |
| Adoption | Adding Vivary's bounded contract to an existing project through a previewed, conflict-aware change. |
| Harness | The agent tool that owns its reasoning loop, such as Claude Code or Codex. A model is a choice within a harness. |
| Host | The user-controlled computer or server that owns execution, files, and state. A browser is a client of that host. |
| Session, run | One conversation in one project. One execution inside a session. |
| Memory | Reusable project facts and decisions in readable files, with sources and removal controls. |
| Receipt | The record of what a run saw, changed, and left alone. |
| Capsule | The bounded set of files handed to the agent for one task. |
| Gate | A stopping point where a human approves something before it happens. |
| Brain | An optional knowledge workspace of sourced knowledge and evidence. |
| Handoff | A reviewed continuation record: goal, state, decisions, evidence, next action. |
| Workbench | The GUI itself. "Vivary's primary graphical work environment." |

Naming rules:

- The product is Vivary. The GUI package is Vivary Workbench. The shell is
  Vivary desktop. The binary is `Vivary.exe`.
- The published tools are "the original Vivary CLI" or "the engine."
- Never say "Vivary 0.4.2." Packages version independently. "Vivary Governed
  Context" is a release train label, not a version.
- Company line, used once so far: "A flagship from The Little AI Company."

## What ships today, verified 2026-09-16

| Package | Registry | Latest | Published |
| --- | --- | --- | --- |
| create-vivary | PyPI | 0.4.3 | 2026-09-03 |
| @vivary/create | npm | 0.4.2 | 2026-08-16 |
| vivary (meta) | PyPI | 0.2.0 | 2026-09-03 |
| vivary-tropo | PyPI | 0.5.4 | 2026-09-03 |
| vivary-strato | PyPI | 0.1.3 | 2026-09-03 |
| vivary-ozone | PyPI | 0.3.2 | 2026-09-03 |
| vivary-exo | PyPI | 0.3.1 | 2026-09-03 |

`facts.ts` pins the install command to 0.4.2, the last version with a recorded
installation proof (2026-08-15). The 2026-09-03 releases exist on the registry
but no verification is recorded for them. Keep the pin until one is.

## Status of the app, as of 2026-09-16

From `desktop-acceptance-status.md` on `dev` and the GitHub release
`desktop-preview-2026-09-16`:

- "Vivary is not ready for public release." An unsigned Windows x64 portable
  ZIP exists as a private development preview. Repository access is required.
- Native Codex approvals, session continuation, subagent cards, file
  operations, Stop, and clean shutdown were verified on the real EXE.
- Still open: clean-profile first run, upgrade and removal, adopting populated
  folders, file search, chat search, scoped memory, real Native provider turns,
  automations, phone access, signing, installer, release approval, macOS.
- Open issues labeled `desktop-release` in Vivary-New are the ship gate.

## Positioning lines that exist today

None is designated. Jeff picks the final wording.

| Line | Where | Verdict |
| --- | --- | --- |
| It knows you. Because you wrote it down. | This site, locked home page | Current headline |
| A desktop workspace where your agents work from files you own. | `facts.product.line` | Draft product line |
| Your projects. Your agents. Your machine. | Vivary-New README header | Current, short, usable as a tagline |
| A workspace for working with agents on your own projects. | Vivary-New README | Current, plain |
| Chat fades, files persist. Vivary is the part that decides which of those files your agent gets to see, and shows you what it saw. | `facts.firstScreen`, settled 2026-07-25 | Engine-era, still true |
| Give agents governed context without the file pack. | Live site H1 | Engine-era, retire with the site |
| Typed memory and gates for agent workspaces. | Org profile hero | Stale, retire |
| A working memory your agents can inspect. | Old screenshots in docs/proof | Retired |
| Install a standard agent workspace into any project. | Archived June landing page | Retired |

## What Vivary is not

From `docs/CONCEPTS.md` and the live FAQ: not a platform you adopt, not tied to
one editor, not tied to one AI tool or model, not heavy, not an AI agent or
model itself. Not an educational product. No cloud control plane, no telemetry
from the workspace, no account.
