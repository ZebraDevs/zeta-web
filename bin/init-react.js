#!/usr/bin/env node

import { spawn, spawnSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { writeFile, readFile, readdir, mkdir, copyFile } from 'fs/promises';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Get the command to add packages for the given package manager
 */
function getAddCommand(packageManager) {
  return packageManager === 'yarn' ? 'add' : 'install';
}

/**
 * Verify @zebra-fed/zeta-web is reachable before scaffolding anything.
 * It's a public npm package, so this just catches network/registry
 * misconfiguration early instead of failing after a full install.
 */
function checkRegistryAuth() {
  const result = spawnSync('npm', ['view', '@zebra-fed/zeta-web', 'version'], {
    stdio: 'ignore',
    shell: process.platform === 'win32'
  });
  return result.status === 0;
}

// One shared readline interface for the whole run - creating a new interface
// per prompt loses buffered input when stdin is piped (e.g. in tests/CI).
let rlInterface = null;

function prompt(question) {
  if (!rlInterface) {
    rlInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  return new Promise((resolve) => {
    rlInterface.question(question, (answer) => {
      resolve(answer.trim().toLowerCase());
    });
  });
}

/**
 * Read a --name=value flag from argv, restricted to a set of valid values.
 * Skips the prompt for that question when present and valid.
 */
function getFlag(name, validValues) {
  const arg = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!arg) return null;
  const value = arg.split('=')[1];
  return validValues.includes(value) ? value : null;
}

/**
 * Copy consumer skills (use-zeta-react, discover-zeta-react) straight into
 * the new project's .claude/skills - target is known exactly, so no need
 * for the git-root discovery that copy-skills.js does for existing projects.
 */
async function copySkillsToProject(projectPath) {
  const skillsSourceDir = join(__dirname, '..', 'consumer-skills');
  const skillNames = await readdir(skillsSourceDir);
  for (const skillName of skillNames) {
    const srcFile = join(skillsSourceDir, skillName, 'SKILL.md');
    if (!existsSync(srcFile)) continue;
    const destFile = join(projectPath, '.claude', 'skills', skillName, 'SKILL.md');
    await mkdir(dirname(destFile), { recursive: true });
    await copyFile(srcFile, destFile);
  }
}

/**
 * Validate project name
 */
function validateProjectName(name) {
  if (!name) return false;
  // Allow lowercase, numbers, hyphens
  return /^[a-z0-9-]+$/.test(name);
}

/**
 * Run a command and wait for completion
 */
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...options
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}: ${command} ${args.join(' ')}`));
      } else {
        resolve();
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Main scaffolding function
 */
export async function initReact(projectNameArg = null) {
  let projectName = projectNameArg || process.argv[2];

  try {
    // The only 3 questions: name (if missing), package manager, linter.
    if (!projectName) {
      projectName = await prompt('Project name (lowercase, hyphens OK): ');
    }
    const packageManager = getFlag('pm', ['npm', 'yarn'])
      || ((await prompt('Package manager? (npm/yarn) [npm]: ')) === 'yarn' ? 'yarn' : 'npm');
    const linter = getFlag('linter', ['eslint', 'oxlint'])
      || ((await prompt('Linter? (eslint/oxlint) [eslint]: ')) === 'oxlint' ? 'oxlint' : 'eslint');

    if (!validateProjectName(projectName)) {
      console.error(`Error: Invalid project name "${projectName}". Use lowercase letters, numbers, and hyphens only.`);
      process.exit(1);
    }

    const projectPath = resolve(process.cwd(), projectName);

    if (existsSync(projectPath)) {
      console.error(`Error: Directory "${projectName}" already exists.`);
      process.exit(1);
    }

    // From here on, everything runs automatically - no more prompts until the
    // final "start now?" question.

    console.log(`\n→ Checking access to @zebra-fed/zeta-web...`);
    if (!checkRegistryAuth()) {
      console.error(`
Error: Can't reach @zebra-fed/zeta-web on the npm registry.

Check your network connection and npm registry config (~/.npmrc), then try again.
`);
      process.exit(1);
    }

    const isWindows = process.platform === 'win32';
    const pmCmd = isWindows && packageManager === 'npm' ? 'npm.cmd' : packageManager;
    const npxCmd = isWindows ? 'npx.cmd' : 'npx';

    console.log(`\n→ Creating Vite + React + TypeScript project (${packageManager}, ${linter})...`);

    // Use npx for Vite scaffolding (works regardless of package manager).
    // --no-interactive/--no-immediate stop create-vite from asking its own
    // questions (e.g. "Install with npm and start now?") - we already have
    // everything we need and run install/dev ourselves.
    await runCommand(npxCmd, [
      'create-vite@latest',
      projectName,
      '--template', 'react-ts',
      linter === 'eslint' ? '--eslint' : '--no-eslint',
      '--no-interactive',
      '--no-immediate'
    ]);

    // Install dependencies (base + zeta-web) automatically
    console.log(`\n→ Installing dependencies...`);
    await runCommand(pmCmd, ['install'], { cwd: projectPath });

    console.log(`\n→ Installing @zebra-fed/zeta-web and @zebra-fed/zeta-icons...`);
    const addCmd = getAddCommand(packageManager);
    await runCommand(pmCmd, [addCmd, '@zebra-fed/zeta-web', '@zebra-fed/zeta-icons'], { cwd: projectPath });

    // Wire up global styles in src/main.tsx (drop Vite's boilerplate index.css import)
    console.log(`\n→ Configuring zeta-web styles...`);
    const mainTsxPath = join(projectPath, 'src', 'main.tsx');
    let mainContent = await readFile(mainTsxPath, 'utf-8');

    mainContent = mainContent.replace(/import ['"]\.\/index\.css['"];?\n/, '');

    const insertPoint = mainContent.indexOf('import App from');
    if (insertPoint > -1) {
      const before = mainContent.slice(0, insertPoint);
      const after = mainContent.slice(insertPoint);
      mainContent = before + `import "@zebra-fed/zeta-web/index.css";\nimport "@zebra-fed/zeta-icons/index.css";\n` + after;
    }

    await writeFile(mainTsxPath, mainContent);
    console.log(`✓ Added zeta-web styles to main.tsx`);

    // Add a standalone typecheck script (build already runs tsc, but that also
    // runs a full vite build - this gives a fast type-only check for CI/editors)
    const packageJsonPath = join(projectPath, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
    packageJson.scripts.typecheck = 'tsc -b --noEmit';
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✓ Added "typecheck" script to package.json`);

    // Remove Vite's boilerplate CSS/assets - zeta-web's own tokens/reset cover
    // typography and color, and the example below is styled with those tokens.
    console.log(`\n→ Removing Vite boilerplate...`);
    const boilerplatePaths = [
      join(projectPath, 'src', 'App.css'),
      join(projectPath, 'src', 'index.css'),
      join(projectPath, 'src', 'assets', 'hero.png'),
      join(projectPath, 'src', 'assets', 'react.svg'),
      join(projectPath, 'src', 'assets', 'vite.svg'),
      join(projectPath, 'public', 'icons.svg')
    ];
    for (const path of boilerplatePaths) {
      if (existsSync(path)) rmSync(path);
    }
    console.log(`✓ Removed Vite boilerplate CSS and assets`);

    // Create example component showcasing core zeta-web components, styled
    // entirely with zeta design tokens.
    console.log(`\n→ Creating example component...`);
    const appTsxContent = `import { useState } from "react";
import "@zebra-fed/zeta-web/components/global-header/global-header.js";
import "@zebra-fed/zeta-web/components/avatar/avatar.js";
import "@zebra-fed/zeta-web/components/button/button.js";
import "@zebra-fed/zeta-web/components/button/icon-button/icon-button.js";
import "@zebra-fed/zeta-web/components/search/search.js";
import "@zebra-fed/zeta-web/components/dropdown/dropdown-menu/dropdown-menu-button.js";
import "@zebra-fed/zeta-web/components/card/card.js";
import "@zebra-fed/zeta-web/components/card/card-header/card-header.js";
import "@zebra-fed/zeta-web/components/card/card-body/card-body.js";
import "@zebra-fed/zeta-web/components/card/card-footer/card-footer.js";
import "@zebra-fed/zeta-web/components/radio-button/radio-button.js";
import "@zebra-fed/zeta-web/components/stepper-input/stepper-input.js";

const filterOptions = [{ label: "All" }, { label: "Active" }, { label: "Archived" }];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <zeta-global-header platformName="Zeta" name="Jordan Lee" initials="JL">
        <zeta-button slot="menu-items" flavor="subtle">
          Dashboard
        </zeta-button>
        <zeta-icon-button slot="action-items" flavor="subtle">
          alert
        </zeta-icon-button>
        <zeta-avatar slot="user-avatar" size="xxs">
          JL
        </zeta-avatar>
      </zeta-global-header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-large)",
          padding: "var(--spacing-xl)",
          maxWidth: "480px",
          margin: "0 auto",
          background: "var(--surface-default)",
          color: "var(--main-default)",
        }}
      >
        <h1>Welcome to Zeta</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to see updates
        </p>

        <div style={{ display: "flex", gap: "var(--spacing-medium)" }}>
          <zeta-search placeholder="Search..." hasIcon style={{ flex: 1 }} />
          <zeta-dropdown-menu-button name="filter" defaultText="Filter" items={filterOptions} />
        </div>

        <zeta-card>
          <zeta-card-header headline="Your plan" subHeadline="Choose a tier" />
          <zeta-card-body>
            <fieldset style={{ display: "flex", gap: "var(--spacing-large)", marginBottom: "var(--spacing-large)", border: "none", padding: 0 }}>
              <zeta-radio-button name="plan" value="basic" checked>
                Basic
              </zeta-radio-button>
              <zeta-radio-button name="plan" value="pro">
                Pro
              </zeta-radio-button>
            </fieldset>
            <zeta-stepper-input name="seats" min={1} max={10} value="1" />
          </zeta-card-body>
          <zeta-card-footer>
            <zeta-button flavor="outline">Cancel</zeta-button>
            <zeta-button flavor="primary" onClick={() => setCount((c) => c + 1)}>
              Count is {count}
            </zeta-button>
          </zeta-card-footer>
        </zeta-card>
      </div>
    </>
  );
}

export default App;
`;

    await writeFile(join(projectPath, 'src', 'App.tsx'), appTsxContent);
    console.log(`✓ Created example App.tsx`);

    // Copy Claude Code skills so AI agents already know zeta-web conventions
    console.log(`\n→ Adding Claude Code skills...`);
    await copySkillsToProject(projectPath);
    console.log(`✓ Added use-zeta-react and discover-zeta-react skills to .claude/skills`);

    // Point the CSS Variable Autocomplete VSCode extension at zeta-web's tokens
    console.log(`\n→ Configuring editor...`);
    await mkdir(join(projectPath, '.vscode'), { recursive: true });
    await writeFile(
      join(projectPath, '.vscode', 'settings.json'),
      JSON.stringify({
        'cssVariables.lookupFiles': [
          'node_modules/@zebra-fed/zeta-web/primitives.css',
          'node_modules/@zebra-fed/zeta-web/semantics.css'
        ]
      }, null, 2) + '\n'
    );
    console.log(`✓ Wrote .vscode/settings.json`);

    // Verify build (registry access was already confirmed above, so a failure
    // here is a genuine build issue, not auth)
    console.log(`\n→ Verifying project builds...`);
    try {
      await runCommand(pmCmd, ['run', 'build'], { cwd: projectPath });
    } catch {
      console.warn(`
⚠️  Build verification failed. See the error above. The project files are still in
place — you can debug and rebuild manually with "${packageManager} run build".
`);
    }

    console.log(`\n✓ Project "${projectName}" created successfully!`);
    console.log(`Design tokens and component docs: https://design.zebra.com/`);

    // The one and only remaining question.
    const startNow = await prompt('\nStart now? (y/n) [n]: ');
    rlInterface.close();
    rlInterface = null;

    if (startNow === 'y' || startNow === 'yes') {
      console.log(`\n→ Starting dev server...\n`);
      spawn(pmCmd, ['run', 'dev'], {
        stdio: 'inherit',
        cwd: projectPath,
        shell: isWindows
      });
    } else {
      console.log(`
Next steps:
  cd ${projectName}
  ${packageManager} run dev

Then open http://localhost:5173 in your browser.
`);
    }
  } catch (error) {
    if (rlInterface) rlInterface.close();
    console.error(`\nError: ${error.message}`);

    // Cleanup on failure so a retry doesn't hit "directory already exists"
    if (projectName) {
      const projectPath = resolve(process.cwd(), projectName);
      if (existsSync(projectPath)) {
        rmSync(projectPath, { recursive: true, force: true });
        console.error(`Removed partially-created "${projectName}" directory.`);
      }
    }

    process.exit(1);
  }
}

// Run if executed directly
const isRunDirectly = process.argv[1].includes('init-react');
if (isRunDirectly) {
  initReact();
}
