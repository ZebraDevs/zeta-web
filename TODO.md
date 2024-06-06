# BK TODO

1. Fix having to import css in HTML
2. Hook up react library creation
3. see if react components work in storybook
4. ditto, demo.

# TODO before first Public PR

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

## Tests

- Setup Test Framework
- Test each expected export

## DevTools

- ESLint
- Prettier
