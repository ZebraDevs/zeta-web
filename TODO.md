# BK TODO

1. Fix having to import css in H

## Folder Structure

- Atomic folders?
- Framework specific?

## Actions

- Automatic Figma pull?
- Deploy all to Artifactory
- PR: Detect doc coverage
- Lighthouse
- Accessibility
- Localisation
  `import {msg, str} from '@lit/localize';//...`
  - [`lit-localize.json`](https://lit.dev/docs/v3/localization/overview/#config-file)
  - add `desc` to `msg` templates:
  ````ts
  render() {
    return html`<button>
      ${msg("Launch", {
        desc: "Button that begins rocket launch sequence.",
      })}
    </button>`;
  }```
  ````

## Documentation

- README.md
  - Localization: Translation Report
- Relationship with ZDS
- Styling setup [Styled vs Tailwind]
- Theming
- Strict Guidelines:
  - Theming
  - Storybook
- ESDoc style

## Tokens

- How to automatically extract variables from web components?

### Luke

Why 2 tsconfigs?
Can we move any top level files lower into src?
Document each color as per dart
Determine best practice for colors
icons autocomplete?
storybook colors
design.zebra - Document all colors

- data-theme variable initialized by OS / browser
  OR
- prefers-color-scheme with override

Audit JSDoc tags
Audit css part, css variable usage
Determine best practice for types in forms. Currently input type number has limited support. Determine if we even should, or just have everything as string; Look at MWC
