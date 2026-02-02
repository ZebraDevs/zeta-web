import { css } from "lit";
export default css`
  :host {
    --_dialog-width: var(--dialog-width, 480px);
    --_dialog-max-height: var(--dialog-max-height, 80vh);
    --_dialog-title-font-size: var(--dialog-title-font-size, 1.25rem);
    --_dialog-title-line-height: var(--dialog-title-line-height, 1.5rem);

    footer[data-element-count="3"] {
      justify-content: space-between;
    }

    & .actions,
    & ::slotted([slot="other"]) {
      width: fit-content;
    }
  }

  dialog {
    flex-direction: column;
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
  }

  dialog.has-content {
    overflow: visible;
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
  header h1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
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

  h1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;
    font: var(--headline-small);
    font-size: var(--_dialog-title-font-size);
    line-height: var(--_dialog-title-line-height);
    margin: 0;
    padding: 0;
  }

  div[part="body"] {
    display: flex;
    padding: var(--spacing-2xl);
    flex: 1;
    min-height: 1.125rem;
    overflow: auto;
    /*Note: the designs as of 28/11/2024 show a different font size for the large dialog body ("Standard/Body/Large"). This isnt in ZDS tokens and needs to be changed in Figma*/
    font: var(--body-medium);
    min-height: 1.5rem;
  }

  div[part="body"].has-content {
    overflow: visible;
  }

  :host([flavor="info"]) {
    & [part="header-icon"] {
      --icon-color: var(--main-info);
    }
  }
  :host([flavor="warning"]) {
    & [part="header-icon"] {
      --icon-color: var(--main-warning);
    }
  }
  :host([flavor="success"]) {
    & [part="header-icon"] {
      --icon-color: var(--main-positive);
    }
  }
  :host([flavor="error"]) {
    & [part="header-icon"] {
      --icon-color: var(--main-negative);
    }
  }
  zeta-icon {
    --icon-size: var(--spacing-2xl);
  }
  zeta-icon[name="close"] {
    cursor: pointer;
  }
`;
