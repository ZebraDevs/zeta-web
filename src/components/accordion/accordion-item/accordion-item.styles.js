import { css } from "lit";
export default css`
  .body-content {
    transition: padding 250ms ease-out;
  }

  :host {
    cursor: pointer;
    background-color: var(--surface-default);
  }

  h4 {
    font: var(--h4);
    margin: var(--spacing-large) var(--spacing-none);
    color: var(--main-default);
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .chevron-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-medium) var(--spacing-small) var(--spacing-medium) var(--spacing-large);
  }

  :host([rounded]) .chevron-wrapper {
    border-radius: var(--radius-rounded);
  }

  .chevron-wrapper:hover {
    background-color: var(--surface-selected-hover);
  }

  zeta-icon.chevron {
    transition: all 200ms ease-in-out;
    display: block;
  }

  zeta-icon.check {
    --icon-color: var(--main-primary);
  }

  :host([expanded]) zeta-icon.chevron {
    rotate: 90deg;
  }

  .body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 250ms ease-out;
  }

  .body:not([hidden]) {
    grid-template-rows: 1fr;
  }

  .body-content {
    overflow: hidden;
    min-height: 0;
  }

  .accordion-item-header .row:hover {
    background-color: var(--surface-hover);
  }

  .title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  :host(:not([selectable])) .title-wrapper {
    margin-left: var(--spacing-large);
  }

  zeta-icon.trailing {
    margin-right: var(--spacing-large);
  }

  :host([expanded]) zeta-icon.expand {
    rotate: 180deg;
  }

  .body {
    padding: var(--spacing-none) var(--spacing-large);
  }

  .body:not([hidden]) .body-content {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-large);
  }

  :host([navigation]) .body {
    display: none;
  }

  ::slotted([slot="header"]) {
    margin: var(--spacing-large);
    margin-top: var(--spacing-0);
  }
`;
