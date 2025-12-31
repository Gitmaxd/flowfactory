---
name: flow:resume
description: Resume interrupted flow:work session from last checkpoint
argument-hint: "[progress-file or auto-detect]"
---

# Flow resume

Use skill to resume from last session checkpoint:
- skill: flow-resume

Progress file: #$ARGUMENTS

If no file specified, will auto-detect `flow-progress.txt` in repo root.
