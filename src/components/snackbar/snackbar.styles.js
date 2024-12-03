import { css } from "lit";

export default css`
  :host {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: var(--spacing-medium) var(--spacing-large);
  }

  :host div {
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

  :host([round="false"]) {
    border-radius: var(--radius-none);
  }

  :host([round="true"]) {
    border-radius: var(--radius-minimal);
  }

  :host([round="full"]) {
    border-radius: var(--radius-full);
  }

  :host([status="default"]) {
    background-color: var(--surface-default-inverse);
    color: var(--main-inverse);
  }

  :host([status="default"]) ::slotted([slot="icon"]),
  :host([status="default"]) #closeIcon {
    --icon-color: var(--main-inverse);
  }

  :host([status="positive"]) {
    background-color: var(--surface-positive-subtle);
    color: var(--main-default);
  }

  :host([status="positive"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-positive);
  }

  :host([status="positive"]) #action {
    color: var(--main-default);
  }

  :host([status="info"]) {
    background-color: var(--surface-info-subtle);
    color: var(--main-default);
  }

  :host([status="info"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-info);
  }

  :host([status="info"]) #action {
    color: var(--main-default);
  }

  :host([status="warning"]) {
    background-color: var(--surface-warning-subtle);
    color: var(--main-default);
  }

  :host([status="warning"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-warning);
  }

  :host([status="warning"]) #action {
    color: var(--main-default);
  }

  :host([status="negative"]) {
    background-color: var(--surface-negative-subtle);
    color: var(--main-default);
  }

  :host([status="negative"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-negative);
  }

  :host([status="negative"]) #action {
    color: var(--main-default);
  }

  :host([status="view"]) {
    background-color: var(--surface-primary-subtle);
    color: var(--main-default);
  }

  :host([status="view"]) ::slotted([slot="icon"]) {
    --icon-color: var(--main-primary);
  }

  :host([status="view"]) #action {
    color: var(--main-default);
  }
`;
