import { css } from "lit";
export default css`
  :host {
    user-select: none;
  }

  :host(:not([disabled])) .interactive-target,
  :host(:not([disabled])) > :not(:has(.interactive-target)):first-child {
    cursor: pointer;
  }

  :host([disabled]) > *,
  :host([disabled]) ::slotted(zeta-icon) {
    cursor: not-allowed;
    --icon-color: var(--foreground-disabled);
    color: var(--foreground-disabled);
  }

  :host(:focus-visible) .interactive-target,
  .interactive-target:focus-visible {
    outline-width: var(--stroke-thick);
    outline-color: var(--border-focus);
    outline-style: solid;
    z-index: 1;
  }
`;
