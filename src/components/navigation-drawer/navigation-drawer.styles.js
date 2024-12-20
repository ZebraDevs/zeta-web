import { css } from "lit";
export default css`
  dialog {
    &[open] {
      display: flex;
    }

    flex-direction: column;
    height: 100%;
    max-height: 100vh;
    width: 40%;
    min-width: 240px;
    max-width: 380px;
    background: var(--surface-default);
    border: none;
    margin: 0;
    box-shadow: var(--elevation-6);
    padding: 0;
    top: 0;
    overflow: hidden;
  }

  :host([anchor="right"]) {
    dialog {
      margin-left: auto;
      transform: translateX(100%);
    }

    dialog[open] {
      transform: translateX(0);
    }
  }

  :host([anchor="left"]) {
    dialog {
      transform: translateX(-100%);
    }

    dialog[open] {
      transform: translateX(0);
    }
  }

  :host([showAnimation]) {
    dialog {
      transition:
        transform 0.5s ease,
        display 0.5s ease allow-discrete;
    }

    &:host([anchor="left"]) {
      /*TODO Not supported in Firefox*/
      @starting-style {
        dialog[open] {
          transform: translateX(-100%);
        }
      }
    }

    &:host([anchor="right"]) {
      /*TODO Not supported in Firefox*/
      @starting-style {
        dialog[open] {
          transform: translateX(100%);
        }
      }
    }
  }

  .scrollable-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .content {
    flex-direction: column;
    display: flex;
    gap: var(--spacing-minimum);
    padding: var(--spacing-minimum) var(--spacing-small);
    flex: 1;
  }
`;
