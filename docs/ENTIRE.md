# Website session recording

Website source stays in `vivary-dev/vivary-site`. Future approved project
conversation checkpoints use the existing private
`vivary-dev/vivary-workbench-handoff` repository, organized in the
[website recording index](https://github.com/vivary-dev/vivary-workbench-handoff/blob/docs/project-recordings/projects/vivary-site.md).
Its old source snapshot and default branch stay intact.

The committed `.entire/settings.json` supplies the dedicated checkpoint destination
for Entire's web lookup. Local settings can override it, so check the effective
configuration before the next fresh supported agent session:

```sh
entire status --detailed
entire status --json
entire agent list
```

The destination must be `vivary-dev/vivary-workbench-handoff`, with capture enabled
and the `git-refs` backend. Keep automatic uploads held with `push_sessions:false`
until the shared historical queue has its separate review and authorization.
Linked worktrees share that queue. Do not bypass the hold with raw ref pushes.

Use `entire agent add codex` to install the seven Codex hooks. Read the discovered
hook path in status; a linked worktree may use the root checkout's file. Complete
`/hooks` review in the actual Codex client if status says `trust_review_needed`.
Installation alone does not prove trust or capture. Start the next real session
after setup and use `entire session current` to confirm it is tracked. Do not
restart another worker or import historical conversations to test setup.

At delivery, keep the source commit and verify its real checkpoint with
`entire checkpoint list --json` and `entire checkpoint explain <id> --json`.
Record PR, source commit, execution location, native agent/session, checkpoint ID,
trail URL, capture state and upload state in the private index. Local capture and
remote delivery are separate. Verify the web link after an authorized real future
checkpoint reaches the destination; no fresh website capture is claimed by this
configuration change.

The [Vivary contributor guide](https://github.com/vivary-dev/vivary/blob/dev/docs/ENTIRE.md)
owns the common setup and controller limitations. A controller editing Zo through
MCP is outside the local hooks. Entire 0.10.6 has no installed Cline integration in
this environment. Keep local settings and conversations out of source commits.
