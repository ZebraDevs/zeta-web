import { css } from "lit";

export default css`
  /*
   * default, action and standard are a dark overlay surface in Figma on every page theme. Pinning color-scheme: dark
   * makes the light-dark() tokens resolve to their dark values here. Feedback statuses reset it below.
   */
  :host {
    color-scheme: dark;
    --_snackbar-background-color: var(--fill-overlay);
    --_snackbar-foreground-color: var(--foreground-primary);
    --_snackbar-icon-color: var(--foreground-primary);
    --_snackbar-action-background-color: var(--interactive-ghost-background-default);
    --_snackbar-action-border-color: var(--border-transparent);
    --_snackbar-action-border-width: var(--stroke-base);
    --_snackbar-action-font: var(--label-large);
    --_snackbar-action-radius: var(--radius-pill);
    --_snackbar-action-size: var(--control-sm);
    --_snackbar-close-radius: var(--radius-pill);
    --_snackbar-controls-gap: var(--space-2xs);
    --_snackbar-inline-size: calc(var(--scale-21) + var(--space-xl) + var(--space-xs));
    --_snackbar-root-radius: var(--radius-pill);
    --_snackbar-shadow-color: var(--shadow-soft);

    display: block;
    position: fixed;
    inset-block-end: var(--space-xl);
    inset-inline-start: 50%;
    inline-size: min(var(--_snackbar-inline-size), 90vw);
    max-inline-size: 90vw;
    transform: translateX(-50%);
    color: var(--snackbar-foreground-color, var(--_snackbar-foreground-color));
    font: var(--body-medium);
  }

  :host([status="info"]) {
    color-scheme: inherit;
    --_snackbar-background-color: var(--feedback-info-background-subtle);
    --_snackbar-foreground-color: var(--foreground-primary);
    --_snackbar-icon-color: var(--foreground-primary);
    --_snackbar-inline-size: calc(var(--scale-21) + var(--scale-17) + var(--space-md) + var(--stroke-thin));
  }

  :host([status="positive"]) {
    color-scheme: inherit;
    --_snackbar-background-color: var(--feedback-success-background-subtle);
    --_snackbar-foreground-color: var(--foreground-primary);
    --_snackbar-icon-color: var(--foreground-primary);
    --_snackbar-inline-size: calc(var(--scale-21) + var(--scale-17) + var(--space-md) + var(--stroke-thin));
  }

  :host([status="warning"]) {
    color-scheme: inherit;
    --_snackbar-background-color: var(--feedback-warning-background-subtle);
    --_snackbar-foreground-color: var(--foreground-primary);
    --_snackbar-icon-color: var(--foreground-primary);
    --_snackbar-inline-size: calc(var(--scale-21) + var(--scale-17) + var(--space-md) + var(--stroke-thin));
  }

  :host([status="negative"]) {
    color-scheme: inherit;
    --_snackbar-background-color: var(--feedback-error-background-subtle);
    --_snackbar-foreground-color: var(--foreground-primary);
    --_snackbar-icon-color: var(--foreground-primary);
    --_snackbar-inline-size: calc(var(--scale-21) + var(--scale-17) + var(--space-md) + var(--stroke-thin));
  }

  :host([status="deletion"]) {
    color-scheme: inherit;
    --_snackbar-background-color: var(--feedback-error-background-subtle);
    --_snackbar-foreground-color: var(--foreground-primary);
    --_snackbar-icon-color: var(--foreground-primary);
    --_snackbar-inline-size: calc(var(--scale-container-0) + var(--scale-17) + var(--space-lg) + var(--stroke-thick) + var(--stroke-thin));
  }

  :host([status="view"]) {
    color-scheme: inherit;
    --_snackbar-background-color: var(--feedback-neutral-background-subtle);
    --_snackbar-foreground-color: var(--foreground-primary);
    --_snackbar-icon-color: var(--foreground-primary);
    --_snackbar-inline-size: calc(var(--scale-21) + var(--scale-18) + var(--space-lg) + var(--stroke-thick) + var(--stroke-thin));
  }

  :host([status="action"]) {
    --_snackbar-action-border-color: var(--interactive-neutral-border-default);
    --_snackbar-action-border-width: var(--stroke-thin);
    --_snackbar-action-font: var(--label-medium);
    --_snackbar-action-size: var(--control-xs);
    --_snackbar-controls-gap: var(--space-lg);
    --_snackbar-inline-size: calc(var(--scale-21) + var(--scale-17) + var(--scale-8) + var(--stroke-thick));
  }

  :host([variant="standard"]) {
    --_snackbar-action-background-color: var(--interactive-inverse-background-default);
    --_snackbar-action-border-color: var(--interactive-inverse-border-default);
    --_snackbar-action-radius: var(--radius-element-sm);
    --_snackbar-close-radius: var(--radius-element-sm);
    --_snackbar-inline-size: calc(var(--scale-container-0) + var(--space-2xl) + var(--scale-8));
    --_snackbar-root-radius: var(--radius-md);
  }

  :host([variant="standard"][shape="full"]) {
    --_snackbar-root-radius: var(--radius-pill);
  }

  :host([shape="sharp"]) {
    --_snackbar-action-radius: var(--radius-none);
    --_snackbar-close-radius: var(--radius-none);
    --_snackbar-root-radius: var(--radius-none);
  }

  /* ":host .snackbar-root" matches the specificity of the ContourableThree mixin rule and comes later, so the preset radius wins. */
  :host .snackbar-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    min-block-size: var(--control-lg);
    inline-size: 100%;
    padding-block: var(--space-2xs);
    padding-inline: var(--space-lg) var(--space-2xs);
    gap: var(--space-lg);
    overflow: hidden;
    color: var(--snackbar-foreground-color, var(--_snackbar-foreground-color));
    background: var(--snackbar-background-color, var(--_snackbar-background-color));
    border-radius: var(--_snackbar-root-radius);
    box-shadow:
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--_snackbar-shadow-color),
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--_snackbar-shadow-color);
    animation: snackbar-enter 300ms ease-out;
  }

  .content,
  .controls,
  .leading-icon {
    display: flex;
    align-items: center;
  }

  .content {
    flex: 1 1 auto;
    min-inline-size: 0;
    gap: var(--space-md);
    padding-block: var(--space-sm);
  }

  .controls {
    flex: 0 0 auto;
    gap: var(--_snackbar-controls-gap);
  }

  .message {
    overflow: visible;
    color: var(--snackbar-foreground-color, var(--_snackbar-foreground-color));
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .leading-icon {
    flex: 0 0 auto;
    inline-size: var(--control-icon-sm);
    block-size: var(--control-icon-sm);
    color: var(--snackbar-icon-color, var(--_snackbar-icon-color));
    --icon-color: var(--snackbar-icon-color, var(--_snackbar-icon-color));
    --icon-size: var(--control-icon-sm);
  }

  .leading-icon[hidden],
  slot[hidden] {
    display: none;
  }

  ::slotted([slot="icon"]),
  #closeIcon {
    --icon-color: var(--snackbar-icon-color, var(--_snackbar-icon-color));
  }

  #closeButton {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: var(--control-md);
    block-size: var(--control-md);
    min-inline-size: var(--control-md);
    padding: var(--space-2xs);
    color: var(--snackbar-foreground-color, var(--_snackbar-foreground-color));
    background: var(--interactive-ghost-background-default);
    border: var(--stroke-base) solid var(--border-transparent);
    border-radius: var(--_snackbar-close-radius);
    cursor: pointer;
  }

  #action {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-block-size: var(--_snackbar-action-size);
    padding-block: var(--space-2xs);
    padding-inline: var(--space-md);
    color: var(--snackbar-foreground-color, var(--_snackbar-foreground-color));
    font: var(--_snackbar-action-font);
    white-space: nowrap;
    background: var(--snackbar-action-background-color, var(--_snackbar-action-background-color));
    border: var(--_snackbar-action-border-width) solid var(--snackbar-action-border-color, var(--_snackbar-action-border-color));
    border-radius: var(--_snackbar-action-radius);
    cursor: pointer;
  }

  #action:focus-visible,
  #closeButton:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thin);
  }

  @media (prefers-reduced-motion: reduce) {
    .snackbar-root {
      animation-duration: 150ms;
      animation-name: snackbar-fade-in;
    }
  }

  @keyframes snackbar-enter {
    from {
      opacity: 0;
      transform: translateY(var(--space-xl));
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes snackbar-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
