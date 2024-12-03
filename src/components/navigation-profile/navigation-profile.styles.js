import { css } from "lit";
/*import styles from "../../../mixins/tertiary-interactive.styles.css";*/
export default css`
  :host {
    width: min-content;
    display: block;
    white-space: nowrap;
    color: var(--main-inverse);
  }

  .navigation-profile {
    padding: var(--spacing-minimum) var(--spacing-medium);
    display: flex;
    align-items: center;
    gap: var(--spacing-minimum);
    font: var(--title-medium);

    /*@include tertiary-interactive;*/
    /* Once Firefox 127 is released, we can use CSS Properties (above) instead of the following code (below) */
    background-color: var(--surface-default-inverse);
    color: var(--main-inverse);

    &:hover {
      background-color: var(--state-inverse-hover) !important;
    }

    &:active {
      background-color: var(--state-inverse-selected) !important;
    }
  }
`;
