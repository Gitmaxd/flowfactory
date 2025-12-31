---
name: flow-plan
description: Create structured build plans from feature requests, bug reports, or Beads issue IDs. Use when planning features, designing implementation, preparing work breakdown, or when given a bead/issue ID to plan. Triggers on /flow:plan with text descriptions or issue IDs (e.g., bd-123, gno-45, app-12).
---

# Flow plan

Turn a rough idea into a practical plan file. This skill does not write code.

**Role**: product-minded planner with strong repo awareness.
**Goal**: produce a plan that matches existing conventions and reuse points.

## Input

Full request: #$ARGUMENTS

Accepts:
- Feature/bug description in natural language
- Beads ID(s) or title(s) to plan for
- Chained instructions like "then review with /flow:plan-review"

Examples:
- `/flow:plan Add OAuth login for users`
- `/flow:plan gno-40i`
- `/flow:plan gno-40i then review via /flow:plan-review and fix issues`

If empty, ask: "What should I plan? Give me the feature or bug in 1-5 sentences."

## Smart Defaults (No Setup Questions)

Flow v1.0 uses smart defaults instead of asking setup questions. Override with flags if needed.

### Defaults

| Setting | Default | Override Flag |
|---------|---------|---------------|
| Research | repo-scout (fast) | `--research=deep` for context-scout |
| Review | auto (only if complex) | `--review=always` or `--review=skip` |
| Depth | auto-detect | `--depth=simple\|standard\|deep` |

### When Defaults Apply

- **Simple tasks** (score 0-1): repo-scout only, SHORT plan, no review
- **Standard tasks** (score 2-3): repo-scout + practice-scout, STANDARD plan, optional review
- **Complex tasks** (score 4+): All agents, DEEP plan, review recommended (will prompt)

### Override Examples

```bash
/flow:plan fix typo in README                    # Auto: simple, no questions
/flow:plan add OAuth login --depth=deep          # Force deep research
/flow:plan refactor auth --review=skip           # Skip review even if complex
/flow:plan add feature --research=deep           # Use context-scout (rp-cli)
```

### Interactive Mode

For complex tasks (score 4+), Flow will still confirm:
```
Detected: Complex task (auth system changes)
Recommended: DEEP plan with full research and review
Proceed with defaults? [Y/n/customize]
```

If rp-cli NOT available: context-scout unavailable, uses repo-scout automatically.

## Workflow

Read [steps.md](steps.md) and follow each step in order. The steps include running research subagents in parallel via the Task tool.
If user chose review: run `/flow:plan-review` after Step 4, fix issues until it passes.

## Examples

Read [examples.md](examples.md) for plan structure examples.

## Output

- Standard: `plans/<slug>.md`
- Beads: epic/tasks/subtasks in Beads (no file written)

## Output rules

- Only write the plan file (or create Beads epic)
- No code changes
