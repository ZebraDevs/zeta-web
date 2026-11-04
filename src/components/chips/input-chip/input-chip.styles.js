import { css } from "lit";
export default css`
  :host {
    --_chip-background: var(--interactive-ghost-background-default);
    --_chip-background-hover: var(--interactive-ghost-background-hover);
    --_chip-background-focused: var(--interactive-ghost-background-focused);
  }

  :host .container {
    height: var(--control-target-min);
    gap: var(--space-sm);
    padding: var(--space-xxs) var(--space-sm);
    font: var(--label-medium);
  }
`;
