# Flow Resume Workflow

## Step 1: Find Progress File

1. If path provided in arguments, use that
2. Otherwise, look for `flow-progress.txt` in repo root
3. If not found, check common locations:
   - `./flow-progress.txt`
   - `./.factory/flow-progress.txt`
4. If still not found: "No progress file found. Start fresh with `/flow:work`?"

## Step 2: Parse Progress State

Extract from progress file:
- **Plan**: The plan file path or Beads ID
- **Completed**: List of finished tasks with commit hashes
- **In Progress**: Current task (may be partially done)
- **Next Steps**: Remaining tasks
- **Blockers**: Any issues that stopped work
- **Git State**: Branch and last commit

## Step 3: Verify Git State

```bash
git branch --show-current
git log -1 --oneline
git status --porcelain
```

Compare with progress file's Git State:
- If branch matches and no conflicts: good to continue
- If branch differs: "Progress file shows branch `{branch}`, but you're on `{current}`. Switch branches?"
- If uncommitted changes exist: "You have uncommitted changes. Stash, commit, or discard before resuming?"

## Step 4: Display Summary & Confirm

Output summary:
```
## Resume Session

**Plan**: {plan path or Beads ID}
**Branch**: {branch}
**Last commit**: {hash} "{message}"

### Progress
- Completed: {N} tasks
- In Progress: {current task}
- Remaining: {M} tasks

### Blockers
{blockers or "None"}

Continue from "{current task}"? [Y/n]
```

Wait for user confirmation.

## Step 5: Restore Context

1. **Re-read the plan**: Load full plan file or `bd show <id>` for Beads
2. **Review completed work**: Scan git log for commits since session start
3. **Check current state**: Run quick validation (lint/types if fast)
4. **Update progress file**: Mark session resumed with new timestamp

## Step 6: Continue Work

Hand off to `/flow:work` execution loop:
1. Start from "In Progress" task (or next if it was completed)
2. Follow Phase 4 (Execute loop) from flow-work/phases.md
3. Continue updating `flow-progress.txt` after each task

## Handling Edge Cases

### Progress file is stale
If last session timestamp > 24 hours ago:
- Warn: "Last session was {time} ago. Repository may have changed."
- Suggest: "Run `/flow:check` to verify state before resuming"

### Plan file changed
If plan file's modification time > progress file's session time:
- Warn: "Plan file was modified after last session"
- Ask: "Re-read plan and adjust remaining tasks? [Y/n]"

### Blockers recorded
If blockers section is non-empty:
- Display blockers prominently
- Ask: "Blockers were recorded. Are these resolved? [Y/n]"
- If no: "Resolve blockers before continuing, or update progress file manually"

### Git conflicts
If `git status` shows conflicts:
- Error: "Git conflicts detected. Resolve before resuming."
- Do NOT proceed until clean state
