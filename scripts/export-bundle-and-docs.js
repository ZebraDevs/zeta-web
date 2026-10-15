import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

import { components } from '../bin/components.js';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');

// fixed output location inside the repo (gitignored), not user-supplied, so the script can't write elsewhere
const outputDir = path.join(root, 'generated');

function outputDirs() {
    const vendorDir = path.join(outputDir, 'vendor');
    const docsDir = path.join(outputDir, 'docs');

    try {
        fs.mkdirSync(vendorDir, { recursive: true });
        fs.mkdirSync(docsDir, { recursive: true });
    }
    catch (err) {
        console.error(`Could not create directories in ${outputDir}: ${err.message}`);
        process.exit(1);
    }

    console.log(`Writing to ${outputDir}`);

    return { vendorDir, docsDir };
};

async function buildBundle(dir) {
    await esbuild.build({
        // typography imported since not included in index.js
        stdin: {
            contents: [
                `import './dist/index.js';`,
                `import '@fontsource/ibm-plex-sans/latin-300.css';`,
                `import '@fontsource/ibm-plex-sans/latin-400.css';`,
                `import '@fontsource/ibm-plex-sans/latin-500.css';`,
            ].join('\n'),
            resolveDir: root,
        },
        bundle: true,
        format: 'iife', // classic script, works from a double-clicked file
        minify: true,
        target: 'es2020',
        loader: {
            // inline fonts and icons so it works offline
            '.woff2': 'dataurl',
            '.woff': 'dataurl',
            '.ttf': 'dataurl',
            '.svg': 'dataurl',
        },
        outfile: path.join(dir, 'zeta-web.bundle.js'),
    });

    console.log(`Bundle written to vendor/`);
};

// type aliases that the manifest leaves unexpanded
const TYPE_ALIASES = {
    SizeType: `'small' | 'medium' | 'large'`,
    ZetaIconName: 'icon name from icon-list.md',
};

const expandType = (type = '') => type.replace(/\b(SizeType|ZetaIconName)\b/g, (_, alias) => TYPE_ALIASES[alias]);

// uses the same output as `bin/components.js`, but with full types and attribute descriptions
function describeComponent(tag) {
    const lines = [];
    components(tag, { log: line => lines.push(line), formatType: expandType, attributeDescriptions: true });
    return lines.join('\n');
};

function generateComponentCatalog(dir) {
    // make component-catalog.md - one section per component
    const manifest = JSON.parse(fs.readFileSync(path.join(root, 'custom-elements.json'), 'utf-8'));
    const tags = manifest.modules
        .map(m => m.declarations?.find(d => d.tagName)?.tagName)
        .filter(Boolean);

    const sections = tags.map(tag => `## ${tag}\n\n\`\`\`\`\n${describeComponent(tag)}\n\`\`\`\`\n`);

    const lines = [
        '# Zeta components',
        '',
        'Attributes, events, slots, CSS parts and CSS custom properties for each component.',
        '',
        ...sections,
    ];

    fs.writeFileSync(path.join(dir, 'component-catalog.md'), lines.join('\n'));
    console.log(`Component catalog written to docs/ (${sections.length} components)`);
};

function generateIconList(dir) {
    // make icon-list.md - list of all available icons and their category
    const manifestPath = path.join(root, 'node_modules', '@zebra-fed', 'zeta-icons', 'outputs', 'icon-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    const icons = Object.values(manifest).map(icon => ({
        name: path.basename(icon.roundPath, '_round.svg'),
        category: icon.category,
        terms: icon.searchTerms.map(t => t.replace(/\s+/g, ' ').trim()).join(', '),
    }));

    const header = [
        '# Zeta icons',
        '',
        'Use an icon with `<zeta-icon name="alarm"></zeta-icon>`.',
        'Choose by meaning, using the search terms. Use only names from the name column, exactly as written.',
        '',
        '| name | category | search terms |',
        '|---|---|---|',
    ];

    const rows = icons.map(icon => `| ${icon.name} | ${icon.category} | ${icon.terms} |`);
    fs.writeFileSync(path.join(dir, 'icon-list.md'), [...header, ...rows].join('\n'));
    console.log(`Icon list written to docs/ (${icons.length} icons)`);
};

// reads --name: value; lines from a css file, tagging each token with the section it sits under.
// styles.css has one-line section comments (/* Font */); semantics.css has a block comment per token
function parseTokens(filePath) {
    const tokens = [];
    let section = 'Other';

    for (const line of fs.readFileSync(filePath, 'utf-8').split('\n')) {
        const oneLine = line.match(/^\s*\/\*\s*(.+?)\s*\*\/\s*$/);
        if (oneLine) {
            section = oneLine[1];
            continue;
        }

        const block = line.match(/^\s*\/\*\s*([\w-]+)(?:\/[\w-]+)+\s*$/);
        if (block) {
            section = block[1];
            continue;
        }

        const decl = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?);\s*$/);
        if (!decl) continue;

        const [, name, raw] = decl;
        const fallback = raw.match(/^var\(.+?,\s*(.+)\)$/);
        tokens.push({ name, value: fallback ? fallback[1] : raw, section });
    }

    return tokens;
};

const TOKEN_SECTION_NOTES = {
    main: 'Text and icon colours.',
    surface: 'Background colours.',
    border: 'Border colours.',
    state: 'Colours for interactive states (enabled, hover, selected, disabled).',
    chart: 'Chart series colours. Each numbered series has a primary and a secondary shade.',
    avatar: 'Avatar background colours.',
    spacing: 'Padding, margin and gap sizes.',
    'Half spacing': 'In-between spacing values.',
    radius: 'Corner radii.',
    'Border size': 'Border widths.',
    'Box shadows': 'Shadows for depth, 1 is lowest and 6 is highest.',
    'Font': 'Text styles. Each is a `font` shorthand: `font: var(--body-medium);`. --h1 to --h6 are aliases.',
    'Font Weight': 'Weights used by the text styles.',
};

function generateTokenList(dir) {
    // make token-list.md - list of all tokens and their values
    // this includes coloring, spacing and typography etc
    const tokens = [
        ...parseTokens(path.join(root, 'src', 'generated', 'tokens', 'semantics.css')),
        ...parseTokens(path.join(root, 'src', 'css', 'styles.css')),
    ];

    const sections = {};
    for (const token of tokens) {
        // styles.css lists the font family under its Colors comment, and its two surface colours belong with surface
        let section = token.section;
        if (token.name.startsWith('--type-')) section = 'Font';
        else if (token.name.startsWith('--surface-')) section = 'surface';
        (sections[section] ??= []).push(token);
    }

    const lines = [
        '# Zeta design tokens',
        '',
        'Use tokens as CSS variables, for example `color: var(--main-subtle);`. Never use raw hex values or pixel sizes,',
        'so that dark mode and themes keep working. Choose tokens by their section: main for text, surface for backgrounds,',
        'border for borders. Values shown are the light mode defaults.',
        '',
    ];

    for (const [section, items] of Object.entries(sections)) {
        lines.push(`## ${section}`);
        if (TOKEN_SECTION_NOTES[section]) lines.push(TOKEN_SECTION_NOTES[section]);
        for (const token of items) lines.push(`- ${token.name}: ${token.value}`);
        lines.push('');
    }

    fs.writeFileSync(path.join(dir, 'token-list.md'), lines.join('\n'));
    console.log(`Token list written to docs/ (${Object.values(sections).flat().length} tokens)`);
};

const { vendorDir, docsDir } = outputDirs();

try {
    await buildBundle(vendorDir);
    generateComponentCatalog(docsDir);
    generateIconList(docsDir);
    generateTokenList(docsDir);
}
catch (err) {
    console.error(`Export failed: ${err.message}`);
    process.exit(1);
}
