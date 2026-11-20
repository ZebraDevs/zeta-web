import { css } from "lit";
export default css`
  :host {
    display: inline-block;
  }

  .pagination {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    -webkit-tap-highlight-color: transparent;
  }

  /* Every control, page number and overflow marker is the same square */
  .control,
  .page,
  .more-control {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    block-size: var(--control-sm);
    min-inline-size: var(--control-sm);
    margin: 0;
    padding: var(--space-sm);
    font: var(--body-small);
    color: var(--foreground-primary);
    background-color: var(--interactive-neutral-background-default);
    border: var(--stroke-base) solid var(--interactive-neutral-border-default);
    border-radius: var(--contour, var(--radius-none));
    -webkit-tap-highlight-color: transparent;
  }

  :host([outline]) .control,
  :host([outline]) .page,
  :host([outline]) .more-control {
    border-width: var(--stroke-thin);
  }

  .control,
  .page {
    cursor: pointer;
  }

  .control zeta-icon,
  .more-control zeta-icon {
    --icon-size: var(--control-icon-sm);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .control:hover:not(:disabled),
    .page:hover:not(.selected) {
      background-color: var(--interactive-neutral-background-hover);
    }

    :host([outline]) .control:hover:not(:disabled),
    :host([outline]) .page:hover:not(.selected) {
      border-color: var(--interactive-neutral-border-hover);
    }
  }

  .control:active:not(:disabled),
  .page:active:not(.selected) {
    background-color: var(--interactive-neutral-background-pressed);
    border-color: var(--interactive-neutral-border-pressed);
  }

  .control:focus-visible,
  .page:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(var(--stroke-thick) * -1);
  }

  .control:disabled {
    cursor: default;
    color: var(--foreground-disabled);
    background-color: var(--interactive-neutral-background-disabled);
    border-color: var(--interactive-neutral-border-disabled);
  }

  .page.selected {
    color: var(--foreground-inverse);
    background-color: var(--interactive-inverse-background-selected);
    border-color: var(--interactive-inverse-border-default);
  }
`;
