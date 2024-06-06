import { css } from "lit";
export default css`
  :host(:not([disabled])) .interactive-target,
  :host(:not([disabled])) > :not(:has(.interactive-target)):first-child {
    cursor: pointer;
    user-select: none;
  }

  :host(:not([disabled]):hover) .interactive-target,
  :host(:not([disabled]):hover) > :not(:has(.interactive-target)):first-child {
    background: var(--surface-hover);
  }

  :host(:not([disabled]):active) .interactive-target {
    background: var(--surface-pressed);
  }

  :host([disabled]) > *,
  :host([disabled]) ::slotted(zeta-icon) {
    cursor: not-allowed;
    --icon-color: var(--text-disabled);
  }

  :host(:focus) .interactive-target,
  :host(:focus) > :not(:has(.interactive-target)) {
    /* FIXME BK: This is buggy, causing issues in button-group-item. Do we really need both? */
    box-shadow: 0 0 0 var(--border-size-medium) var(--border-flavor-primary);
    outline-width: var(--border-size-medium);
    outline-color: var(--border-flavor-primary);
    z-index: 1;
  }
`;
