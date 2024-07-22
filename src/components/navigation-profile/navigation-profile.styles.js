import { css } from "lit";
/*import styles from "../../../mixins/tertiary-interactive.styles.css";*/
export default css`
  :host {
    width: min-content;
    display: block;
    white-space: nowrap;
    color: var(--text-inverse);
  }

  .navigation-profile {
    padding: var(--spacing-1) var(--spacing-3);
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
    font: var(--title-medium);

    /*@include tertiary-interactive;*/
    /* Once Firefox 127 is released, we can use CSS Properties (above) instead of the following code (below) */
    background-color: var(--surface-default-inverse);
    color: var(--text-inverse);

    &:hover {
      background-color: var(--color-cool-80) !important;
    }

    &:active {
      background-color: var(--color-cool-90) !important;
    }
  }
`;
