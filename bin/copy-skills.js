#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join, resolve, parse } from 'path';
import { readdir, mkdir, copyFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Find the root of the consuming project by walking up the directory tree
 * looking for .git or .github.
 * Works cross-platform (Windows, macOS, Linux)
 */
function findProjectRoot(startDir = process.cwd()) {
  let current = resolve(startDir);
  const root = parse(current).root;

  while (current !== root) {
    if (existsSync(join(current, '.git')) || existsSync(join(current, '.github'))) {
      return current;
    }
    current = dirname(current);
  }

  console.warn(
    'Warning: Could not find .git or .github in any parent directory. Using current directory as project root.'
  );
  return startDir;
}

/**
 * Create readline interface for interactive prompts
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Ask user yes/no question
 */
function askYesNo(question) {
  return new Promise((resolve) => {
    const rl = createReadlineInterface();
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().startsWith('y'));
    });
  });
}

/**
 * Ask user to select which skills to skip
 */
async function selectSkillsToSkip(changedSkills) {
  console.log('\nSkills with changes that would be overwritten:');
  changedSkills.forEach((skill, index) => {
    console.log(`  ${index + 1}. ${skill}`);
  });

  const rl = createReadlineInterface();

  return new Promise((resolve) => {
    rl.question(
      '\nEnter skill numbers to SKIP (comma-separated, e.g., "1,3"), or press Enter to skip none: ',
      (answer) => {
        rl.close();

        if (!answer.trim()) {
          resolve(new Set());
        }

        const skipSet = new Set(
          answer
            .split(',')
            .map(n => n.trim())
            .filter(n => n && !isNaN(n))
            .map(n => changedSkills[parseInt(n) - 1])
            .filter(Boolean)
        );

        resolve(skipSet);
      }
    );
  });
}

/**
 * Compare source and destination file contents
 */
async function filesAreIdentical(sourcePath, destPath) {
  try {
    if (!existsSync(destPath)) {
      return false;
    }

    const sourceContent = await readFile(sourcePath, 'utf-8');
    const destContent = await readFile(destPath, 'utf-8');

    return sourceContent === destContent;
  } catch (error) {
    return false;
  }
}

/**
 * Recursively copy all skills from the consumer-skills directory to the project root.
 * @returns {Promise<void>}
 */
export async function copySkills() {
  const projectRoot = findProjectRoot();
  const skillsSourceDir = join(__dirname, '..', 'consumer-skills');
  const skillsDestDir = join(projectRoot, '.claude', 'skills');

  let copiedCount = 0;
  let skippedCount = 0;
  let unchangedCount = 0;

  try {
    const skillNames = await readdir(skillsSourceDir);

    // Filter to only directories with SKILL.md files
    const validSkills = [];
    for (const skillName of skillNames) {
      const skillSourcePath = join(skillsSourceDir, skillName, 'SKILL.md');
      if (existsSync(skillSourcePath)) {
        validSkills.push(skillName);
      }
    }

    // Check for skills with changes
    const changedSkills = [];
    const unchangedSkills = [];

    for (const skillName of validSkills) {
      const skillSourcePath = join(skillsSourceDir, skillName, 'SKILL.md');
      const skillDestPath = join(skillsDestDir, skillName, 'SKILL.md');

      if (existsSync(skillDestPath)) {
        const isIdentical = await filesAreIdentical(skillSourcePath, skillDestPath);
        if (isIdentical) {
          unchangedSkills.push(skillName);
        } else {
          changedSkills.push(skillName);
        }
      }
    }

    let skillsToSkip = new Set();

    // If there are changed skills, ask user about overwriting
    if (changedSkills.length > 0) {
      console.log(`\n⚠️  Found ${changedSkills.length} skill(s) with changes:`);
      changedSkills.forEach(skill => console.log(`   • ${skill}`));

      if (unchangedSkills.length > 0) {
        console.log(`\n✓ ${unchangedSkills.length} skill(s) are already up-to-date (no changes detected)`);
      }

      const overwriteAll = await askYesNo(
        '\nOverride all changed skills? (y/n): '
      );

      if (!overwriteAll) {
        skillsToSkip = await selectSkillsToSkip(changedSkills);

        if (skillsToSkip.size > 0) {
          console.log(`\nWill skip: ${Array.from(skillsToSkip).join(', ')}`);
        }
      }
    } else if (unchangedSkills.length > 0) {
      console.log(`\n✓ All skills are already up-to-date (no changes detected)`);
    }

    // Now copy skills
    for (const skillName of validSkills) {
      const skillSourcePath = join(skillsSourceDir, skillName, 'SKILL.md');
      const skillDestPath = join(skillsDestDir, skillName, 'SKILL.md');

      const destExists = existsSync(skillDestPath);

      // Skip if user chose to
      if (skillsToSkip.has(skillName)) {
        console.log(`⊘ Skipped ${skillName}: user chose not to override`);
        skippedCount++;
        continue;
      }

      // Skip if unchanged
      if (destExists && (await filesAreIdentical(skillSourcePath, skillDestPath))) {
        console.log(`– ${skillName}: no changes detected, skipping`);
        unchangedCount++;
        continue;
      }

      // Create destination directory
      await mkdir(dirname(skillDestPath), { recursive: true });

      // Copy the file
      await copyFile(skillSourcePath, skillDestPath);
      const action = destExists ? 'Updated' : 'Copied';
      console.log(`✓ ${action} ${skillName} to ${skillDestPath}`);
      copiedCount++;
    }

    console.log(
      `\n✓ Done: ${copiedCount} skill(s) processed, ${unchangedCount} unchanged, ${skippedCount} skipped.`
    );
  } catch (error) {
    console.error('Error copying skills:', error.message);
    process.exit(1);
  }
}

// Run directly if executed as a script (cross-platform compatible)
const isRunDirectly = process.argv[1].includes('copy-skills');
if (isRunDirectly) {
  copySkills();
}
