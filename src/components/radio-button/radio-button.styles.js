import { css } from "lit";
/* Ring, target, size, label and border states come from base-toggle-form-element.styles.js */
export default css`
  :host {
    background-color: transparent;
  }

  .container {
    padding: var(--space-xxs);
    border-radius: var(--radius-pill) !important;
  }
  :host([size="small"]) .container {
    padding: var(--space-2xs);
  }

  /* Inner fill: fills the ring's padding box (12px at large, 8px at small) */
  *[part="icon"] {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-pill);
    background-color: var(--interactive-selection-background-pressed);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([checked]:not([disabled])) label:hover *[part="icon"] {
      background-color: var(--interactive-selection-background-hover);
    }
  }

  :host([disabled]) *[part="icon"] {
    background-color: var(--interactive-selection-background-disabled);
  }
`;
