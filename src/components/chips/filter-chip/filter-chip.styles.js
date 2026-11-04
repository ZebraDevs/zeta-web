import { css } from "lit";
export default css`
  :host([active]:not([disabled])) {
    --_chip-background: var(--interactive-inverse-background-selected);
    --_chip-background-hover: var(--interactive-inverse-background-selected);
    --_chip-background-focused: var(--interactive-inverse-background-selected);
    --_chip-background-pressed: var(--interactive-inverse-background-selected);
    --_chip-border: var(--interactive-inverse-border-pressed);
    --_chip-foreground: var(--interactive-inverse-foreground-default);
  }

  /* The 16px check mark is taller than the label, so vertical padding shrinks to keep the chip 32px */
  :host([active]) .container {
    gap: var(--space-sm);
    padding-block: var(--space-xxs);
  }
`;
