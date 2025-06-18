import { css } from "lit";
export default css`
  :host {
    height: fit-content;
    width: fit-content;
  }

  :host > button {
    border: none;
    --icon-size: var(--spacing-2xl);
  }

  :host([size="large"]) > button {
    padding: var(--spacing-medium);
    width: var(--spacing-8xl);
    height: var(--spacing-8xl);
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-small);
    width: var(--spacing-6xl);
    height: var(--spacing-6xl);
  }

  :host([size="small"]) > button {
    padding: var(--spacing-minimum);
    --icon-size: var(--spacing-xl);
    width: var(--spacing-3xl);
    height: var(--spacing-3xl);
  }

  :host([flavor]:not([disabled]):not(:hover):not(:active)) > button {
    --flavor-background-color: var(--icon-button-color);
  }
`;
