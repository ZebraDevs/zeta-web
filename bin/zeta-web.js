#!/usr/bin/env node

/**
 * Zeta-Web CLI - Main entry point
 * Works cross-platform on Windows, macOS, and Linux
 */

const command = process.argv[2];

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
  init-skills       Copy zeta-web consumer skills to your .claude/skills directory
  help              Show this help message

Examples:
  npx zeta-web init-react my-app
  npx zeta-web init-skills
  npx zeta-web help
`);
}

/**
 * Route to subcommand (async)
 */
async function main() {
  switch (command) {
    case 'init-react': {
      try {
        // Dynamic import works cross-platform
        const { initReact } = await import('./init-react.js');
        // Pass project name as argv[3] (argv[2] is 'init-react')
        await initReact(process.argv[3]);
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

    case 'help':
    case '--help':
    case '-h':
      showHelp();
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
