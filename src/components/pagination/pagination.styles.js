import { css } from "lit";
export default css`
  :host {
    --_pagination-border-width: 0;
  }

  :host([outline]) {
    --_pagination-border-width: var(--stroke-thin);
  }

  .pagination {
    display: inline-flex;
    align-items: center;
    border-radius: inherit;
    gap: var(--space-sm);
    -webkit-tap-highlight-color: transparent;
  }

  .page {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: var(--control-sm);
    min-width: var(--control-sm);
    padding: 0 var(--space-sm);
    font: var(--body-small);
    color: var(--foreground-primary);
    background-color: var(--interactive-neutral-background-default);
    border: var(--_pagination-border-width) solid var(--interactive-neutral-border-default);
    border-radius: var(--contour, var(--radius-none));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

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

    &.selected {
      background-color: var(--interactive-inverse-background-selected);
      border-color: var(--interactive-inverse-border-default);
      color: var(--foreground-inverse);
    }
  }

  zeta-icon.more {
    --icon-color: var(--foreground-primary);
  }
`;
