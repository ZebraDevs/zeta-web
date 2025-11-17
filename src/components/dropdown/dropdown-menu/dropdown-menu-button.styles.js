import { css } from "lit";
export default css`
  :host {
    display: block;
    width: fit-content;
  }

  .with-icon {
    padding-right: var(--spacing-small);
  }

  .droppable-item {
    height: var(--spacing-6xl);
    padding-left: var(--spacing-medium);
  }

  .droppable-item:hover {
    background-color: var(--surface-hover);
  }

  .droppable-item:active {
    background-color: var(--surface-selected);
  }

  :host([rounded]) .droppable-item {
    border-radius: var(--radius-minimal);
  }
`;
