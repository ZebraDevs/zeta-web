import { css } from "lit";
export default css`
  :host {
    /* Handle box is sized for the larger (hover/drag) thumb so growing never moves its centre. */
    --handle-size: var(--control-icon-md);
    --track-height: var(--space-2xs);
    --_thumb-size: var(--control-icon-sm);
    --_slider-foreground: var(--interactive-neutral-foreground-default);
  }

  .slider {
    height: var(--handle-size);
    margin: 0 calc(var(--handle-size) / 2);
    display: flex;
    align-items: center;
    position: relative;
  }

  /* SELECTED: a thumb is pressed or has keyboard focus */
  :host(:not([disabled])) .slider.selected,
  :host(:not([disabled])) .slider:has(.handle:focus-visible) {
    --_slider-foreground: var(--interactive-ghost-foreground-default);
  }

  .track {
    background-color: var(--surface-track);
    height: var(--track-height);
    width: 100%;
    border-radius: var(--radius-none);
  }

  :host([rounded]) .track {
    border-radius: var(--radius-xs);
  }

  .handle {
    box-sizing: border-box;
    background-color: var(--_slider-foreground);
    background-clip: content-box;
    width: var(--handle-size);
    height: var(--handle-size);
    padding: calc((var(--handle-size) - var(--_thumb-size)) / 2);
    border-radius: var(--radius-none);
    cursor: pointer;
    position: absolute;
    z-index: 5;
    outline: none;
  }

  .handle:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  :host([rounded]) .handle {
    border-radius: var(--radius-pill);
  }

  /* HOVER / DRAG: only the thumb under the pointer grows */
  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .handle:hover {
      padding: 0;
    }
  }

  :host(:not([disabled])) .handle.dragging {
    padding: 0;
  }

  /* DISABLED */
  :host([disabled]) {
    --_slider-foreground: var(--interactive-neutral-foreground-disabled);

    .handle {
      cursor: not-allowed;
    }
  }

  .selected-area {
    background-color: var(--_slider-foreground);
    height: var(--track-height);
    border-radius: var(--radius-none);
    position: absolute;
    z-index: 1;
    left: 0;
  }

  /* Step dots sit above both track layers and below the thumb, inset space-3xs from each end. */
  .step-container {
    left: 0;
    right: 0;
    height: var(--track-height);
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 2;
    margin-left: var(--space-3xs);
    margin-right: calc(var(--space-3xs) * 2);
  }

  .step {
    width: var(--space-3xs);
    height: var(--space-3xs);
    background-color: var(--foreground-inverse);
    border-radius: var(--radius-pill);
    position: absolute;
  }
`;
