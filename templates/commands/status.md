---
name: flow:status
description: Show current Flow state and progress
argument-hint: ""
---

# Flow status

Display current Flow workflow state.

## What It Shows

1. **Active Plan** (if any)
   - Check for `flow-progress.txt` → extract plan path/ID
   - Check `plans/` directory for recent plans

2. **Progress** (from flow-progress.txt)
   - Completed tasks count
   - In-progress task
   - Remaining tasks count

3. **Git State**
   - Current branch
   - Last commit (hash + message)
   - Uncommitted changes (if any)

4. **Validation Status**
   - Last known test result (if recorded)
   - Or "unknown" if not tracked

5. **Blockers** (from flow-progress.txt)
   - Any recorded blockers

## Output Format

```
## Flow Status

### Plan
- Active: plans/add-oauth-login.md (STANDARD)
- Progress: 3/7 tasks complete

### Current Task
- Implement OAuth callback handler (in progress)

### Git
- Branch: feature/oauth
- Last commit: abc123 "feat: add auth middleware"
- Uncommitted: 2 files modified

### Validation
- Tests: passing (last run: 10 min ago)
- Lint: passing

### Blockers
- None recorded
```

## When No Session Active

```
## Flow Status

No active Flow session detected.

Start a new session:
- `/flow:plan <feature>` — Create a plan
- `/flow:work <plan>` — Execute a plan
```
