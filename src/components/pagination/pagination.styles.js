import { css } from "lit";
export default css`
  .pagination {
    display: inline-flex;
    align-items: center;
    border-radius: inherit;
    gap: var(--spacing-2);
  }

  button {
    border-radius: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .pagination-control {
    cursor: pointer;
    padding: var(--spacing-1-5);

    &:disabled {
      pointer-events: none;
      background-color: var(--surface-disabled);
    }

    &:hover {
      background-color: var(--color-cool-20);
    }

    &:active {
      background-color: var(--color-cool-30);
    }

    &:focus {
      border: none;
      outline: none;
      box-shadow: 0 0 0 var(--border-size-medium) var(--border-flavor-primary);
    }
  }

  .page {
    text-align: center;
    padding: var(--spacing-1-5) var(--spacing-1);
    font: var(--body-small);
    width: var(--spacing-8);
    color: var(--text-default);

    &:hover {
      background-color: var(--color-cool-20);
    }

    &:active {
      background-color: var(--color-cool-30);
    }

    &:focus {
      border: none;
      outline: none;
      box-shadow: 0 0 0 var(--border-size-medium) var(--border-flavor-primary);
    }

    &.selected {
      color: var(--color-cool-20);
      background-color: var(--color-cool-90);
    }
  }
`;
