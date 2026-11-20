import { css } from "lit";
export default css`
  :host {
    --_chip-background: var(--assist-chip-background-color, var(--interactive-neutral-background-default));
    --_chip-border: var(--assist-chip-border-color, var(--interactive-neutral-border-default));
    --_chip-foreground: var(--assist-chip-foreground-color, var(--interactive-neutral-foreground-default));
  }
  :host([color="green"]) {
    --_chip-border: var(--assist-chip-border-color, var(--border-success));
    --_chip-foreground: var(--assist-chip-foreground-color, var(--feedback-success-foreground));
  }
  :host([color="orange"]) {
    --_chip-border: var(--assist-chip-border-color, var(--border-warning));
    --_chip-foreground: var(--assist-chip-foreground-color, var(--feedback-warning-foreground));
  }
  :host([color="blue"]) {
    --_chip-border: var(--assist-chip-border-color, var(--border-info));
    --_chip-foreground: var(--assist-chip-foreground-color, var(--feedback-info-foreground));
  }
  :host([color="red"]) {
    --_chip-border: var(--assist-chip-border-color, var(--border-error));
    --_chip-foreground: var(--assist-chip-foreground-color, var(--feedback-error-foreground));
  }

  :host .container {
    height: auto;
    gap: var(--space-2xs);
    padding: var(--space-xs) var(--space-sm);
  }

  .label {
    padding-inline: var(--space-xxs);
  }

  zeta-icon {
    --icon-size: var(--control-icon-xs);
  }
`;
