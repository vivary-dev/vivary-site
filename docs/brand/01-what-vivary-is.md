# What Vivary is

Source of truth: the maintained product guide "Vivary, step by step"
(`docs/product/multi-project/specification/guide.html` in `vivary-dev/Vivary-New`,
fingerprint `bb3a22cd16d93955`, accepted by Jeff on 2026-09-14) and the
specification it embeds. Every line below comes from those documents or from
`src/content/facts.ts`. Nothing else is a source.

## In one line

> A workspace for working with agents on your own projects.

From the Vivary-New README. The README header carries the short form:

> Your projects. Your agents. Your machine.

## In a paragraph

Vivary brings agent chat, project files, tools, and memory into one desktop
app. It is one visual workspace over the projects and supported agent tools on
a computer you control. Select a project, then continue one of its
conversations or start another. Each conversation has its own history and its
own bounded model context. A person can write, research, plan, or code through
the same workspace. A project does not need Git, a Brain, a preset persona, or
a Vivary account. The desktop app opens on your computer without a login. A
phone or another browser can connect to the same instance, and that access is
explicit and authenticated. Your agents, credentials, files, history, and
memory stay on the host.

## The name

A vivary is an old word for a vivarium: a small, self-contained world where
living things are kept, arranged in stacked layers. Your project lives inside a
small, well-formed world, with a substrate to stand on, an atmosphere of rules
and review around it, and gates at the edges. The workspace commands inside
Vivary are named for layers of the sky: tropo, strato, ozone, exo. Always
lowercase.

## Six steps, in the guide's own words

The guide walks a new user through the product in six steps. Each has a plain
sentence and a reason.

1. **Choose your project.** Open the project you want to work on, then choose
   one of its conversations. The project can hold several independent chats
   alongside its files, even if the folder later moves. Why: you should not
   have to remember which window or agent owns your work, or force unrelated
   work through one context window.
2. **Return to the conversation.** Return to an existing conversation or start
   another inside the same project. Each chat has separate history and model
   context. Why: a long project needs more than one context window, and
   separate work should not blur into one transcript.
3. **Choose a harness and model.** New conversations select Claude Code or
   Codex. Codex reports its available subscription models. Why: you can see
   the harness's actual capabilities without configuring a second tool picker
   or a predefined persona.
4. **Approve or decline work.** Send starts immediately. Review native action
   requests when the selected permission mode requires a decision. Approval,
   denial, and Stop remain reachable. Why: background work must be visible and
   understandable.
5. **Open a file when you need it.** Read the formatted document beside the
   conversation. Choose Edit to change it, or expand it for focused work.
   Why: inspecting a file should not interrupt the conversation or lose a
   draft. Viewing a file does not send it to a model.
6. **Leave a useful continuation record.** Ask the agent to update the handoff
   when you need a written account of the work, evidence, and next step. Why:
   a future conversation should have a useful starting point.

## The sixteen parts

The guide describes the product as sixteen parts. These are the plain names it
gives them. They are responsibilities, not menus.

| Part | Plain name | What it does |
| --- | --- | --- |
| M01 | The workspace you see | Keeps the selected conversation central and lets you open or close supporting panels. |
| M02 | Which project is this? | Keeps projects distinct and checks which folder is available and authorized. |
| M03 | Your ongoing conversations | Lets each project hold several independent chats, return to earlier work, and follow links without rewriting history. |
| M04 | Your installed agent tools | Shows observed capabilities from supported installed harnesses. |
| M05 | What is allowed to happen? | Checks permissions and keeps approval, denial, and Stop attached to the correct work. |
| M06 | Your real files | Reads and edits project documents while preserving drafts and handling changed files. |
| M07 | Set up and operate a workspace | Creates and adopts workspaces with the bundled Vivary commands. A new workspace is five small files, previewed before anything is written. |
| M08 | Find and remember | Finds files, conversation content, and sourced facts within the right project. |
| M09 | Plans and tasks | Shows intended work and dependencies from the selected task source. |
| M10 | Do, check, and hand over work | Coordinates bounded work, reviews actual results, and prepares continuation records. |
| M11 | Version control and repository hosts | Connects Git or other workflows without requiring them for every project. |
| M12 | Research and learn from work | Produces sourced material and keeps suggested lessons separate from accepted changes. |
| M13 | Inputs and scheduled work | Later inbox and maintenance flows with explicit routing, limits, and authority. |
| M14 | The computer running Vivary | Coordinates the desktop, the private browser connection, and project preview. |
| M15 | Package and publish | Prepares verified releases and later public integrations through their approval gates. |
| M16 | Understand and verify | Makes actual evidence, limitations, and contributor instructions easy to find. |

## What the product promises

From `design.md`, `desktop-release.md`, and the accepted requirements, as
distilled in `src/content/facts.ts`:

- Every project in one place. Open a new folder or one you already have.
  Opening it changes nothing inside it until you say so.
- Files first. Plans, memory, decisions, and results live in plain files you
  can open with any editor and keep forever.
- Runs the agents you already use. Claude Code, Codex, and others through
  adapters. Your keys, your machine. Vivary never requires its own model API
  key and never resells tokens.
- No account. Local desktop opens without login. Remote browser access is
  explicit and authenticated.
- It knows you from your files. What Vivary learns about you and your
  projects is saved as files you can read, edit, and delete. A transcript is
  not automatically memory.
- Workspaces for more than code. Second brains, knowledge bases, research,
  writing, and software, composed from patterns you can rename or drop.
- Version control is your choice. None, Git, or Jujutsu. Hosting a repository
  is a separate, optional step.
- Bounded context, every time. The agent gets a capsule of the files that
  matter, and every run leaves a receipt of what it saw.
- Plan, run, review. Editable plans, tasks with dependencies, reviewed
  execution, and evidence you can open.

## Decisions Jeff has accepted

- 2026-09-06: Vivary drives whichever coding agent the user already pays for,
  through an adapter, with one role contract and one receipt shape.
- 2026-09-06: Developers are one audience among several. Vivary serves
  professionals doing coding, research, writing, second-brain work, and other
  tasks. Assume basic ability to install and message an agent. It is a tool
  for accomplishing real work, not an educational product. Use direct,
  respectful product language.
- 2026-09-12: The product is a local desktop app and a self-hosted web app.
  No cloud control plane.
- 2026-09-14: One project workspace. Each project holds multiple independent
  conversations. One selected conversation shows in the center. Panels for
  files, plans, and preview open when asked.
- 2026-09-14: Project details live in the header on a wide desktop. The
  handoff updates manually by default.
- 2026-09-14: The selected harness owns its tools, models, and permission
  semantics. Vivary shows observed availability and never adds a second
  general tool picker.
- 2026-09-14: Templates start as an offline baseline. A later optional
  community collection can point at source repositories. It is not a
  marketplace.

## Who it is for

Professionals doing coding, research, writing, and second-brain work. Assume
they can install software and message an agent, not that they program.
Existing Claude Code and Codex subscriptions are the intended first
connection. The desired action is one button to connect an existing coding
agent.

## Vocabulary

Owner: `docs/product/multi-project/CONTEXT.md`.

| Term | Meaning |
| --- | --- |
| Workspace | A bounded collection of files, instructions, knowledge, and operating context usable by an agent. |
| Project | A named unit of work with a stable identity and a selected folder. Code, research, writing, or a Brain. |
| Adoption | Adding Vivary's bounded contract to an existing project through a previewed, conflict-aware change. |
| Harness | The agent tool that owns its reasoning loop, such as Claude Code or Codex. A model is a choice within a harness. |
| Host | The computer or server you control that owns execution, files, and state. A browser is a client of it. |
| Session, run | One conversation in one project. One execution inside a session. |
| Memory | Reusable project facts and decisions in readable files, with sources and removal controls. |
| Receipt | The record of what a run saw, changed, and left alone. |
| Capsule | The bounded set of files handed to the agent for one task. |
| Gate | A stopping point where a human approves something before it happens. |
| Brain | An optional knowledge workspace of sourced knowledge and evidence. |
| Handoff | A reviewed continuation record: goal, state, decisions, evidence, next action. |
| Workbench | The graphical work environment. The package name of the GUI. |

Naming rules:

- The product is Vivary. The binary is `Vivary.exe`. The GUI package is
  Vivary Workbench. The shell package is Vivary desktop.
- The workspace commands inside the app are `vivary`, `create-vivary`,
  `tropo`, `strato`, `ozone`, and `exo`. They are also published as packages
  and usable from a terminal without the app. Do not present them as a
  separate product.
- Never attach one version number to the whole product. Packages version
  independently.
- Company line, used once so far: "A flagship from The Little AI Company."

## What is in the box

The desktop app bundles Node, Python, and the workspace commands. The same
commands are published so a terminal can use them without the app:

| Package | Registry | Latest, checked 2026-09-16 |
| --- | --- | --- |
| create-vivary | PyPI | 0.4.3 |
| @vivary/create | npm | 0.4.2 |
| vivary | PyPI | 0.2.0 |
| vivary-tropo | PyPI | 0.5.4 |
| vivary-strato | PyPI | 0.1.3 |
| vivary-ozone | PyPI | 0.3.2 |
| vivary-exo | PyPI | 0.3.1 |

The site pins its one install command to 0.4.2, the last version with a
recorded installation proof.

## Status, 2026-09-16

- Vivary is not ready for public release. An unsigned Windows x64 portable
  ZIP exists as a private development preview for repository members.
- Verified on the real Windows build: extraction and launch, managed project
  creation, file operations, native Codex approvals, session continuation,
  subagent display, Stop, recovery, and clean shutdown.
- Still open: clean-profile first run, upgrade and removal, adopting
  populated folders, file search, chat search, scoped memory, real Native
  provider turns, automations, phone access, integrated debugging, signing,
  installer, release approval, macOS.
- The current runtime permits one active root conversation run at a time.
  Concurrency is settled as a direction and not yet implemented.

## Positioning lines that exist

None is designated. Jeff picks.

| Line | Where | Note |
| --- | --- | --- |
| It knows you. Because you wrote it down. | Locked home page headline | Current |
| Your projects. Your agents. Your machine. | Vivary-New README header | Current, short |
| A workspace for working with agents on your own projects. | Vivary-New README | Current, plain |
| A desktop workspace where your agents work from files you own. | `facts.product.line` | Draft |
| Chat fades, files persist. Vivary is the part that decides which of those files your agent gets to see, and shows you what it saw. | `facts.firstScreen`, 2026-07-25 | Still true |

## What Vivary is not

Not a platform you adopt. Not tied to one editor, one AI tool, or one model.
Not an AI agent or a model itself. Not an educational product. Not a
marketplace. No cloud control plane, no telemetry from the workspace, no
account.

## Documentation to hand to anyone who asks what Vivary is

All in `vivary-dev/Vivary-New` on `dev`.

| Document | Path |
| --- | --- |
| The guide, one offline HTML file with the walkthrough, module map, actions, decisions, and all chapters | `docs/product/multi-project/specification/guide.html` |
| The walkthrough and decision source the guide renders | `docs/product/multi-project/specification/guide-content.json` |
| Specification overview | `docs/product/multi-project/specification/README.md` |
| The whole system, diagrams | `docs/product/multi-project/specification/system.md` |
| The sixteen parts and their contracts | `docs/product/multi-project/specification/modules.md` |
| Every user action | `docs/product/multi-project/specification/actions.md` |
| Harness integrations | `docs/product/multi-project/specification/harness-adapters.md` |
| Journeys, approvals, recovery | `docs/product/multi-project/specification/journeys.md` |
| Shared vocabulary | `docs/product/multi-project/CONTEXT.md` |
| The workspace interface contract | `docs/product/multi-project/unified-workspace.md` |
| Product direction and decisions | `docs/product/multi-project/design.md` |
| What exists and what is missing | `docs/product/multi-project/desktop-release.md` |
| Acceptance register | `docs/product/multi-project/desktop-acceptance-status.md` |
| The app's interior design rules | `packages/workbench/DESIGN.md` |
| README | `README.md` |
