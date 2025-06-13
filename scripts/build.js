// build.js
import { execSync } from 'child_process';
import { copyFileSync } from 'fs';

try {
  execSync('tsc -P tsconfig.build.json', { stdio: 'inherit' });
  execSync('npx clean-css-cli ./src/index.css -o ./dist/index.css', { stdio: 'inherit' });

  copyFileSync('src/generated/tokens/semantics.css', 'dist/semantics.css');
  copyFileSync('src/generated/tokens/primitives.css', 'dist/primitives.css');

  execSync('npx tsx scripts/add-declarations.ts --silent', { stdio: 'inherit' });
} catch (err) {
  console.error('Build failed:', err.message, err);
  process.exit(1);
}
