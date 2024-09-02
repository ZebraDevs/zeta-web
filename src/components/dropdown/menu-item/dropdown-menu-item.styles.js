import { css } from "lit";
export default css`
  .header {
    display: flex;
    flex: 1;
  }

  .leading {
    display: flex;
  }

  .droppable-item {
    background-color: var(--surface-default);
    padding: var(--spacing-small) var(--spacing-medium);
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
    user-select: none;
    font: var(--body-medium);
  }

  .droppable-item:hover {
    background-color: var(--surface-hover);
  }

  .droppable-item:active {
    background-color: var(--surface-pressed);
  }

  :host([disabled]) .droppable-item {
    background-color: var(--surface-disabled);
    color: var(--text-disabled);
  }

  :host ::slotted(zeta-icon) {
    --icon-color: var(--icon-subtle);
  }
  :host([disabled]) ::slotted(zeta-icon) {
    --icon-color: var(--icon-disabled);
  }

  ::slotted(zeta-icon) {
    --icon-size: 20px;
  }
`;
