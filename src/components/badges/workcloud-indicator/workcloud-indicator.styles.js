import { css } from "lit";
export default css`
  :host([priority="urgent"]) {
    .number {
      background: var(--surface-flavor-negative);
    }
    .container {
      background: var(--surface-flavor-negative-subtle);
    }
  }

  :host([priority="high"]) {
    .number {
      background: var(--border-flavor-warning);
    }
    .container {
      background: var(--surface-flavor-warning-subtle);
    }
  }

  :host([priority="medium"]) {
    .number {
      background: var(--surface-flavor-primary);
    }
    .container {
      background: var(--surface-flavor-primary-subtle);
    }
  }

  :host([priority="low"]) {
    .number {
      background: var(--surface-flavor-positive);
    }
    .container {
      background: var(--surface-flavor-positive-subtle);
    }
  }

  :host([size="medium"]) {
    .text {
      padding: var(--spacing-0-5) var(--spacing-2) var(--spacing-0-5) var(--spacing-1);
    }
    .text,
    .number {
      font: var(--body-small);
      line-height: 1;
    }
    .number {
      width: var(--spacing-6);
      height: var(--spacing-6);
    }
  }

  :host([size="small"]) {
    .text,
    .number {
      font: var(--body-x-small);
      line-height: 1;
    }
    .number {
      width: var(--spacing-5);
      height: var(--spacing-5);
    }
  }

  :host([size="xs"]) {
    .text {
      display: none;
    }
    .number {
      font: var(--body-x-small);
      width: var(--spacing-5);
      height: var(--spacing-5);
      color: var(--text-inverse);
    }
  }

  :host {
    line-height: 1;
    .text {
      height: auto;
      text-transform: capitalize;
      padding: 0 var(--spacing-2) 0 var(--spacing-1);
    }
  }
`;
