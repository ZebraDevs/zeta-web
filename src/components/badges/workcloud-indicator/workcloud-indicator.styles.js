import { css } from "lit";
export default css`
  :host([priority="urgent"]) {
    .number {
      background: var(--surface-negative);
    }
    .container {
      background: var(--surface-negative-subtle);
    }
  }

  :host([priority="high"]) {
    .number {
      background: var(--border-warning);
    }
    .container {
      background: var(--surface-warning-subtle);
    }
  }

  :host([priority="medium"]) {
    .number {
      background: var(--surface-primary);
    }
    .container {
      background: var(--surface-primary-subtle);
    }
  }

  :host([priority="low"]) {
    .number {
      background: var(--surface-positive);
    }
    .container {
      background: var(--surface-positive-subtle);
    }
  }

  :host([size="medium"]) {
    .text {
      padding: var(--spacing-0-5) var(--spacing-small) var(--spacing-0-5) var(--spacing-minimum);
    }
    .text,
    .number {
      font: var(--body-small);
      line-height: 1;
    }
    .number {
      width: var(--spacing-2xl);
      height: var(--spacing-2xl);
    }
  }

  :host([size="small"]) {
    .text,
    .number {
      font: var(--body-x-small);
      line-height: 1;
    }
    .number {
      width: var(--spacing-xl);
      height: var(--spacing-xl);
    }
  }

  :host([size="xs"]) {
    .text {
      display: none;
    }
    .number {
      font: var(--body-x-small);
      width: var(--spacing-xl);
      height: var(--spacing-xl);
      color: var(--main-inverse);
    }
  }

  :host {
    line-height: 1;
    .text {
      height: auto;
      text-transform: capitalize;
      padding: 0 var(--spacing-small) 0 var(--spacing-minimum);
    }
  }
`;
