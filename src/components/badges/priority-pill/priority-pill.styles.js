import { css } from "lit";
export default css`
  :host {
    --priority-pill-index-text-color: var(--foreground-inverse);
    --priority-pill-text-color: var(--foreground-primary);
    width: fit-content;
    height: calc(var(--space-xl) + var(--space-xs));
    display: inline-block;
  }

  .container {
    display: flex;
    display: inline-flex;
    align-items: center;
    background: var(--priority-pill-background-color, var(--surface-card));
    white-space: nowrap;
    line-height: var(--space-lg);
    font: var(--body-small);
    color: var(--priority-pill-text-color, var(--foreground-primary));

    > .number {
      display: flex;
      width: calc(var(--space-xl) + var(--space-xs));
      height: calc(var(--space-xl) + var(--space-xs));
      padding: 0;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: var(--priority-pill-index-background-color, var(--interactive-ghost-foreground-default));
      color: var(--priority-pill-index-text-color, var(--foreground-primary));
    }

    > .text {
      padding: calc(var(--space-xs) - var(--stroke-thin)) var(--space-sm);
    }
  }

  :host([rounded]) > .container,
  :host([rounded]) > .container > .number {
    border-radius: var(--radius-pill);
  }

  :host([status="urgent"]) {
    --priority-pill-index-background-color: var(--foreground-error);
    --priority-pill-background-color: var(--surface-error);
  }
  :host([status="high"]) {
    --priority-pill-index-background-color: var(--foreground-warning);
    --priority-pill-background-color: var(--surface-warning);
  }
  :host([status="medium"]) {
    --priority-pill-index-background-color: var(--interactive-ghost-foreground-default);
    --priority-pill-background-color: var(--surface-card);
  }
  :host([status="low"]) {
    --priority-pill-index-background-color: var(--foreground-success);
    --priority-pill-background-color: var(--surface-success);
  }
  :host([size="small"]) {
    height: var(--space-lg);
    > .container {
      display: flex;
    }

    .number {
      font: var(--medium) 10px/14px var(--type-family-regular);
      width: var(--space-lg);
      height: var(--space-lg);
    }

    .text {
      font: var(--regular) 10px/13px var(--type-family-regular);
    }
  }
`;
