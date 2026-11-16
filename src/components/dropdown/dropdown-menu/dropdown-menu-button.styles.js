import { css } from "lit";
export default css`
  :host {
    display: block;
    width: fit-content;
    -webkit-tap-highlight-color: transparent;
  }

  /* checkbox / radio rows */
  .droppable-item {
    box-sizing: border-box;
    height: var(--control-md);
    padding: var(--space-2xs) var(--space-md) var(--space-2xs) var(--space-none);
    background-color: var(--interactive-ghost-background-default);
    border-radius: var(--radius-none);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .droppable-item:not([disabled]):not([checked]):hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  .droppable-item[checked] {
    background-color: var(--interactive-ghost-background-selected);
  }

  :host([rounded]) .droppable-item {
    border-radius: var(--radius-sm);
  }
`;
