import { css } from "lit";
export default css`
  :host {
    display: block;
    width: fit-content;
    -webkit-tap-highlight-color: transparent;
  }

  .droppable-item {
    height: var(--spacing-6xl);
    padding: 0 var(--spacing-medium);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .droppable-item:hover {
      background-color: var(--surface-hover);
    }
  }

  .droppable-item:active {
    background-color: var(--surface-selected);
  }

  :host([rounded]) .droppable-item {
    border-radius: var(--radius-minimal);
  }
`;
