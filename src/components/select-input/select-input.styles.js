import { css } from "lit";
export default css`
  :host([disabled]),
  :host([disabled]) .label,
  :host([disabled]) .label label,
  :host([disabled]) .required,
  :host([disabled]) .hint,
  :host([disabled]) .input {
    cursor: not-allowed;
    color: var(--main-disabled);
  }

  :host([disabled]) .input {
    border-color: var(--border-default);
    background-color: var(--surface-disabled);
  }

  .hidden-select {
    display: none;
  }

  .slot {
    display: none;
  }

  .label label {
    font: var(--body-medium);
    color: var(--main-default);
  }

  .label {
    cursor: default;
  }

  zeta-icon {
    color: var(--main-subtle);
  }

  :host([size="medium"]) zeta-icon,
  :host([size="large"]) zeta-icon {
    --icon-size: var(--spacing-xl);
  }

  :host([size="small"]) zeta-icon {
    --icon-size: var(--spacing-large);
  }

  :host([disabled]) zeta-icon {
    color: var(--main-disabled);
  }

  .hint {
    display: flex;
    align-items: center;
    gap: var(--spacing-minimum);
    cursor: default;
    margin-top: var(--spacing-minimum);
  }

  :host([error]) .hint > zeta-icon.hint-icon,
  :host([error]) .hint-text,
  .required {
    color: var(--main-negative);
  }

  :host([error]) .input {
    outline: solid var(--border-negative) var(--spacing-minimum);
    background-color: var(--surface-negative-subtle);
    color: var(--main-default);
  }

  .hint-text {
    color: var(--main-subtle);
    font: var(--body-x-small);
  }

  .input {
    display: flex;
    color: var(--main-subtle);
    align-items: center;
    gap: var(--spacing-small);
    margin-top: var(--spacing-small);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-none);
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .input:hover {
    border-color: var(--border-hover);
  }

  .input:focus-visible {
    border-color: transparent;
    outline: solid var(--border-primary) var(--spacing-minimum);
  }

  :host([open]) .input {
    border-color: transparent;
    outline: solid var(--border-primary) var(--spacing-0-5);
  }

  :host([open]) zeta-icon.expand-more {
    transform: rotate(180deg);
  }

  :host([isSelected]) .input {
    color: var(--main-default);
    border-color: var(--border-hover);
  }

  :host([size="small"]) .input {
    padding: var(--spacing-minimum);
    font: var(--body-x-small);
  }
  :host([size="medium"]) .input {
    padding: var(--spacing-small);
    font: var(--body-medium);
  }
  :host([size="large"]) .input {
    padding: var(--spacing-medium);
    font: var(--body-medium);
  }
  .expand-more {
    padding: 4px;
    margin: -4px -4px -4px auto;
    border-radius: var(--radius-none);
  }

  .expand-more:hover {
    background-color: var(--main-light);
  }

  :host([rounded]) .expand-more {
    border-radius: var(--radius-full);
  }

  :host([rounded]) .input {
    border-radius: var(--radius-minimal);
  }

  .input-options {
    position: relative;
  }

  .options {
    display: none;
    background-color: var(--surface-default);
    width: 100%;
    z-index: 1;
    box-shadow:
      0px 0px 2px 0px rgba(40, 51, 61, 0.04),
      0px 4px 8px 0px rgba(96, 104, 112, 0.16);
    overflow-y: auto;
    margin-top: 2px;
    position: absolute;
  }

  :host([rounded]) .options {
    border-radius: var(--radius-minimal);
  }

  :host([open]) .options {
    display: block;
  }
`;
