import { css } from "lit";
export default css`
  :host {
    --_dialog-width: var(--dialog-width, 480px);
    --_dialog-max-height: var(--dialog-max-height, 80vh);
    --_dialog-font-size: var(--dialog-font-size, 1.25rem);
    --_dialog-line-height: var(--dialog-line-height, 1.5rem);
  }

  dialog {
    flex-direction: column;
    /* width: fit-content; */
    width: var(--_dialog-width);
    min-width: var(--_dialog-width);
    max-width: var(--_dialog-width);
    max-height: var(--_dialog-max-height);
    overflow: auto;

    border: none;
    border-radius: inherit;
    padding: var(---spacing-none);

    background-color: var(--surface-default);
    color: var(--main-default);
    border: 1px solid var(--border-default, #ced2db);
    /* box-shadow: var(--elevation-6); */
  }

  dialog[open] {
    display: flex;
  }

  header {
    display: flex;
    padding: var(--spacing-2xl) var(--spacing-2xl) var(--spacing-none) var(--spacing-2xl);
    gap: var(--spacing-small, 8px);
    align-items: center;
    align-self: stretch;
  }

  :host([centered]) header {
    align-items: center;
  }

  footer {
    display: flex;
    flex-shrink: 0;
    padding: var(--spacing-2xl);
    gap: var(--spacing-large);
    justify-content: space-between;
    /* margin-top: var(--spacing-2xl); */
    overflow: auto;

    ::slotted(:not(zeta-button)) {
      display: none;
    }

    ::slotted(zeta-button) {
      width: 100%;
    }

    .actions {
      display: flex;
      gap: var(--spacing-small);
      width: 100%;
    }
  }

  /*::slotted([slot="other"]) {
    display: flex;
    width: fit-content;
  }*/

  h1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;
    font: var(--headline-small);
    font-size: var(--_dialog-font-size);
    line-height: var(--_dialog-line-height);
    margin: 0;
    padding: 0;
  }

  div[part="body"] {
    display: flex;
    padding: var(--spacing-2xl);
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
    --icon-size: 24px;
  }
  ::slotted(zeta-icon[name="block"]) {
    --icon-color: var(--main-default);
  }
  ::slotted(zeta-icon[name="info"]) {
    --icon-color: var(--main-info);
  }
  ::slotted(zeta-icon[name="verified"]) {
    --icon-color: var(--main-positive);
  }
  ::slotted(zeta-icon[name="warning"]) {
    --icon-color: var(--main-warning);
  }
  ::slotted(zeta-icon[name="error"]) {
    --icon-color: var(--main-negative);
  }

  zeta-icon[name="close"] {
    cursor: pointer;
  }
`;
