import { css } from "lit";
export default css`
  :host {
    margin-left: var(--spacing-6);
  }

  .container {
    display: flex;
    gap: var(--spacing-2-5);
  }

  .border {
    border-left: var(--border-size-small) solid var(--border-subtle);
  }

  .sub-item {
    margin: 0;
    padding: var(--spacing-2) var(--spacing-4);
    font: var(--title-medium);
    display: flex;
    flex: 1;
    color: var(--text-subtle);
  }

  :host([active]:not([disabled])) .sub-item {
    background-color: var(--surface-pressed);
    color: var(--text-default);
  }

  :host(:not([disabled]):hover) .sub-item {
    color: var(--text-default);
  }
`;
