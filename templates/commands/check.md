---
name: flow:check
description: Run validation (lint, typecheck, tests) without full workflow
argument-hint: "[--lint] [--types] [--tests] [--all]"
---

# Flow check

Quick validation without planning or research.

Options: #$ARGUMENTS

## Behavior

1. **Read AGENTS.md** (or CLAUDE.md) for project-specific commands
2. **Parse flags** from arguments:
   - `--lint`: Run lint command only
   - `--types`: Run typecheck command only
   - `--tests`: Run test command only
   - `--all` (default if no flags): Run all checks
3. **Execute checks** in order: lint → types → tests
4. **Report summary**: Pass/fail for each check

## Default Commands (if not in AGENTS.md)

| Check | Default Command |
|-------|-----------------|
| Lint | `pnpm lint` or `npm run lint` |
| Types | `npx tsc --noEmit` |
| Tests | `pnpm test` or `npm test` |

## Output Format

```
## Flow Check Results

✓ Lint: passed
✓ Types: passed
✗ Tests: 2 failed

Overall: FAIL (1/3 checks failed)
```

## Usage Examples

```bash
/flow:check                  # Run all checks
/flow:check --lint           # Lint only
/flow:check --types --tests  # Types and tests, skip lint
```
