#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * List semantic design tokens with their values, optionally filtered by substring.
 * Parses dist/semantics.css: each token is preceded by a comment listing its
 * light/dark values (colors) or default value (spacing, radius, etc.).
 */
export function tokens(filter) {
  const css = readFileSync(join(__dirname, '..', 'dist', 'semantics.css'), 'utf-8');
  const rows = [];

  for (const [, comment, name, value] of css.matchAll(/\/\*([\s\S]*?)\*\/\s*(--[\w-]+):\s*([^;]+);/g)) {
    if (filter && !name.includes(filter)) continue;
    const light = comment.match(/Light mode: (#\w+)/)?.[1];
    const dark = comment.match(/Dark mode: (#\w+)/)?.[1];
    // var(--color-blue-60, #0073e6) -> #0073e6
    const fallback = value.match(/var\([^,]+,\s*([^)]+)\)/)?.[1] ?? value;
    rows.push(`${name}  ${light && dark ? `light ${light} / dark ${dark}` : fallback}`);
  }

  // Elevation and typography tokens aren't in semantics.css; they only ship in the
  // (minified) bundled index.css. Take the first definition of each.
  const bundle = readFileSync(join(__dirname, '..', 'dist', 'index.css'), 'utf-8');
  const seen = new Set();
  for (const [, name, value] of bundle.matchAll(/(--(?:elevation|display|headline|title|body|label)[\w-]*):([^;}]+)/g)) {
    if (seen.has(name) || (filter && !name.includes(filter))) continue;
    seen.add(name);
    rows.push(`${name}  ${value.trim()}`);
  }

  console.log(rows.length ? rows.join('\n') : `No tokens matching "${filter}".`);
}
