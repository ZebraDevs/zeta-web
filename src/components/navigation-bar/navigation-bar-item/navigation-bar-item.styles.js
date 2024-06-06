import { css } from "lit";
export default css`
  :host {
    display: flex;
    flex: 1;
    width: min-content;
    justify-content: center;
    cursor: pointer;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    align-items: center;
  }

  .nav-item[label] {
    padding: var(--spacing-2) var(--spacing-6);
  }

  .nav-item:not([label]) {
    padding: var(--spacing-5) var(--spacing-6);
  }

  .label {
    color: var(--text-subtle);
    font: var(--label-small);
    user-select: none;
  }

  :host([active]) .label {
    color: var(--text-flavor-primary);
  }

  .icon-container {
    position: relative;
  }

  .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    border: var(--border-size-medium) solid var(--surface-default);
    border-radius: var(--radius-full);
  }
`;
