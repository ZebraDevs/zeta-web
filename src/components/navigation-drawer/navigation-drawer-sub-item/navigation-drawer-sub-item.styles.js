import { css } from "lit";
export default css`
  .container {
    display: flex;
    gap: var(--spacing-2-5);
  }

  :host {
    margin-left: var(--spacing-6);
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

    &:not([disabled]) {
      &[active] {
        background-color: var(--surface-pressed);
      }

      &[active],
      &:hover {
        color: var(--text-default);
      }
    }
  }
`;
