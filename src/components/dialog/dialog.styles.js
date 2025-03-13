import { css } from "lit";
export default css`
  :host {
    --_dialog-max-width: var(--dialog-max-width, 480px);
    --_dialog-max-height: var(--dialog-max-height, 80vh);
  }

  dialog {
    flex-direction: column;
    width: fit-content;
    width: 100%;
    max-width: var(--_dialog-max-width);
    max-height: var(--_dialog-max-height);
    overflow: auto;

    border: none;
    border-radius: inherit;
    padding: 0 var(--spacing-large);

    background-color: var(--surface-default);
    color: var(--main-default);
    box-shadow: var(--elevation-6);
  }

  dialog[open] {
    display: flex;
  }

  header {
    display: flex;
    flex-direction: var(--_dialog-header-direction, column);
    padding: var(--spacing-2xl) var(--spacing-2xl) var(--spacing-medium);
    row-gap: var(--spacing-small);
    column-gap: var(--spacing-large);
  }

  :host([centered]) header {
    align-items: center;
  }

  footer {
    display: flex;
    flex-shrink: 0;
    padding: var(--spacing-large) var(--spacing-2xl) var(--spacing-2xl) var(--spacing-2xl);
    gap: var(--spacing-large);
    justify-content: flex-end;
    margin-top: var(--spacing-2xl);
    overflow: auto;

    ::slotted(:not(zeta-button)) {
      display: none;
    }

    ::slotted(zeta-button) {
      width: 100%;
    }

    .actions {
      display: flex;
      gap: var(--spacing-large);
      width: 100%;
    }
  }

  /*::slotted([slot="other"]) {
    display: flex;
    width: fit-content;
  }*/

  h1 {
    font: var(--headline-small);
    margin: 0;
    padding: 0;
  }

  div[part="body"] {
    display: flex;
    margin: var(--spacing-small) var(--spacing-2xl);
    flex: 1;
    min-height: 1.125rem;
    overflow: auto;
  }

  /*default size = small*/
  :host(:not([size="large"])) div[part="body"] {
    font: var(--body-small);
    min-height: 1.125rem;
  }

  :host([size="large"]) div[part="body"] {
    /*Note: the designs as of 28/11/2024 show a different font size for the large dialog body ("Standard/Body/Large"). This isnt in ZDS tokens and needs to be changed in Figma*/
    font: var(--body-medium);
    min-height: 1.5rem;
  }

  :host(:not([size="large"])) {
    footer {
      flex-direction: row;
    }
    footer[data-element-count="3"] {
      flex-direction: column-reverse;
      & .actions {
        flex-direction: column-reverse;
      }
    }
  }

  :host([size="large"]) {
    footer[data-element-count="3"] {
      justify-content: space-between;
    }

    & .actions,
    & ::slotted([slot="other"]) {
      width: fit-content;
    }
  }

  zeta-icon {
    --icon-size: 32px;
  }
`;
