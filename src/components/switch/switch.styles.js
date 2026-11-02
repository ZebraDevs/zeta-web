import { css } from "lit";
export default css`
  :host {
    /* 24px thumb inside 4px padding: 32 x 64 track, 32px of travel */
    --_switch-thumb-size: var(--switch-thumb-size, var(--control-xs));
    --_switch-height: var(--switch-height, calc(var(--_switch-thumb-size) + 2 * var(--space-xxs)));
    /* Derived from height so a custom --switch-height still centres the thumb */
    --_switch-padding: calc((var(--_switch-height) - var(--_switch-thumb-size)) / 2);
    --_switch-width: var(--switch-width, calc(2 * var(--_switch-height)));
    --_switch-icon-size: var(--switch-icon-size, var(--control-icon-md));
    /* Each icon is centred on one of the thumb's two rest positions, so the thumb covers it */
    --_switch-icon-inset: calc(var(--_switch-padding) + (var(--_switch-thumb-size) - var(--_switch-icon-size)) / 2);
    --_switch-motion: 250ms cubic-bezier(0.34, 1.36, 0.64, 1);

    padding: 0;
    border: none;
    display: flex;
    width: fit-content;
    gap: var(--space-sm);
    align-items: center;
  }

  :host,
  div[part="track"] {
    height: var(--_switch-height);
    border-radius: var(--radius-pill) !important;
  }

  div[part="track"] {
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width: var(--_switch-width);
    background-color: var(--switch-track-color, var(--interactive-selection-background-default));
  }

  /* Focus border is drawn inside the track so the footprint does not change */
  div[part="track"]:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  div[part="thumb"] {
    z-index: 1;
    width: var(--_switch-thumb-size);
    height: var(--_switch-thumb-size);
    border-radius: var(--radius-pill);
    position: absolute;
    top: var(--_switch-padding);
    left: var(--_switch-padding);
    background-color: var(--switch-thumb-color, var(--interactive-primary-foreground-default));
  }

  zeta-icon {
    position: absolute;
    color: var(--switch-icon-color, var(--interactive-primary-foreground-default));
    top: calc((var(--_switch-height) - var(--_switch-icon-size)) / 2);
    height: var(--_switch-icon-size);
    width: var(--_switch-icon-size);
    --icon-size: var(--_switch-icon-size);
    &[part="icon active"] {
      left: var(--_switch-icon-inset);
    }
    &[part="icon inactive"] {
      right: var(--_switch-icon-inset);
    }
  }

  :host([checked]) div[part="thumb"] {
    transform: translateX(calc(var(--_switch-width) - var(--_switch-thumb-size) - var(--_switch-padding) * 2));
  }
  :host([checked]) div[part="track"] {
    background-color: var(--switch-track-active-color, var(--interactive-selection-background-pressed));
  }

  :host([disabled]) div[part="thumb"] {
    background-color: var(--switch-thumb-disabled-color, var(--interactive-primary-foreground-disabled));
  }

  :host([disabled]) div[part="track"] {
    background-color: var(--switch-track-disabled-color, var(--interactive-selection-background-disabled));
  }

  :host([disabled]) zeta-icon {
    color: var(--switch-icon-disabled-color, var(--interactive-primary-foreground-disabled));
  }

  /* Track colour changes in step with the thumb; transitions reverse from where they are if toggled mid-way */
  div[part="thumb"] {
    transition: transform var(--_switch-motion);
  }
  div[part="track"] {
    transition: background-color var(--_switch-motion);
  }

  @media (prefers-reduced-motion) {
    :host,
    :host * {
      transition: none !important;
    }
  }
`;
