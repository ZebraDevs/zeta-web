# BK TODO

1. Fix having to import css in HTML
2. React
3. Document
4. Add to Storybook
5. Events
6. Add tests for all
7. Add Storybook actions for all

## Folder Structure

- .gitignore
- Atomic folders?
- Framework specific?

## Actions

- Automatic CHANGELOG
- Automatic Figma pull?
- Deploy Storybook
- Build npm packages:
  - Web Components
  - React
  - Angular
- Deploy all to Artifactory
- PR: Detect code test coverage
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
- Tests
- Strict Guidelines:
  - Theming
  - Storybook
  - Tests
- LICENSE
- ESDoc style

## Tokens

- Primitives file
- Tokens file
- How to automatically extract variables from web components?

## DevTools

- ESLint
- Prettier
