import { css } from "lit";
export default css`
  :host {
    --priority-pill-index-text-color: var(--state-default-enabled);
    --priority-pill-text-color: var(--main-default);
    width: fit-content;
    height: var(--spacing-3xl);
    display: inline-block;
  }

  .container {
    display: flex;
    display: inline-flex;
    align-items: center;
    background: var(--priority-pill-background-color, var(--surface-primary-subtle));
    white-space: nowrap;
    line-height: var(--spacing-xl);
    font: var(--body-small);
    color: var(--priority-pill-text-color, var(--main-default));

    > .number {
      display: flex;
      width: var(--spacing-3xl);
      height: var(--spacing-3xl);
      padding: 0;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: var(--priority-pill-index-background-color, var(--main-primary));
      color: var(--priority-pill-index-text-color, var(--state-default-enabled));
    }

    > .text {
      padding: var(--spacing-minimum) var(--spacing-small);
    }
  }

  :host([rounded]) > .container,
  :host([rounded]) > .container > .number {
    border-radius: var(--radius-full);
  }

  :host([status="urgent"]) {
    --priority-pill-index-background-color: var(--main-negative);
    --priority-pill-background-color: var(--surface-negative-subtle);
  }
  :host([status="high"]) {
    --priority-pill-index-background-color: var(--main-warning);
    --priority-pill-background-color: var(--surface-warning-subtle);
  }
  :host([status="medium"]) {
    --priority-pill-index-background-color: var(--main-primary);
    --priority-pill-background-color: var(--surface-primary-subtle);
  }
  :host([status="low"]) {
    --priority-pill-index-background-color: var(--main-positive);
    --priority-pill-background-color: var(--surface-positive-subtle);
  }
  :host([size="small"]) {
    height: var(--spacing-xl);

    .number {
      font: var(--medium) 10px/14px var(--type-family-regular);
      width: var(--spacing-xl);
      height: var(--spacing-xl);
    }

    .text {
      font: var(--regular) 10px/13px var(--type-family-regular);
    }
  }
`;
