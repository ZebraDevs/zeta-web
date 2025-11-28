import { css } from "lit";
export default css`
  :host {
    background-color: transparent;
  }

  label {
    cursor: pointer;
    width: auto !important;
    height: 100% !important;
  }

  .container {
    border-radius: var(--radius-full) !important;
  }

  *[part="icon"] {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: var(--radius-full);
    background-color: var(--main-primary);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([checked]:not([disabled]):hover) label:hover *[part="icon"] {
      background-color: var(--border-hover);
    }
  }

  :host([disabled]) {
    *[part="icon"] {
      background-color: var(--surface-disabled);
    }
  }

  /* Size Variants */
  :host([size="small"]) label {
    font: var(--body-small);
    gap: var(--spacing-small);
  }
  :host([size="small"]) .container {
    height: var(--spacing-medium);
    width: var(--spacing-medium);
  }
  :host([size="small"]) .container [part="icon"] {
    width: 6px;
    height: 6px;
  }

  :host([size="large"]) label {
    font: var(--body-medium);
  }
  :host([size="large"]) .container {
    height: var(--spacing-xl);
    width: var(--spacing-xl);
  }
  :host([size="large"]) .container [part="icon"] {
    width: 12px;
    height: 12px;
  }
`;
