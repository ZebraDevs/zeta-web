import { css } from "lit";
export default css`
  :host {
    background-color: transparent !important;
  }

  .container {
    border-radius: var(--radius-full) !important;
  }

  *[part="icon"] {
    position: absolute;
    width: var(--spacing-2-5);
    height: var(--spacing-2-5);
    border-radius: var(--radius-full);
    background-color: var(--icon-flavor-primary);
  }

  :host([checked]:not([disabled]):hover) .container:hover *[part="icon"] {
    background-color: var(--border-hover);
  }

  :host([disabled]) {
    *[part="icon"] {
      background-color: var(--surface-disabled);
    }
  }
`;
