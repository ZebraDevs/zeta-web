import { css } from "lit";
export default css`
  .pagination {
    display: inline-flex;
    align-items: center;
    border-radius: inherit;
    gap: var(--spacing-small);
    -webkit-tap-highlight-color: transparent;
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
    padding: var(--spacing-small) var(--spacing-minimum);

    &:disabled {
      pointer-events: none;
      background-color: var(--surface-disabled);
    }

    &:hover {
      background-color: var(--state-default-hover);
    }

    &:active {
      background-color: var(--state-default-selected);
    }

    &:focus-visible {
      border: none;
      outline: none;
      box-shadow: 0 0 0 var(--border-size-medium) var(--border-primary);
    }
  }

  .page {
    text-align: center;
    padding: var(--spacing-small) var(--spacing-minimum);
    font: var(--body-small);
    width: var(--spacing-4xl);
    color: var(--main-default);
    -webkit-tap-highlight-color: transparent;

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--state-default-hover);
      }
    }

    &:active {
      background-color: var(--state-default-selected);
    }

    &:focus-visible {
      border: none;
      outline: none;
      box-shadow: 0 0 0 var(--border-size-medium) var(--border-primary);
    }

    &.selected {
      color: var(--main-inverse);
      background-color: var(--state-inverse-selected);
    }
  }
  zeta-icon.more {
    --icon-color: var(--main-default);
    --icon-size: 20px;
  }
`;
