import { css } from "lit";
export default css`
  :host {
    user-select: none;
  }

  :host(:not([disabled])) .interactive-target,
  :host(:not([disabled])) > :not(:has(.interactive-target)):first-child {
    cursor: pointer;
  }

  /* :host(:not([disabled]):hover) .interactive-target {
    background: var(--surface-hover);
  } */

  /* :host(:not([disabled]):active) .interactive-target {
    background: var(--surface-selected);
  } */

  :host([disabled]) > *,
  :host([disabled]) ::slotted(zeta-icon) {
    cursor: not-allowed;
    --icon-color: var(--main-disabled);
  }

  :host(:focus-visible) .interactive-target,
  .interactive-target:focus-visible {
    outline-width: var(--border-size-medium);
    outline-color: var(--border-primary);
    outline-style: solid;
    z-index: 1;
  }
`;
