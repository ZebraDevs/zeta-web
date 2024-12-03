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

  :host([checked]:not([disabled]):hover) label:hover *[part="icon"] {
    background-color: var(--border-hover);
  }

  :host([disabled]) {
    *[part="icon"] {
      background-color: var(--surface-disabled);
    }
  }
`;
