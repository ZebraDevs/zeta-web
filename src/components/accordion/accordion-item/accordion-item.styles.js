import { css } from "lit";
export default css`
  h4 {
    font: var(--h4);
    margin: var(--spacing-large) var(--spacing-none);
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
    margin-right: var(--spacing-large);
  }

  :host([isExpanded]) .body {
    max-height: 100px;
  }

  :host([isExpanded]) zeta-icon.chevron {
    rotate: 90deg;
  }

  .body {
    overflow: hidden;
    transition: all 300ms ease-in-out;
    max-height: 0;
  }

  .accordion-item-header:hover {
    background-color: var(--surface-hover);
  }

  .title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  :host(:not(isSelectable)) .title-wrapper {
    margin-left: var(--spacing-large);
  }

  zeta-icon.navigation {
    margin-right: var(--spacing-large);
  }
`;
