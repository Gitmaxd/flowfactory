import { defineCommand, runMain } from 'citty';
import { copy, pathExists, ensureDir } from 'fs-extra';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stat } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

const init = defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize FlowFactory in your project',
  },
  args: {
    force: {
      type: 'boolean',
      description: 'Skip existing file checks (still never overwrites)',
      default: false,
    },
    path: {
      type: 'string',
      description: 'Target directory (defaults to current directory)',
      default: '.',
    },
  },
  async run({ args }) {
    const targetDir = resolve(args.path);
    const factoryDir = join(targetDir, '.factory');
    const templatesDir = resolve(__dirname, '..', 'templates');

    console.log('\n🏭 FlowFactory Initializer\n');

    // Check if templates exist
    if (!(await pathExists(templatesDir))) {
      console.error('❌ Templates directory not found. Package may be corrupted.');
      process.exit(1);
    }

    // Check if .factory already exists
    if (await pathExists(factoryDir)) {
      console.log('⚠️  .factory directory already exists');
      console.log('   Scaffolding new files only (existing files will NOT be overwritten)\n');
    }

    // Ensure .factory directory exists
    await ensureDir(factoryDir);

    // Track copied and skipped files
    let copied = 0;
    let skipped = 0;

    try {
      await copy(templatesDir, factoryDir, {
        overwrite: false,
        errorOnExist: false,
        filter: async (src, dest) => {
          // Always allow directories
          const srcStat = await stat(src);
          if (srcStat.isDirectory()) {
            return true;
          }

          // Check if destination file exists
          if (await pathExists(dest)) {
            const relativePath = dest.replace(targetDir, '.');
            console.log(`⏭️  Skipped: ${relativePath} (already exists)`);
            skipped++;
            return false;
          }

          const relativePath = dest.replace(targetDir, '.');
          console.log(`✅ Created: ${relativePath}`);
          copied++;
          return true;
        },
      });
    } catch (error) {
      console.error('❌ Error during scaffolding:', error);
      process.exit(1);
    }

    console.log('\n────────────────────────────────────────');
    console.log('✅ FlowFactory initialized successfully!');
    console.log(`   📁 Files created: ${copied}`);
    console.log(`   ⏭️  Files skipped: ${skipped}`);
    console.log('\n📖 Documentation: https://flowfactory.dev');
    console.log('🚀 Get started: /flow:plan <your feature>\n');
  },
});

const main = defineCommand({
  meta: {
    name: 'flowfactory',
    version: '1.0.0',
    description: 'Scaffold FlowFactory workflow system into your project',
  },
  subCommands: {
    init,
  },
  async run() {
    console.log('\n🏭 FlowFactory - Workflow system for AI agents\n');
    console.log('Usage:');
    console.log('  flowfactory init [options]    Initialize FlowFactory in your project');
    console.log('  flowfactory --help            Show help');
    console.log('  flowfactory --version         Show version\n');
    console.log('Quick start:');
    console.log('  npx flowfactory init\n');
  },
});

runMain(main);
