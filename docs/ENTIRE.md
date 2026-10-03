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
and the `git-refs` backend. Shared settings default to an upload hold. Check the
Git family's queue before enabling routine delivery: linked worktrees share it.
If it contains historical checkpoints without upload approval, keep
`push_sessions:false` until that backlog is separately reviewed.

For an approved project queue with no unapproved backlog, set the documented
`strategy_options.push_sessions` value to `true` in ignored
`.entire/settings.local.json`. Preserve the other local settings. Entire 0.10.6's
`--skip-push-sessions=false` flag does not clear an existing hold. The normal
pre-push hook then delivers checkpoints to the dedicated private destination.
Verify the queue clears and the checkpoint is retrievable after the source push.
The website's approved fresh review passed this check on October 3; the app's
separate historical queue remains held.

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
checkpoint reaches the destination. The private index distinguishes the verified
fresh website review and storage receipt from an unverified website web trail.

The [Vivary contributor guide](https://github.com/vivary-dev/vivary/blob/dev/docs/ENTIRE.md)
owns the common setup and controller limitations. A controller editing Zo through
MCP is outside the local hooks. Entire 0.10.6 has no installed Cline integration in
this environment. Keep local settings and conversations out of source commits.
