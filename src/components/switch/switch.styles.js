import { css } from "lit";
export default css`
  :host {
    --_switch-width: var(--switch-width, var(--spacing-9xl));
    --_switch-height: var(--switch-height, var(--spacing-4xl));
    --_switch-thumb-size: var(--switch-thumb-size, var(--spacing-2xl));
    --_switch-icon-size: var(--switch-icon-size, var(--_switch-thumb-size));
    --_switch-padding: calc((var(--_switch-height) - var(--_switch-thumb-size)) / 2);
    --_switch-icon-padding: calc((var(--_switch-height) - var(--_switch-icon-size)) / 2);
    --_switch-track-width: calc(var(--_switch-width) - var(--_switch-thumb-size) - var(--_switch-padding));
    --_switch-icon-active-x: calc((var(--_switch-track-width) - var(--_switch-icon-size)) / 2 - var(--_switch-padding));
    --_switch-icon-inactive-x: calc((var(--_switch-track-width) - var(--_switch-icon-size)) / 2);

    padding: 0;
    border: none;
    display: flex;
    width: fit-content;
    gap: var(--spacing-medium);
    align-items: center;
  }

  :host,
  div[part="track"] {
    height: var(--_switch-height);
    border-radius: calc(var(--_switch-height) / 2) !important;
  }

  div[part="track"] {
    overflow: hidden;
    position: relative;
    width: var(--_switch-width);
    background-color: var(--switch-track-color, var(--main-disabled));
  }

  div[part="thumb"] {
    width: var(--_switch-thumb-size);
    height: var(--_switch-thumb-size);
    border-radius: calc(var(--_switch-thumb-size) / 2);
    position: absolute;
    top: var(--_switch-padding);
    left: var(--_switch-padding);
    background-color: var(--switch-thumb-color, var(--main-inverse));
  }

  zeta-icon {
    position: absolute;
    color: var(--switch-icon-color, var(--main-inverse));
    top: var(--_switch-icon-padding);
    height: var(--_switch-icon-size);
    width: var(--_switch-icon-size);
    &[part="icon active"] {
      /*right: 100%; //this needs to be half way of the track*/
      /*right: var(--_switch-track-icon-pos);*/
      right: calc(100% + var(--_switch-icon-active-x));
      /* right: var(--_switch-icon-active-x); */
    }
    &[part="icon inactive"] {
      right: var(--_switch-icon-inactive-x);
    }
  }

  /** This is temporary, see below */
  :host([checked]) div[part="thumb"],
  :host([checked]) zeta-icon {
    transform: translateX(calc(var(--_switch-width) - var(--_switch-thumb-size) - var(--_switch-padding) * 2));
  }
  :host([checked]) div[part="track"] {
    background-color: var(--switch-track-active-color, var(--main-primary));
  }
  /* :host([checked]) zeta-icon { */
  /* transform: translateX(calc(var(--_switch-width) - var(--_switch-icon-size) - var(--_switch-icon-padding) * 2)); */
  /* transform: translateX(var(--_switch-icon-active-x)); */
  /* } */

  /*
   * This isnt working in playwright tests due to this bug
   * https://github.com/microsoft/playwright/issues/31607 //TODO this looks like it has been merged, lets move this back...
   /
   :host([checked]) {
    & div[part="thumb"] {
      transform: translateX(calc(var(--_switch-width) - var(--_switch-thumb-size) - var(--_switch-padding) * 2));
    }
    & div[part="track"] {
      background-color: var(--switch-track-active-color, var(--main-primary));
    }
    & zeta-icon {
      transform: translateX(calc(var(--_switch-width) - var(--_switch-icon-size) - var(--_switch-icon-padding) * 2));
    }
  } */

  /** This is temporary, see below */
  :host([disabled]) div[part="thumb"] {
    background-color: var(--switch-thumb-disabled-color, var(--main-disabled));
  }

  :host([disabled]) div[part="track"] {
    background-color: var(--switch-track-disabled-color, var(--surface-disabled));
  }

  :host([disabled]) zeta-icon {
    color: var(--switch-icon-disabled-color, var(--main-disabled));
  }

  /*
   * This isnt working in playwright tests due to this bug
   * https://github.com/microsoft/playwright/issues/31607
  :host([disabled]) {
    & zeta-icon {
      color: var(--switch-icon-disabled-color, var(--main-disabled));
    }
    & div[part="thumb"] {
      background-color: var(--switch-thumb-disabled-color, var(--main-disabled));
    }
    & div[part="track"] {
      background-color: var(--switch-track-disabled-color, var(--surface-disabled));
    }
  } */

  zeta-icon,
  div[part="thumb"],
  div[part="track"] {
    transition: all 0.2s ease-out;
  }

  @media (prefers-reduced-motion) {
    :host,
    :host * {
      transition: none !important;
    }
  }
`;
