import { css } from "lit";
export default css`
  :host {
    width: min-content;
    display: block;
    white-space: nowrap;
  }

  .navigation-item {
    background-color: var(--surface-default-inverse) !important;
    color: var(--color-cool-50);
    padding: var(--spacing-3) var(--spacing-4);
    font: var(--title-medium);

    &:not([disabled]) {
      &:hover,
      &:active,
      &[active] {
        color: var(--text-inverse);
      }
    }

    &[disabled] {
      color: var(--color-cool-60) !important;
    }
  }
`;
