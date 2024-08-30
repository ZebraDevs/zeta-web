import { css } from "lit";
export default css`
  :host {
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-minimum);
    transition: all 0.3s ease-in-out;
  }

  .label {
    font-size: var(--spacing-medium);
    line-height: var(--spacing-4);
    /** TODO: Change to semantic token */
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
    transition: all 0.3s ease-in-out;
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
  :host([flavor="secondary"]:not([disabled])) {
    > button {
      background-color: var(--color-yellow-40);
      /** TODO: Change to semantic token */
      zeta-icon {
        --icon-color: var(--text-default);
      }
    }

    > button:hover {
      background-color: var(--color-yellow-30);
      /** TODO: Change to semantic token */
    }

    > button:active {
      background-color: var(--color-yellow-50);
      /** TODO: Change to semantic token */
    }
  }

  :host([flavor="inverse"]:not([disabled])) {
    > button {
      background-color: var(--component-button-Inverse-active);
      zeta-icon {
        --icon-color: var(--text-inverse);
      }
    }

    > button:hover {
      background-color: var(--component-button-Inverse-hover);
    }
  }

  :host([flavor="inverse"]:not([disabled])[extended]) > button > .label {
    color: var(--text-inverse);
  }
  :host([flavor="secondary"]:not([disabled])[extended]) > button > .label {
    color: var(--text-default);
  }
  /** FLAVOR END */
`;
