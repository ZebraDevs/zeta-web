import { css } from "lit";

export default css`
  .snackbar-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-medium) var(--spacing-large);
  }

  .snackbar-root div {
    display: flex;
    align-items: center;
    gap: var(--spacing-large);
  }

  #closeButton {
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  #action {
    background-color: transparent !important;
    border: none;
    cursor: pointer;
    color: var(--main-primary);
    font: var(--label-large);
  }

  :host([status="default"]) .snackbar-root {
    background-color: var(--surface-default-inverse);
    color: var(--main-inverse);
  }

  :host([status="default"]) ::slotted([slot="icon"]),
  :host([status="default"]) #closeIcon {
    --icon-color: var(--main-inverse);
  }

  :host([status="positive"]) .snackbar-root {
    background-color: var(--surface-positive-subtle);
    color: var(--main-default);
  }

  :host([status="positive"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-positive);
  }

  :host([status="positive"]) .snackbar-root #action {
    color: var(--main-default);
  }

  :host([status="info"]) .snackbar-root {
    background-color: var(--surface-info-subtle);
    color: var(--main-default);
  }

  :host([status="info"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-info);
  }

  :host([status="info"]) .snackbar-root #action {
    color: var(--main-default);
  }

  :host([status="warning"]) .snackbar-root {
    background-color: var(--surface-warning-subtle);
    color: var(--main-default);
  }

  :host([status="warning"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-warning);
  }

  :host([status="warning"]) .snackbar-root #action {
    color: var(--main-default);
  }

  :host([status="negative"]) .snackbar-root {
    background-color: var(--surface-negative-subtle);
    color: var(--main-default);
  }

  :host([status="negative"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-negative);
  }

  :host([status="negative"]) .snackbar-root #action {
    color: var(--main-default);
  }

  :host([status="view"]) .snackbar-root {
    background-color: var(--surface-primary-subtle);
    color: var(--main-default);
  }

  :host([status="view"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-primary);
  }

  :host([status="view"]) .snackbar-root #action {
    color: var(--main-default);
  }
`;
