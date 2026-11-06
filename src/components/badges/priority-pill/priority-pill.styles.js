import { css } from "lit";
export default css`
  :host {
    --_background: var(--foreground-secondary);
    --_foreground: var(--foreground-inverse);
    width: fit-content;
    display: inline-block;
  }

  .container {
    display: flex;
    align-items: center;
    gap: var(--space-xxs);
    padding: var(--space-xxs) var(--space-sm) var(--space-xxs) var(--space-xxs);
    background: var(--priority-pill-background-color, var(--_background));
    white-space: nowrap;
    font: var(--body-small);
    color: var(--priority-pill-text-color, var(--_foreground));

    > .number {
      display: flex;
      flex-shrink: 0;
      box-sizing: border-box;
      width: var(--control-icon-md);
      height: var(--control-icon-md);
      padding: 0;
      justify-content: center;
      align-items: center;
      text-align: center;
      font: var(--indicator-medium);
      background: var(--priority-pill-index-background-color, var(--priority-pill-text-color, var(--_foreground)));
      color: var(--priority-pill-index-text-color, var(--priority-pill-background-color, var(--_background)));
    }

    > .text {
      padding-right: var(--space-xxs);
    }
  }

  :host .container.contourable-target,
  :host .container > .number {
    border-radius: var(--radius-pill);
  }

  :host([status="urgent"]) {
    --_background: var(--feedback-error-background-strong);
    --_foreground: var(--interactive-destructive-foreground-default);
  }
  :host([status="high"]) {
    --_background: var(--feedback-warning-background-strong);
    --_foreground: var(--foreground-inverse);
  }
  :host([status="medium"]) {
    --_background: var(--feedback-info-background-strong);
    --_foreground: var(--interactive-primary-foreground-default);
  }
  :host([status="low"]) {
    --_background: var(--foreground-secondary);
    --_foreground: var(--foreground-inverse);
  }

  :host([size="small"]) {
    > .container {
      padding: var(--space-2xs) var(--space-sm) var(--space-2xs) var(--space-2xs);
    }

    .number {
      width: var(--control-icon-sm);
      height: var(--control-icon-sm);
    }

    .text {
      font: var(--indicator-small);
      padding-right: var(--space-2xs);
    }
  }

  :host([type="badge"]) > .container {
    gap: 0;
    padding-right: var(--space-xxs);
  }
  :host([type="badge"][size="small"]) > .container {
    padding-right: var(--space-2xs);
  }
`;
