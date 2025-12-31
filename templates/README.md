<div align="center">

# FlowFactory

[![Version](https://img.shields.io/badge/Version-1.0-green)](../../CHANGELOG.md)
[![Commands](https://img.shields.io/badge/Commands-7-green)](commands/)
[![Agents](https://img.shields.io/badge/Agents-6-yellow)](droids/)
[![Skills](https://img.shields.io/badge/Skills-6-blue)](skills/)

**Plan first, work second.**

*FlowFactory — A structured workflow system for AI agents.*

*Live at [FlowFactory.dev](https://flowfactory.dev)*

</div>

---

## When to Use What (Factory.ai)

| Scenario | Tool | Why |
|----------|------|-----|
| Quick fix, well-understood | Spec Mode (Shift+Tab) | Faster, built-in |
| Complex feature, unfamiliar codebase | `/flow:plan` | Deep research with parallel agents |
| Multi-phase project | `/flow:plan` + `/flow:work` | Task tracking + progress files |
| Code review | `/flow:impl-review` | Cross-model review catches blind spots |

**Spec Mode** is Factory.ai's built-in planning tool - great for straightforward tasks where you already understand the codebase.

**FlowFactory** adds value when you need:
- Parallel research agents gathering context before planning
- Gap analysis to find edge cases before coding
- Session continuity via progress files
- Cross-model review via RepoPrompt

---

## The Problem

Most agent failures aren't about model capability—they're about process:

- ✗ Starting to code before understanding the codebase
- ✗ Reinventing patterns that already exist in the repo
- ✗ Forgetting the original plan mid-implementation
- ✗ Missing edge cases that were obvious in hindsight

## How FlowFactory Fixes It

| Failure Mode | Solution |
|--------------|----------|
| Weak research | 3 agents gather context in parallel *before* any code is written |
| Ignoring existing code | Explicit pattern reuse—agents find what already exists |
| Drifting from plan | Plan re-read before every task in the execute loop |
| Missing edge cases | Gap analyst identifies missing flows before implementation |
| Shallow self-review | Cross-model review via [RepoPrompt](https://repoprompt.com) catches what same-model review misses |

FlowFactory doesn't make the AI smarter. It makes the workflow disciplined enough that capability translates to results.

---

## Setup

FlowFactory is pre-installed in this repository under `.factory/`. No additional setup required.

### Optional: RepoPrompt Integration

For cross-model review capabilities, install [RepoPrompt](https://repoprompt.com) and enable MCP Server.

---

## Quick Start

```bash
/flow:plan Add OAuth login for users
/flow:work plans/add-oauth-login.md
```

That's it. Two commands, one disciplined workflow.

### What Happens

**`/flow:plan`**:
1. Runs 3 research agents in parallel (patterns, best practices, docs)
2. Runs gap analyst to find edge cases and missing flows
3. Writes `plans/<slug>.md` with references and acceptance checks
4. Optionally runs Carmack-level review via different model

**`/flow:work`**:
1. Reads plan fully, clarifies blockers
2. Sets up branch or worktree
3. Executes task loop—re-reads plan before each task
4. Runs tests + lint
5. Ships with clear Definition of Done
6. Optionally runs Carmack-level implementation review

---

## Commands

| Command | Description |
|---------|-------------|
| `/flow:plan` | Research + produce `plans/<slug>.md` |
| `/flow:work` | Execute a plan end-to-end |
| `/flow:plan-review` | Carmack-level plan review via rp-cli |
| `/flow:impl-review` | Carmack-level impl review (current branch) |
| `/flow:resume` | Resume interrupted session from checkpoint |
| `/flow:check` | Quick validation (lint, types, tests) |
| `/flow:status` | Show current FlowFactory state and progress |

---

## Cross-Model Review

When [RepoPrompt](https://repoprompt.com) rp-cli is detected, both `/flow:plan` and `/flow:work` ask upfront:

> "Run Carmack-level review after completion?"

If yes, review runs automatically via RepoPrompt's chat with a **different model**. We recommend GPT-5.2 High for all review tasks.

**Why cross-model?** Same-model self-review has blind spots. A different model catches things Claude missed—architectural issues, edge cases, security gaps.

**Review criteria:**
- Simplicity & minimalism (YAGNI)
- DRY & code reuse
- Idiomatic patterns
- Architecture & data flow
- Edge cases & error handling
- Testability
- Performance
- Security
- Maintainability

**Output:** Issues with severity (Critical/Major/Minor/Nitpick), location, problem, suggestion, rationale. Overall: Ship ✓ / Needs Work ⚠ / Major Rethink ✗

---

## Usage Patterns

### Standalone

```bash
/flow:plan Add OAuth login for users
/flow:work plans/add-oauth-login.md
/flow:plan-review plans/add-oauth-login.md
/flow:impl-review
```

### With Beads

```bash
/flow:work bd-a3f8e9              # Work on Beads epic
/flow:plan-review bd-a3f8e9       # Review Beads epic
```

### Chaining

```bash
/flow:plan Add rate limiting to API, then implement it with /flow:work
```

### Natural Language

```
Help me plan out adding OAuth login for users
```
```
Implement the plan in plans/add-oauth-login.md
```
```
Review my current branch changes
```

Claude auto-triggers the matching skill based on intent.

---

## RepoPrompt Integration

When rp-cli is detected, `/flow:plan` asks which research approach to use:

| Aspect | repo-scout (fast) | context-scout (deep) |
|--------|-------------------|----------------------|
| Tools | Grep, Glob, Read | RepoPrompt rp-cli |
| Speed | ~45 seconds | Slower (builder takes time) |
| Tokens | ~65k | ~45k (30% less) |
| Best for | Bug fixes, simple changes | Complex features, architecture |

**Recommendation:** Use `context-scout` when architecture understanding matters. Use `repo-scout` for quick fixes.

### Direct Invocation

```bash
# Agent (isolated subprocess)
> Use context-scout to understand how authentication works

# Skill (current conversation)
> use rp to explore how auth works
```

---

## Workflow Detail

### `/flow:plan` — Research → Plan → Review

```
┌───────────────────────────────────────────────────────────────────────┐
│ > /flow:plan gno-40i                                                  │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ SETUP (if rp-cli detected)                                            │
├───────────────────────────────────────────────────────────────────────┤
│  Q1: Use RepoPrompt for deeper context?   ○ Yes (context-scout)       │
│      (slower, better for complex features) ○ No (repo-scout) [faster] │
│                                                                       │
│  Q2: Run Carmack-level review?            ○ Yes  ○ No                 │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Parallel Research                                            │
├───────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌───────────────┐  ┌─────────────┐          │
│  │ context-scout (rp)  │  │ practice-scout│  │ docs-scout  │          │
│  │ OR repo-scout       │  └───────┬───────┘  └──────┬──────┘          │
│  └──────────┬──────────┘          │                 │                 │
│             └─────────────────────┼─────────────────┘                 │
│                                   ▼                                   │
│              ┌────────────────────────────┐                           │
│              │ Patterns, practices, docs  │                           │
│              └────────────────────────────┘                           │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 2: Gap Analysis                                                 │
├───────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ flow-gap-analyst                                                │  │
│  │ → Edge cases, missing flows, requirements                       │  │
│  └─────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 3: Write Plan                                                   │
├───────────────────────────────────────────────────────────────────────┤
│  Beads ID input → update issue, create child tasks                    │
│  Text input     → plans/<slug>.md or new Beads epic                   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ gno-40i: Linear Scan Optimization                               │  │
│  │ ├── .1: hybrid.ts optimization                                  │  │
│  │ ├── .2: vsearch.ts optimization                                 │  │
│  │ ├── .3: rerank.ts optimization                                  │  │
│  │ ├── .4: search.ts optimization                                  │  │
│  │ └── .5: Run tests ──depends on──▶ [.1-.4]                       │  │
│  └─────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 4: Plan Review (if opted in)                                    │
├───────────────────────────────────────────────────────────────────────┤
│  rp-cli builder → context    rp-cli chat → Carmack review             │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ Simplicity · DRY · Idiomatic · Architecture · Edge cases        │  │
│  │ Testability · Performance · Security · Maintainability          │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  Output: Ship ✓ │ Needs Work ⚠ │ Major Rethink ✗                      │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
             ┌────────────┐                ┌────────────┐
             │  Ship ✓    │                │  Iterate   │
             │ Ready for  │                │  Fix and   │
             │ /flow:work │                │  re-review │
             └────────────┘                └─────┬──────┘
                                                 └──────▶ Back to Review
```

### `/flow:work` — Setup → Execute → Ship

```
┌───────────────────────────────────────────────────────────────────────┐
│ > /flow:work gno-40i                    (review: auto if rp-cli)      │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Confirm                                                      │
├───────────────────────────────────────────────────────────────────────┤
│  bd show gno-40i → read plan/issue                                    │
│  Read referenced files (hybrid.ts, vsearch.ts, rerank.ts, search.ts)  │
│  Ask blocking questions → get user go-ahead                           │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 2: Setup (MUST ASK)                                             │
├───────────────────────────────────────────────────────────────────────┤
│  "Work on current branch, new branch, or isolated worktree?"          │
│                                                                       │
│     ○ Current branch     ○ New branch     ○ Worktree                  │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 3-4: Execute Loop                                               │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  bd ready --parent gno-40i → pick next task                           │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  For each child task:                                           │  │
│  │                                                                 │  │
│  │  ┌─────────┐    ┌───────────┐    ┌──────┐    ┌───────────────┐  │  │
│  │  │bd update│ -> │ Implement │ -> │ Test │ -> │ git commit    │  │  │
│  │  │in_progress   │  + test   │    │ pass │    │ bd close task │  │  │
│  │  └─────────┘    └───────────┘    └──────┘    └───────────────┘  │  │
│  │                                                                 │  │
│  │  .1 ✓ → .2 ✓ → .3 ✓ → .4 ✓ → .5 (unblocked) ✓                   │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 5: Quality                                                      │
├───────────────────────────────────────────────────────────────────────┤
│  bun test → 521 pass    bun run lint → no issues                      │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 6: Ship                                                         │
├───────────────────────────────────────────────────────────────────────┤
│  bd close gno-40i → close epic                                        │
│  bd sync → commit beads changes                                       │
│  git push → push to remote                                            │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│ PHASE 7: Impl Review (if opted in)                                    │
├───────────────────────────────────────────────────────────────────────┤
│  rp-cli builder → context around changed files                        │
│  rp-cli chat → Carmack review of implementation                       │
│                                                                       │
│  Output: Ship ✓ │ Needs Work ⚠ (fix and re-review)                    │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Agents

| Agent | Purpose | Used By |
|-------|---------|---------|
| `repo-scout` | Find existing patterns, conventions, related code | `/flow:plan` |
| `practice-scout` | Gather best practices and pitfalls | `/flow:plan` |
| `docs-scout` | Fetch relevant framework/library docs | `/flow:plan` |
| `flow-gap-analyst` | Identify missing flows, edge cases, requirements | `/flow:plan` |
| `quality-auditor` | Review changes for correctness, security, tests | `/flow:work` |
| `context-scout` | Token-efficient codebase exploration via RepoPrompt | On-demand |

---

## Skills

| Skill | Purpose |
|-------|---------|
| `flow-plan` | Planning workflow logic |
| `flow-work` | Execution workflow logic |
| `flow-plan-review` | Plan review via rp-cli + chat |
| `flow-impl-review` | Impl review via rp-cli + chat |
| `worktree-kit` | Manage git worktrees for parallel work |
| `rp-explorer` | Token-efficient codebase exploration via rp-cli |

Skills use **progressive disclosure**: only name + description (~100 tokens) loaded at startup. Full logic loads on-demand when triggered.

**Two ways to trigger**:
1. **Explicit**: `/flow:plan add OAuth` or `/flow:work plans/oauth.md`
2. **Natural language**: "help me plan out adding OAuth" — Claude auto-triggers the matching skill

---

## Beads Integration

FlowFactory has optional [Beads](https://github.com/steveyegge/beads) (`bd`) integration for dependency-aware issue tracking.

**When Beads is detected** (`.beads/` exists or CLAUDE.md mentions it):

| Command | Beads Mode |
|---------|-----------|
| `/flow:plan` | Create epic/tasks instead of markdown |
| `/flow:work <beads-id>` | Track via `bd ready`/`bd close` instead of TodoWrite |
| `/flow:plan-review <beads-id>` | Review Beads epic directly |

**Fallback**: If `bd` unavailable, uses markdown plans + TodoWrite (no config needed).

---

## Plan Depths

- **SHORT**: Bugs, small changes — just problem, acceptance checks, key context
- **STANDARD**: Most features — overview, approach, risks, acceptance, test notes, refs
- **DEEP**: Large/critical — detailed phases, alternatives, rollout/rollback, metrics

---

## Definition of Done

- All plan steps completed or explicitly deferred
- All tasks done (Beads children closed or TodoWrite complete)
- Tests pass
- Lint/format pass
- Docs updated if needed

---

## Who It's For

Developers who want AI agents to ship reliably, not just generate code. If you've ever had an agent "finish" a task only to realize it forgot half the requirements—this is for you.

---

## Factory.ai Compatibility

FlowFactory v1.0 is fully compatible with Factory.ai's Droid platform.

### Valid Model Names

| Model | Identifier |
|-------|------------|
| Inherit from session | `inherit` (recommended) |
| Claude Opus 4.5 | `claude-opus-4-5-20251101` |
| Claude Sonnet 4.5 | `claude-sonnet-4-5-20250929` |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` |

### Valid Tool Categories

| Category | Tools Included |
|----------|---------------|
| `read-only` | Read, LS, Grep, Glob |
| `edit` | Create, Edit, ApplyPatch |
| `execute` | Execute |
| `web` | WebSearch, FetchUrl |

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Invalid model: opus" | Old droid config | Update to `model: inherit` |
| Droid fails to start | Invalid tool name | Use `Execute` not `Bash`, `FetchUrl` not `WebFetch` |
| rp-cli not found | RepoPrompt not installed | Install from repoprompt.com or use repo-scout |
| Progress file not found | No active session | Start with `/flow:work` first |
| "Multiple windows" error | rp-cli needs window ID | Run `rp-cli -e 'windows'` then use `-w <id>` |
| Review loop never ends | Iteration cap not reached | v1.0 caps at 3 iterations, then prompts user |

### Leveraging System Reminders

Factory.ai Droid receives `<system-reminder>` blocks containing:
- Currently open files in IDE
- Recent git status output
- Diagnostic errors from IDE

Check these before running redundant queries—the context may already be available.

### Error Recovery

| Situation | Action |
|-----------|--------|
| Tool call failed | Check system reminder for diagnostics, retry |
| Session interrupted | Run `/flow:resume`, check `flow-progress.txt` |
| Test failures | Fix one at a time, re-run specific test first |
| Context lost | Re-read plan file, restore from progress file |

### Migration from v0.6.5

See [docs/migration-v1.md](docs/migration-v1.md) for upgrade instructions.

---

## Conventions

- Plan files live in `plans/`
- Prefer reuse of centralized code
- Tests and linting are part of the plan

---

## Factory.ai Best Practices

### Parallel Execution

Make independent tool calls in a single response for better performance:

```typescript
// Good: Parallel git commands
<function_calls>
<invoke name="Execute">git status</invoke>
<invoke name="Execute">git log --oneline -5</invoke>
<invoke name="Grep">pattern to search</invoke>
</function_calls>
```

**Common parallel opportunities:**

| Phase | Parallelize These |
|-------|-------------------|
| Research | repo-scout, practice-scout, docs-scout (all 3 at once) |
| Git status | `git status`, `git log`, `git diff --stat` |
| Verification | lint check, type check, grep for TODOs |
| Context | Multiple `Read` calls for related files |

**Performance tip:** Call `TodoWrite` in parallel with your first exploration tool to save time.

### TodoWrite Integration

Use `TodoWrite` for task visibility:
- Create task list after reading plan
- Mark tasks `in_progress` → `completed`
- Keep only ONE task `in_progress` at a time

### Timeout for Long Commands

Use `timeout` parameter for rp-cli and other long-running commands:
```typescript
<invoke name="Execute">
<parameter name="command">rp-cli -e 'builder "..."'</parameter>
<parameter name="timeout">300</parameter>
</invoke>
```

---

<div align="center">

*FlowFactory — Originally created by [Gordon Mickel](https://mickel.tech). Adapted for Factory.ai.*

*Live at [FlowFactory.dev](https://flowfactory.dev)*

</div>
