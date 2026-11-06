import { css } from "lit";
export default css`
  .body-content {
    transition: padding 250ms ease-out;
  }

  :host {
    cursor: pointer;
    background-color: var(--surface-section);
    -webkit-tap-highlight-color: transparent;
  }

  h4 {
    font: var(--title-large);
    margin: var(--space-lg) var(--space-none);
    color: var(--foreground-primary);
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
    padding: var(--space-md) var(--space-sm) var(--space-md) var(--space-lg);
  }

  :host([rounded]) .chevron-wrapper {
    border-radius: var(--radius-md);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .chevron-wrapper:hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  zeta-icon.chevron {
    transition: all 200ms ease-in-out;
    display: block;
  }

  zeta-icon.check {
    --icon-color: var(--foreground-info);
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

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .accordion-item-header .row:hover {
      background-color: var(--interactive-neutral-background-hover);
    }
  }

  .title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  :host(:not([selectable])) .title-wrapper {
    margin-left: var(--space-lg);
  }

  zeta-icon.trailing {
    margin-right: var(--space-lg);
  }

  :host([expanded]) zeta-icon.expand {
    rotate: 180deg;
  }

  .body {
    padding: var(--space-none) var(--space-lg);
  }

  .body:not([hidden]) .body-content {
    padding-top: var(--space-lg);
    padding-bottom: var(--space-lg);
  }

  :host([navigation]) .body {
    display: none;
  }

  ::slotted([slot="header"]) {
    margin: var(--space-lg);
    margin-top: var(--space-none);
  }
`;
