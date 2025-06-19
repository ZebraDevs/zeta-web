import { css } from "lit";
export default css`
  :host {
    display: flex;
    height: fit-content;
    width: fit-content;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-minimum);
    transition: border-radius 0.3s ease-in-out;
  }

  .label {
    font-size: var(--spacing-medium);
    line-height: var(--spacing-large);
    /** TODO: Change to semantic token */
  }

  :host([rounded="true"][size="large"]) > button {
    border-radius: var(--radius-large);
  }
  
  :host([rounded="true"][size="small"]) > button {
    border-radius: var(--radius-rounded);
  }

  /** Note: Selector styles the button when not extended. */
  :host > .label {
    padding-top: var(--spacing-minimum);
  }

  /** Note: Necessary to override default zeta-button disabled styles. */
  :host([disabled]) > .label {
    background-color: transparent;
  }

  /** SIZING START */
  :host button {
    width: min-content;
    transition: border-radius 0.3s ease-in-out;
    display: flex;
    align-items: center;
    border: none;
    justify-content: center;
    overflow-x: ellipsis;
    font: var(--label-large);
    gap: var(--spacing-small);
  }

  :host([size="large"]) > button {
    padding: var(--spacing-xl);
    --icon-size: 36px;
    width: calc(var(--spacing-xl) * 2 + 36px);
  }

  :host([size="medium"]) > button,
  :host([size="small"]) > button {
    padding: var(--spacing-medium);
    --icon-size: 24px;
    width: calc(var(--spacing-medium) * 2 + 24px);
  }

  :host([extended]) > button {
    padding: var(--spacing-small) var(--spacing-medium);
    --icon-size: 24px;
  }
  :host([extended][size]) > button {
    width: min-content;
  }
  /** SIZING END */

  /** BORDER RADIUS START */
  :host > button {
    border-radius: var(--radius-none);
  }

  :host([round="true"][size="small"]) > button,
  :host([round="true"][size="medium"]) > button,
  :host([round="true"][extended]) > button {
    border-radius: var(--radius-rounded);
  }

  :host([round="true"][size="large"]:not([extended])) > button {
    border-radius: var(--radius-large);
  }

  :host([round="full"]) > button,
  :host([round="full"][size]) > button {
    border-radius: var(--radius-full);
  }
  /** BORDER RADIUS END */

  /** FLAVOR START */
  :host([flavor="primary"]:not([disabled])) {
    zeta-icon {
      --icon-color: var(--main-inverse);
    }
  }

  :host([flavor="secondary"]:not([disabled])) {
    > :first-child,
    > button {
      background-color: var(--state-secondary-enabled);
      color: var(--main-default);
      zeta-icon {
        --icon-color: var(--main-default);
      }
    }

    > button:hover {
      background-color: var(--state-secondary-hover);
    }

    > button:active {
      background-color: var(--state-secondary-selected);
    }
  }

  :host([flavor="inverse"]:not([disabled])) {
    > button {
      background-color: var(--state-inverse-enabled);
      color: var(--main-inverse);
      zeta-icon {
        --icon-color: var(--main-inverse);
      }
    }

    > button:hover {
      background-color: var(--state-inverse-hover);
    }

    > button:active {
      background-color: var(--state-inverse-selected);
    }
  }

  :host([flavor="inverse"]:not([disabled])[extended]) > button > .label {
    color: var(--main-inverse);
  }
  :host([flavor="secondary"]:not([disabled])[extended]) > button > .label {
    color: var(--main-default);
  }

  /** FLAVOR END */
`;
