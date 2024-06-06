import { css } from "lit";
export default css`
  .drawer-item {
    padding: var(--spacing-3);
    background: var(--surface-default);
    display: flex;
    gap: var(--spacing-4);
    justify-content: space-between;
    align-items: center;
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

  h1 {
    display: flex;
    font: var(--title-medium);
    margin: 0;
  }

  .leading {
    display: flex;
    gap: inherit;
    align-items: center;
  }

  .trailing {
    display: flex;
    gap: var(--spacing-2);
    align-items: center;
    justify-self: flex-end;
  }
`;
