import { css } from "lit";
export default css`
  :host .container {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
    height: fit-content;
  }

  .cancel-icon {
    cursor: pointer;

    &.cancel-icon-textarea {
      align-self: flex-start;
    }

    &:focus-visible {
      outline: var(--stroke-thick) solid var(--border-focus);
    }
  }

  .left,
  .right {
    --icon-size: var(--control-icon-md);
  }

  :host([size="small"]) .left,
  :host([size="small"]) .right {
    --icon-size: var(--control-icon-sm);
  }

  :host * {
    border: none;
    outline: none;
  }

  .input-container zeta-icon {
    --icon-color: var(--foreground-primary);
  }

  /* DEFAULT */
  .input-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    /* height comes from padding: content (icon / line-height) + padding + border */
    padding: calc(var(--space-sm) - var(--stroke-thin)) var(--space-md);
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);
    border-radius: var(--radius-sm);
    background: var(--interactive-neutral-background-default);
    -webkit-tap-highlight-color: transparent;
  }

  .input-container.text-area {
    padding: var(--space-sm) var(--space-md);
  }

  .input-container input,
  .input-container textarea {
    background-color: transparent;
    caret-color: var(--foreground-cursor);
    color: var(--foreground-primary);
    flex: 1;
    padding: 0 var(--space-2xs);
    margin: 0;
    font: var(--body-medium);
    min-height: var(--control-icon-md);
    width: 100%;
  }

  .input-container textarea::placeholder,
  .input-container input::placeholder {
    color: var(--foreground-disabled);
  }

  /* SIZE */
  :host([size="large"]) .input-container:not(.text-area) {
    padding-block: calc(var(--space-md) - var(--stroke-thin));
  }

  :host([size="small"]) .input-container:not(.text-area) {
    /* 18 line-height + 2 * 8 padding + 2 * 1 border = control-sm (36) */
    padding-block: var(--space-sm);
  }

  :host([size="small"]) input {
    min-height: var(--control-icon-sm);
  }

  :host([size="small"]) input,
  :host([size="small"]) textarea,
  :host([size="small"]) .affix {
    font: var(--body-small);
  }

  /* SHAPE: rounded boolean (legacy) first, so shape wins when both are set */
  :host(:not([rounded])) .input-container,
  :host([shape="sharp"]) .input-container {
    border-radius: var(--radius-none);
  }

  :host([shape="rounded"]) .input-container {
    border-radius: var(--radius-sm);
  }

  :host([shape="full"]) .input-container {
    border-radius: var(--radius-pill);
  }

  /* FLAVOR */
  :host([flavor="gradient"]) .input-container {
    border-color: transparent;
    background:
      linear-gradient(var(--interactive-neutral-background-default) 0 0) padding-box,
      linear-gradient(90deg, var(--foreground-gradient-start) 0%, var(--foreground-gradient-end) 100%) border-box;
  }

  :host([flavor="ghost"]) .input-container {
    background: transparent;
    border-color: var(--interactive-ghost-border-default);
    border-width: var(--stroke-base);
  }

  /* HOVER */
  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):not([readonly]):not([error])) .input-container:hover {
      border-color: var(--interactive-neutral-border-hover);
    }

    :host([flavor="gradient"]:not([disabled]):not([readonly]):not([error])) .input-container:hover {
      border-color: var(--border-gradient-end);
    }
  }

  /* FOCUS: drawn inside the border box so the footprint does not change */
  .input-container:has(input:focus, textarea:focus) {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  /* READ-ONLY */
  :host([readonly]) .input-container {
    border-color: var(--border-subtle);
  }

  /* ERROR */
  :host([error]:not([disabled])) .input-container {
    border-color: var(--border-error);
  }

  :host([error]:not([disabled])) .hint-text {
    color: var(--foreground-error);
    --icon-color: var(--foreground-error);
  }

  /* DISABLED */
  :host([disabled]) .input-container {
    pointer-events: none;
    background: var(--interactive-neutral-background-disabled);
    border-color: var(--interactive-neutral-border-disabled);
  }

  :host([disabled]) zeta-icon {
    --icon-color: var(--foreground-disabled);
  }

  :host([disabled]) input,
  :host([disabled]) textarea,
  :host([disabled]) .affix,
  :host([disabled]) .label,
  :host([disabled]) .hint-text span {
    color: var(--foreground-disabled);
  }
  :host([disabled]) input::placeholder,
  :host([disabled]) textarea::placeholder {
    color: inherit;
  }

  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="time"]::-webkit-calendar-picker-indicator {
    display: none !important;
    /* TODO: Firefox default date icon appears. */
  }

  .affix {
    color: var(--foreground-secondary);
  }

  .label {
    font: var(--label-medium);
    color: var(--foreground-primary);
  }

  .label.required::after {
    content: " *";
    color: var(--foreground-error);
  }

  .hint-text {
    display: flex;
    align-items: center;
    column-gap: var(--space-2xs);
    font: var(--body-xsmall);
    color: var(--foreground-secondary);
    --icon-color: var(--foreground-secondary);
    --icon-size: var(--control-icon-sm);
  }

  textarea {
    resize: none;
    width: 100%;
  }

  /* INTEGER MODE */
  :host([type="integer"]) .container:not(:hover) .arrows-container {
    display: none;
  }

  :host([type="integer"]) .input-container .arrows-container {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    width: 16px;
    height: 24px;
    background-color: var(--interactive-neutral-background-default);
  }

  :host([type="integer"]) .input-container .arrows-container .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50%;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
  }

  :host([type="integer"]) .input-container .arrows-container .arrow svg {
    fill: var(--foreground-secondary);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([type="integer"]) .input-container .arrows-container .arrow:hover svg {
      fill: var(--foreground-primary);
    }
  }

  :host([type="integer"]) .input-container .arrows-container .arrow:active {
    transform: scale(0.75);
  }
`;
