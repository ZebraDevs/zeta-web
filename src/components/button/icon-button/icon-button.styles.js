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
    padding: var(--spacing-3);
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-2);
  }

  :host([size="small"]) > button {
    padding: var(--spacing-1-5);
  }

  :host([flavor]:not([disabled]):not(:hover):not(:active)) > button {
    --flavor-background-color: var(--icon-button-color);
  }
`;
