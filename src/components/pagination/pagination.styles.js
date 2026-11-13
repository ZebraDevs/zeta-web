import { css } from "lit";
export default css`
  :host {
    --_pagination-border-width: 0;
    --_pagination-radius: var(--radius-none);
  }

  :host([outline]) {
    --_pagination-border-width: var(--stroke-thin);
  }

  :host([rounded]:not([rounded="false"])) {
    --_pagination-radius: var(--radius-sm);
  }

  .pagination {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .page,
  .control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: var(--control-sm);
    min-width: var(--control-sm);
    margin: 0;
    padding: 0 var(--space-sm);
    font: var(--body-small);
    color: var(--foreground-primary);
    --icon-color: var(--foreground-primary);
    background-color: var(--interactive-neutral-background-default);
    border: var(--_pagination-border-width) solid var(--interactive-neutral-border-default);
    border-radius: var(--_pagination-radius);
    -webkit-tap-highlight-color: transparent;
  }

  button {
    cursor: pointer;

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-neutral-background-hover);
        border-color: var(--interactive-neutral-border-hover);
      }
    }

    &:active {
      background-color: var(--interactive-neutral-background-pressed);
      border-color: var(--interactive-neutral-border-pressed);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--stroke-thick) var(--border-focus);
    }

    &:disabled {
      cursor: default;
      color: var(--foreground-disabled);
      --icon-color: var(--foreground-disabled);
      background-color: var(--interactive-neutral-background-disabled);
      border-color: var(--interactive-neutral-border-disabled);
    }

    &.selected {
      background-color: var(--interactive-inverse-background-selected);
      border-color: var(--interactive-inverse-border-default);
      color: var(--foreground-inverse);
    }
  }
`;
