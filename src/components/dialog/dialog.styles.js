import { css } from "lit";
//import styles from "../../mixins/breakpoints.styles.js";
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

      padding: var(--spacing-4) var(--spacing-6);
    }
    ::slotted([slot="other"]) {
      width: 100%;
    }
  }

  dialog {
    padding: 0;
    border: none;
    border-radius: inherit;
    background-color: var(--surface-default);
    color: var(--text-default);
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
    flex-direction: column;
    padding: var(--spacing-6) var(--spacing-6) var(--spacing-3);
    row-gap: var(--spacing-2);
  }

  footer {
    display: flex;
    padding: var(--spacing-4) var(--spacing-6) var(--spacing-6) var(--spacing-6);
    gap: var(--spacing-4);
    justify-content: flex-end;
    margin-top: var(--spacing-6);

    ::slotted(zeta-button) {
      width: 100%;
    }

    .actions {
      display: flex;
      gap: var(--spacing-4);
      width: fit-content;
    }

    /* @include sm {
    .actions {
      width: 100%;
    }

    padding: var(--spacing-4) var(--spacing-6);
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

  ::slotted([slot="dialog-body"]) {
    padding: var(--spacing-2) var(--spacing-6);
    font: var(--body-small);
  }

  dialog[open] {
    display: flex;
  }
` /*]*/;
