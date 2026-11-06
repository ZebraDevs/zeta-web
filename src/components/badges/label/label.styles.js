import { css } from "lit";
export default css`
  :host {
    width: fit-content;
    display: inline-block;
    --_label-strong: var(--foreground-secondary);
    --_label-subtle: var(--surface-subtle);
    --_label-border: var(--border-strong);
    --_label-on-strong: var(--foreground-inverse);
  }
  :host([status="info"]) {
    --_label-strong: var(--feedback-info-background-strong);
    --_label-subtle: var(--feedback-info-background-subtle);
    --_label-border: var(--border-info);
    --_label-on-strong: var(--interactive-primary-foreground-default);
  }

  :host([status="positive"]) {
    --_label-strong: var(--feedback-success-background-strong);
    --_label-subtle: var(--feedback-success-background-subtle);
    --_label-border: var(--border-success);
    --_label-on-strong: var(--interactive-primary-foreground-default);
  }

  :host([status="warning"]) {
    --_label-strong: var(--feedback-warning-background-strong);
    --_label-subtle: var(--feedback-warning-background-subtle);
    --_label-border: var(--border-warning);
  }

  :host([status="negative"]) {
    --_label-strong: var(--feedback-error-background-strong);
    --_label-subtle: var(--feedback-error-background-subtle);
    --_label-border: var(--border-error);
    --_label-on-strong: var(--interactive-destructive-foreground-default);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: fit-content;
    box-sizing: border-box;
    gap: var(--space-2xs);
    padding: var(--space-xxs);
    /* Bold: solid fill, 1px stroke matching the fill (26px tall) */
    background: var(--_label-strong);
    border: var(--stroke-thin) solid var(--_label-strong);
    .text {
      color: var(--_label-on-strong);
      font: var(--body-xsmall);
      min-height: var(--body-xsmall-line-height);
    }
  }

  /* Not bold: tinted fill. The border is held at zero weight as a theming hook (24px tall) */
  :host(:not([bold])) .container {
    background: var(--_label-subtle);
    border: var(--stroke-base) solid var(--_label-border);
    .text {
      color: var(--foreground-primary);
    }
  }

  /* Outlined (only without bold): 1px stroke drawn inside the 24px box */
  :host(:not([bold])[outlined]) .container {
    border-width: var(--stroke-thin);
    padding: calc(var(--space-xxs) - var(--stroke-thin));
  }
`;
