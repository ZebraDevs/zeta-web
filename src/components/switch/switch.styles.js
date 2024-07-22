import { css } from "lit";
export default css`
  :host {
    --_switch-width: var(--switch-width, var(--spacing-13));
    --_switch-height: var(--switch-height, var(--spacing-8));
    --_switch-thumb-size: var(--switch-thumb-size, var(--spacing-6));
    --_switch-icon-size: var(--switch-icon-size, var(--_switch-thumb-size));
    --_switch-padding: calc((var(--_switch-height) - var(--_switch-thumb-size)) / 2);
    --_switch-icon-padding: calc((var(--_switch-height) - var(--_switch-icon-size)) / 2);

    padding: 0;
    border: none;
    display: flex;
    width: fit-content;
    gap: var(--spacing-3);
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
    background-color: var(--switch-track-color, var(--icon-disabled));
  }

  div[part="thumb"] {
    width: var(--_switch-thumb-size);
    height: var(--_switch-thumb-size);
    border-radius: calc(var(--_switch-thumb-size) / 2);
    position: absolute;
    top: var(--_switch-padding);
    left: var(--_switch-padding);
    background-color: var(--switch-thumb-color, var(--icon-inverse));
  }

  input {
    visibility: hidden;
    height: 0;
    width: 0;
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
  }

  zeta-icon {
    position: absolute;
    color: var(--switch-icon-color, var(--icon-inverse));
    top: var(--_switch-icon-padding);
    height: var(--_switch-icon-size);
    width: var(--_switch-icon-size);
    &[part="icon active"] {
      right: 100%;
    }
    &[part="icon inactive"] {
      right: var(--_switch-icon-padding);
    }
  }

  /** This is temporary, see below */
  :host([checked]) div[part="thumb"] {
    transform: translateX(calc(var(--_switch-width) - var(--_switch-thumb-size) - var(--_switch-padding) * 2));
  }
  :host([checked]) div[part="track"] {
    background-color: var(--switch-track-active-color, var(--icon-flavor-primary));
  }
  :host([checked]) zeta-icon {
    transform: translateX(calc(var(--_switch-width) - var(--_switch-icon-size) - var(--_switch-icon-padding) * 2));
  }

  /*
   * This isnt working in playwright tests due to this bug
   * https://github.com/microsoft/playwright/issues/31607
   /
   :host([checked]) {
    & div[part="thumb"] {
      transform: translateX(calc(var(--_switch-width) - var(--_switch-thumb-size) - var(--_switch-padding) * 2));
    }
    & div[part="track"] {
      background-color: var(--switch-track-active-color, var(--icon-flavor-primary));
    }
    & zeta-icon {
      transform: translateX(calc(var(--_switch-width) - var(--_switch-icon-size) - var(--_switch-icon-padding) * 2));
    }
  } */

  /** This is temporary, see below */
  :host([disabled]) div[part="thumb"] {
    background-color: var(--switch-thumb-disabled-color, var(--icon-disabled));
  }

  :host([disabled]) div[part="track"] {
    background-color: var(--switch-track-disabled-color, var(--surface-disabled));
  }

  :host([disabled]) zeta-icon {
    color: var(--switch-icon-disabled-color, var(--icon-disabled));
  }

  /*
   * This isnt working in playwright tests due to this bug
   * https://github.com/microsoft/playwright/issues/31607
  :host([disabled]) {
    & zeta-icon {
      color: var(--switch-icon-disabled-color, var(--icon-disabled));
    }
    & div[part="thumb"] {
      background-color: var(--switch-thumb-disabled-color, var(--icon-disabled));
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
