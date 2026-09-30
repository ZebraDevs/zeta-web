#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// bin/ ships inside the package, so this is always the installed version's manifest
const manifest = JSON.parse(readFileSync(join(__dirname, '..', 'custom-elements.json'), 'utf-8'));

const elements = manifest.modules
  .map((m) => ({ path: m.path, ...m.declarations?.find((d) => d.tagName) }))
  .filter((e) => e.tagName);

// Collapse huge unions (e.g. the ~800 icon names) to a short preview
const short = (type = '', max = 80) =>
  type.length > max ? `${type.slice(0, max)}… (${type.split('|').length} values)` : type;

const firstLine = (text = '') => {
  const s = text.split('\n')[0].split('. ')[0];
  return s.length > 100 ? `${s.slice(0, 100)}…` : s;
};

/**
 * List all components, or print one component's import, attributes, events and slots.
 */
export function components(name) {
  if (!name) {
    for (const e of elements) console.log(`${e.tagName}  ${firstLine(e.description)}`);
    return;
  }

  const tag = name.startsWith('zeta-') ? name : `zeta-${name}`;
  const el = elements.find((e) => e.tagName === tag);
  if (!el) {
    const near = elements.filter((e) => e.tagName.includes(name)).map((e) => e.tagName);
    throw new Error(`No component "${tag}".${near.length ? ` Did you mean: ${near.join(', ')}?` : ''}`);
  }

  // src/components/x/x.ts -> @zebra-fed/zeta-web/components/x/x.js (see package.json exports)
  const importPath = el.path.replace(/^src\//, '').replace(/\.ts$/, '.js');

  console.log(`${el.tagName}\n${el.description ?? ''}\n`);
  console.log(`import "@zebra-fed/zeta-web/${importPath}";\n`);

  if (el.members?.some((m) => m.name === 'formAssociated' && m.static)) {
    console.log('Form-associated: yes (drop-in for native form fields: name, value, required, <form> submit)\n');
  }

  console.log('Attributes:');
  for (const m of el.members ?? []) {
    if (m.kind === 'field' && m.attribute) console.log(`  ${m.attribute}: ${short(m.type?.text)} = ${m.default}`);
  }

  console.log('\nEvents:');
  for (const ev of el.events ?? []) {
    console.log(`  ${ev.name} (${ev.type?.text ?? 'Event'}) ${ev.description ?? ''}`);
  }

  console.log('\nSlots:');
  for (const s of el.slots ?? []) console.log(`  ${s.name || '(default)'}  ${s.description ?? ''}`);

  if (el.cssParts?.length) {
    console.log('\nCSS parts (::part(name)):');
    for (const p of el.cssParts) console.log(`  ${p.name}  ${p.description ?? ''}`);
  }
  if (el.cssProperties?.length) {
    console.log('\nCSS custom properties:');
    for (const p of el.cssProperties) console.log(`  ${p.name}  ${p.description ?? ''}`);
  }
}

/**
 * List valid zeta-icon names, optionally filtered by substring.
 */
export function icons(search) {
  const icon = elements.find((e) => e.tagName === 'zeta-icon');
  const type = icon?.members?.find((m) => m.name === 'name')?.type?.text ?? '';
  const names = [...type.matchAll(/'([^']+)'/g)].map((m) => m[1]);
  const matches = search ? names.filter((n) => n.includes(search)) : names;
  console.log(matches.length ? matches.join('\n') : `No icons matching "${search}".`);
}

// Run if executed directly
if (process.argv[1].includes('components.js')) {
  try {
    components(process.argv[2]);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}
