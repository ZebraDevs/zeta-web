// build.js
import { execSync } from 'child_process';
import { cpSync, copyFileSync } from 'fs';

try {
  execSync('tsc -P tsconfig.build.json', { stdio: 'inherit' });
  execSync('npx clean-css-cli ./src/index.css -o ./dist/index.css', { stdio: 'inherit' });

  // New tokens: index.css + tokens.css + palette/, primitives/, size/, typography/ (skip legacy top-level files)
  cpSync('src/generated/tokens', 'dist/tokens', {
    recursive: true,
    filter: (src) => !/tokens\/(?:primitives|semantics)[\w-]*\.css$/.test(src),
  });
  copyFileSync('custom-elements.json', 'dist/custom-elements.json');

  execSync('npx tsx scripts/add-declarations.ts --silent', { stdio: 'inherit' });
} catch (err) {
  console.error('Build failed:', err.message, err);
  process.exit(1);
}
