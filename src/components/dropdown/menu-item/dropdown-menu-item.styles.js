import { css } from "lit";
export default css`
  .droppable-item {
    background-color: var(--surface-default);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    user-select: none;
    gap: var(--spacing-small);
  }

  /* Size Variants */
  :host([size="small"]) .droppable-item {
    font: var(--label-small);
    padding: var(--spacing-small);
    gap: var(--spacing-minimum);
  }
  :host([size="small"]) ::slotted([slot="icon"]) {
    --icon-size: var(--spacing-large);
  }

  :host([size="medium"]) .droppable-item {
    font: var(--body-medium);
    padding: var(--spacing-small) var(--spacing-medium);
    gap: var(--spacing-small);
  }
  :host([size="medium"]) ::slotted([slot="icon"]) {
    --icon-size: var(--spacing-xl);
  }

  :host([size="large"]) .droppable-item {
    font: var(--body-medium);
    padding: var(--spacing-medium) var(--spacing-large);
    gap: var(--spacing-small);
  }
  :host([size="large"]) ::slotted([slot="icon"]) {
    --icon-size: var(--spacing-xl);
  }

  .droppable-item:hover {
    background-color: var(--surface-hover);
  }

  .droppable-item:active {
    background-color: var(--surface-selected);
  }

  :host([disabled]) .droppable-item {
    background-color: var(--surface-disabled);
    color: var(--main-disabled);
  }

  :host ::slotted(zeta-icon) {
    --icon-color: var(--main-subtle);
  }
  :host([disabled]) ::slotted(zeta-icon) {
    --icon-color: var(--main-disabled);
  }

  ::slotted(zeta-icon) {
    --icon-size: 20px;
  }
`;
