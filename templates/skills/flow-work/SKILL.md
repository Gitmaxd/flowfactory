---
name: flow-work
description: Execute a plan file or Beads epic systematically with git setup, task tracking, quality checks, and commit workflow. Use when implementing a plan, working through a spec, following documented steps, or executing a Beads issue ID (e.g., bd-123, gno-45, app-12).
---

# Flow work

Execute a plan systematically. Focus on finishing.

**Role**: execution lead, plan fidelity first.
**Goal**: complete every plan step in order with tests.

## Input

Full request: #$ARGUMENTS

Accepts:
- Plan file: `plans/<slug>.md`
- Beads ID(s) or title(s) directly
- Chained instructions like "then review with /flow:impl-review"

Examples:
- `/flow:work plans/oauth.md`
- `/flow:work gno-40i`
- `/flow:work gno-40i then review via /flow:impl-review and fix issues`

If no plan/ID provided, ask for it.

## FIRST: Setup Questions (REQUIRED)

**Before doing anything else**, output these questions as text:

Check if rp-cli available: `which rp-cli >/dev/null 2>&1`

If rp-cli available, ask both:
```
Quick setup before starting:

1. **Branch** — Where to work?
   a) Current branch
   b) New branch
   c) Isolated worktree

2. **Review** — Run Carmack-level review after?
   a) Yes  b) No

(Reply: "1a 2b", "current branch, skip review", or just tell me naturally)
```

If rp-cli NOT available, ask only branch:
```
Quick setup: Where to work?
a) Current branch  b) New branch  c) Isolated worktree

(Reply: "a", "current", or just tell me)
```

Wait for response. Parse naturally — user may reply terse or ramble via voice.
**Do NOT read files or write code until user responds.**

## Workflow

After setup questions answered:
1. **Create `flow-progress.txt`** at repo root to track session state (enables `/flow:resume`)
2. **Create TodoWrite list** from plan tasks (use Factory.ai's TodoWrite tool for visibility)
3. Read [phases.md](phases.md) and execute each phase in order
4. **Update `flow-progress.txt`** and TodoWrite after each task completion
5. If user chose review: run `/flow:impl-review` after Phase 6, fix issues until it passes

## Factory.ai Integration

- Use `TodoWrite` tool to track tasks visibly in the UI
- Parallelize independent tool calls when possible (e.g., multiple git commands)
- Use `Task` tool with `subagent_type` for research agents

## Guardrails

- Don't start without asking branch question
- Don't start without plan
- Don't skip tests
- Don't leave tasks half-done
