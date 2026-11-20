#!/usr/bin/env node

/**
 * Zeta-Web CLI - Main entry point
 * Works cross-platform on Windows, macOS, and Linux
 */

const command = process.argv[2];
const wantsHelp = process.argv.slice(3).some((a) => a === '--help' || a === '-h');

/**
 * Display help message
 */
function showHelp() {
  console.log(`
zeta-web CLI

Usage:
  zeta-web <command> [options]

Commands:
  init-react        Scaffold a new Vite + React 19 + TypeScript project with zeta-web
                    [--name=<project>] [--pm=npm|yarn] [--linter=eslint|oxlint]
  init-skills       Copy zeta-web consumer skills to your .claude/skills directory
  components [name] List components, or show one's import, attributes, events and slots
  icons [search]    List valid icon names, optionally filtered
  tokens [filter]   List semantic design tokens and their values, optionally filtered
  help [command]    Show this help message, or help for a command

Examples:
  npx @zebra-fed/zeta-web init-react --name=my-app
  npx @zebra-fed/zeta-web init-skills
  npx @zebra-fed/zeta-web components button
  npx @zebra-fed/zeta-web help
  npx @zebra-fed/zeta-web init-react --help
`);
}

/**
 * Display init-react help message
 */
function showInitReactHelp() {
  console.log(`
zeta-web init-react

Scaffold a new Vite + React 19 + TypeScript project pre-wired with zeta-web.

Usage:
  npx @zebra-fed/zeta-web init-react [options]

Options:
  --name=<project>        Project directory name (lowercase letters, numbers, hyphens)
  --pm=npm|yarn           Package manager (default: npm)
  --linter=eslint|oxlint  Linter (default: eslint)
  -h, --help              Show this help message

Any option not passed is asked for interactively.

What it does:
  - Scaffolds the project with create-vite (react-ts template)
  - Installs @zebra-fed/zeta-web and @zebra-fed/zeta-icons
  - Wires zeta global styles into src/main.tsx
  - Replaces the Vite boilerplate with an example App.tsx using zeta components
  - Adds the use-zeta-react Claude Code skill to .claude/skills
  - Configures .vscode/settings.json for CSS variable autocomplete
  - Verifies the project builds, then offers to start the dev server

Examples:
  npx @zebra-fed/zeta-web init-react
  npx @zebra-fed/zeta-web init-react --name=my-app --pm=yarn --linter=oxlint
`);
}

/**
 * Route to subcommand (async)
 */
async function main() {
  switch (command) {
    case 'init-react': {
      if (wantsHelp) {
        showInitReactHelp();
        break;
      }
      try {
        // Dynamic import works cross-platform
        const { initReact } = await import('./init-react.js');
        await initReact();
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
      break;
    }

    case 'init-skills': {
      try {
        // Dynamic import works cross-platform
        const { copySkills } = await import('./copy-skills.js');
        await copySkills();
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
      break;
    }

    case 'components': {
      try {
        const { components } = await import('./components.js');
        components(process.argv[3]);
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
      break;
    }

    case 'icons': {
      try {
        const { icons } = await import('./components.js');
        icons(process.argv[3]);
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
      break;
    }

    case 'tokens': {
      try {
        const { tokens } = await import('./tokens.js');
        tokens(process.argv[3]);
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
      break;
    }

    case 'help':
    case '--help':
    case '-h':
      if (process.argv[3] === 'init-react') showInitReactHelp();
      else showHelp();
      break;

    case undefined:
      console.error('Error: Missing command\n');
      showHelp();
      process.exit(1);
      break;

    default:
      console.error(`Error: Unknown command "${command}"\n`);
      showHelp();
      process.exit(1);
  }
}

// Execute main function
main().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
