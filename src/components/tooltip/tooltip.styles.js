import { css } from "lit";
export default css`
  :host {
    display: inline-block;
    /* Distance the bubble slides toward its trigger as it appears. Direction is set per point below. */
    --_tooltip-slide: var(--space-2xs);
    --_tooltip-from: 0 calc(-1 * var(--_tooltip-slide));
    --_tooltip-radius: var(--radius-sm);
    transition:
      opacity var(--animations-smooth),
      translate var(--animations-smooth),
      display var(--animations-smooth) allow-discrete,
      overlay var(--animations-smooth) allow-discrete;

    @starting-style {
      opacity: 0;
      translate: var(--_tooltip-from);
    }
  }

  :host([hidden]) {
    display: none;
  }

  :host(:not([rounded])),
  :host([rounded="false"]) {
    --_tooltip-radius: var(--radius-none);
  }

  /* Bubble sits below its trigger, so it slides up. */
  :host([point="top"]) {
    --_tooltip-from: 0 var(--_tooltip-slide);
  }

  /* Bubble sits right of its trigger, so it slides left. */
  :host([point="left"]) {
    --_tooltip-from: var(--_tooltip-slide) 0;
  }

  /* Bubble sits left of its trigger, so it slides right. */
  :host([point="right"]) {
    --_tooltip-from: calc(-1 * var(--_tooltip-slide)) 0;
  }

  /* Used as a popover: drop the UA popover box so only the bubble shows. Position with inline left/top or anchor positioning. */
  :host([popover]) {
    inset: auto;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    overflow: visible;
  }

  /* Closed popover. display: none must be restated because :host display beats the UA popover rule. Exit state: fades out (and slides back) when the popover closes. */
  :host([popover]:not(:popover-open)) {
    display: none;
    opacity: 0;
    translate: var(--_tooltip-from);
  }

  @media (prefers-reduced-motion: reduce) {
    :host {
      transition: none;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    background: var(--surface-inverse);
    color: var(--foreground-inverse);
    padding: var(--space-2xs) var(--space-sm);
    border-radius: var(--_tooltip-radius);
    position: relative;
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }

  slot {
    display: flex;
    justify-content: center;
    align-items: center;
    font: var(--label-small);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-inverse);
    --icon-color: var(--foreground-inverse);
    --icon-size: var(--label-small-line-height);
  }

  .point {
    fill: var(--surface-inverse);
    position: absolute;

    path {
      fill: inherit;
    }
  }

  :host([point="bottom"]) .point {
    bottom: calc(-1 * var(--space-2xs));
  }

  /* The 8x4 pointer is rotated about its centre, so it is offset by 1.5x its height to sit flush on the side edges. */
  :host([point="right"]) .point {
    transform: rotate(-90deg);
    right: calc(-1.5 * var(--space-2xs));
  }

  :host([point="left"]) .point {
    transform: rotate(90deg);
    left: calc(-1.5 * var(--space-2xs));
  }

  :host([point="top"]) .point {
    transform: rotate(180deg);
    top: calc(-1 * var(--space-2xs));
  }
`;
