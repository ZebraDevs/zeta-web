import { css } from "lit";
export default css`
  :host {
    display: block;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    --_bg: var(--interactive-ghost-background-default);
    --_fg: var(--interactive-neutral-foreground-default);
  }

  .droppable-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    user-select: none;
    height: var(--control-md);
    padding: var(--space-2xs) var(--space-md);
    gap: var(--space-sm);
    background-color: var(--_bg);
    color: var(--_fg);
    --icon-color: var(--_fg);
    font: var(--label-medium);
    white-space: nowrap;
    border-radius: var(--radius-none);
  }

  :host([rounded]) .droppable-item {
    border-radius: var(--radius-sm);
  }

  :host([type="checkbox"]) .droppable-item,
  :host([type="radio"]) .droppable-item {
    padding-inline-start: var(--space-none);
    gap: var(--space-none);
  }

  :host([type="checkbox"]) slot[name="icon"],
  :host([type="radio"]) slot[name="icon"] {
    display: none;
  }

  .label {
    flex: 1;
    padding-inline: var(--space-2xs) var(--space-xl);
  }

  ::slotted(zeta-icon) {
    --icon-size: var(--control-icon-sm);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):not([checked]):hover) {
      --_bg: var(--interactive-ghost-background-hover);
    }
  }

  :host([checked]) {
    --_bg: var(--interactive-ghost-background-selected);
    --_fg: var(--foreground-primary);
  }

  :host(:focus-visible) .droppable-item {
    outline: var(--stroke-thin) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thin));
  }

  :host([disabled]) {
    --_bg: var(--interactive-ghost-background-disabled);
    --_fg: var(--interactive-neutral-foreground-disabled);
  }

  :host([disabled]) .droppable-item,
  :host([disabled]) ::slotted(zeta-icon) {
    color: var(--_fg);
    --icon-color: var(--_fg);
  }
`;
