import { css } from "lit";
//import styles from "../../mixins/breakpoints.styles.js";
//TODO text-align is bleeding from outside the component.
export default /*[styles, */ css`
  @media (max-width: --mobile-max-width) {
    dialog {
      max-width: 312px;
    }
    .container {
      &.col3 {
        footer {
          flex-direction: column-reverse;

          .actions {
            flex-direction: column-reverse;
          }
        }
      }
    }
    footer {
      .actions {
        width: 100%;
      }

      padding: var(--spacing-large) var(--spacing-2xl);
    }
    ::slotted([slot="other"]) {
      width: 100%;
    }
  }

  dialog {
    padding: 0 var(--spacing-large);
    border: none;
    border-radius: inherit;
    background-color: var(--surface-default);
    color: var(--main-default);
    box-shadow: var(--elevation-6);
    width: fit-content;
    height: fit-content;
    overflow: visible;
    width: 100%;
    max-width: 480px;

    /*@include sm {
    max-width: 312px;
  }*/
  }

  .container {
    width: 100%;
    flex-direction: column;
    display: flex;

    &.centered {
      header {
        align-items: center;
      }
    }

    &.col3 {
      footer {
        justify-content: space-between;

        /*@include sm {
        flex-direction: column-reverse;

        .actions {
          flex-direction: column-reverse;
        }
      }*/
      }
    }
  }

  header {
    display: flex;
    flex-direction: var(--_dialog-header-direction, column);
    padding: var(--spacing-2xl) var(--spacing-2xl) var(--spacing-medium);
    row-gap: var(--spacing-small);
    column-gap: var(--spacing-large);
  }

  footer {
    display: flex;
    padding: var(--spacing-large) var(--spacing-2xl) var(--spacing-2xl) var(--spacing-2xl);
    gap: var(--spacing-large);
    justify-content: flex-end;
    margin-top: var(--spacing-2xl);

    ::slotted(:not([slot="icon"]):not(zeta-button)) {
      display: none;
    }

    ::slotted(zeta-button) {
      width: 100%;
    }

    .actions {
      display: flex;
      gap: var(--spacing-large);
      width: fit-content;
    }

    /* @include sm {
    .actions {
      width: 100%;
    }

    padding: var(--spacing-large) var(--spacing-2xl);
  } */
  }

  ::slotted([slot="other"]) {
    display: flex;
    width: fit-content;

    /* @include sm {
    width: 100%;
  } */
  }

  .dialog-title {
    font: var(--headline-small);
    margin: 0;
    padding: 0;
  }

  ::slotted([slot="dialog-body"]),
  .body {
    padding: var(--spacing-small) var(--spacing-2xl);
    font: var(--body-small);
  }

  dialog[open] {
    display: flex;
  }
  zeta-icon {
    --icon-size: 32px;
  }
` /*]*/;
