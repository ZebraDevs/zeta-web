import { css } from "lit";
export default css`
  :host {
    --icon-size: 16px;
    --icon-button-icon-color: var(--icon-default);
    --icon-button-color: var(--surface-warm);
    --icon-button-icon-color-disabled: var(--icon-disabled);
    width: fit-content;
    border: 0.5px solid var(--border-default);
    transition: background-color 0.2s ease-out;
  }
  :host(:hover) {
    border-color: transparent;
    --icon-button-color: var(--surface-hover);
  }

  :host(:active) {
    border-color: transparent;
    --icon-button-color: var(--surface-pressed);
  }

  :host > button {
    padding: var(--spacing-0-5) var(--spacing-2) !important;
  }

  :host([rounded]) {
    border-radius: var(--radius-minimal);
  }
`;
