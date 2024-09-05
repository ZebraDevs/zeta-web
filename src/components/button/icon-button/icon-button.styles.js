import { css } from "lit";
export default css`
  :host {
    height: fit-content;
    width: fit-content;
  }

  :host > button {
    border: none;
  }

  :host([size="large"]) > button {
    padding: var(--spacing-medium);
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-small);
  }

  :host([size="small"]) > button {
    padding: var(--spacing-minimum);
  }

  :host([flavor]:not([disabled]):not(:hover):not(:active)) > button {
    --flavor-background-color: var(--icon-button-color);
  }
`;
