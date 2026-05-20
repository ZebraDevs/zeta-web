import { css } from "lit";
export default css`
  :host {
    user-select: none;
  }

  :host(:not([disabled])):not(:has(input[disabled])):not(:has(.interactive-target[disabled])),
  :host(:not([disabled])):not(:has(input[disabled])):not(:has(.interactive-target[disabled])) > :not(:has(.interactive-target)):first-child:not([disabled]) {
    cursor: pointer;
  }

  :host([disabled]) > *,
  :host([disabled]) ::slotted(zeta-icon),
  .interactive-target[disabled],
  .interactive-target[disabled] > * {
    cursor: not-allowed;
    --icon-color: var(--main-disabled);
    color: var(--main-disabled);
  }

  :host(:focus-visible) .interactive-target,
  .interactive-target:focus-visible {
    outline-width: var(--border-size-medium);
    outline-color: var(--border-primary);
    outline-style: solid;
    z-index: 1;
  }
`;
