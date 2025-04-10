# TODO

1. Fix having to import css in HTML

## Actions

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

- Localization: Translation Report
- Styling setup [Styled vs Tailwind]
- Theming
- ESDoc style

## Tokens

- How to automatically extract variables from web components?

## DevTools

- ESLint
- Prettier
