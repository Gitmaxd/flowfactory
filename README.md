# FlowFactory

Scaffold the FlowFactory workflow system into any project.

[![npm version](https://img.shields.io/npm/v/flowfactory.svg)](https://www.npmjs.com/package/flowfactory)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npx flowfactory init
```

Or install globally:

```bash
npm install -g flowfactory
flowfactory init
```

## What Gets Installed

FlowFactory adds a `.factory/` directory with:

- **Commands**: `/flow:plan`, `/flow:work`, `/flow:impl-review`, `/flow:resume`, `/flow:check`, `/flow:status`
- **Droids**: Research agents (repo-scout, practice-scout, docs-scout, context-scout, flow-gap-analyst, quality-auditor)
- **Skills**: Workflow logic for planning, execution, and review

## Safety

FlowFactory **never overwrites existing files**. If `.factory/` already exists, only new files will be added. Existing files are always preserved.

## Usage

After installation:

```bash
# Plan a feature
/flow:plan Add user authentication

# Execute a plan
/flow:work plans/add-user-auth.md

# Review your implementation
/flow:impl-review
```

## Documentation

- [FlowFactory.dev](https://flowfactory.dev)
- [Full Documentation](.factory/README.md) (after init)

## Options

```bash
flowfactory init [options]

Options:
  --path <dir>    Target directory (default: current directory)
  --force         Skip confirmation prompts
  --help          Show help
  --version       Show version
```

## Requirements

- Node.js >= 18
- Works with Factory.ai Droid, Claude, and other AI coding assistants

## License

MIT

## Credits

FlowFactory is built upon the excellent foundation of [Flow](https://github.com/gmickel/gmickel-claude-marketplace) by [Gordon Mickel](https://github.com/gmickel), originally created as a Claude Code plugin.

This project adapts and extends that work for the Factory.ai Droid ecosystem, bringing the same disciplined workflow approach to a broader range of AI coding assistants.

We gratefully acknowledge Gordon's forward work in creating structured workflows for AI agents.

## Author

[GitMaxd](https://github.com/Gitmaxd) · [@gitmaxd](https://x.com/gitmaxd)

---

<p align="center">
  <a href="https://flowfactory.dev">flowfactory.dev</a>
</p>
