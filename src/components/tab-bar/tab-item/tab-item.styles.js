import { css } from "lit";
export default css`
  :host {
    width: min-content;
    display: block;
    white-space: nowrap;
  }

  .navigation-item {
    background-color: var(--surface-default);
    color: var(--text-subtle);
    padding: var(--spacing-3) var(--spacing-4);
    font: var(--title-medium);

    &:not([disabled]) {
      &:hover,
      &:active,
      &[active] {
        color: var(--text-default);
      }
    }

    &[disabled] {
      color: var(--text-disabled);
    }
  }
  :host([active]) {
    border-bottom: 2px solid var(--border-flavor-primary);
  }
`;
