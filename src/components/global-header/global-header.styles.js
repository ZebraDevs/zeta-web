import { css } from "lit";
export default css`
  :host {
    display: block;
    min-width: min-content;
    display: flex;
    flex-direction: column;
    background-color: var(--surface-default);
    --tab-bar-background: var(--surface-default);
    color: var(--main-default);
  }

  ::slotted(zeta-icon-button) {
    --icon-button-icon-color: var(--main-default);
    --icon-button-icon-color-disabled: var(--main-disabled);
    --icon-button-color: var(--surface-default);
  }

  .slotted-content,
  .leading,
  .global-header {
    display: flex;
    align-items: center;
  }

  .global-header {
    gap: var(--spacing-2xl);
    justify-content: space-between;
    padding: var(--spacing-small) var(--spacing-2xl);
  }

  .slotted-content {
    gap: var(--spacing-small);
  }

  .leading {
    gap: var(--spacing-2xl);
  }

  .header {
    font: var(--title-large);
  }

  .navigation-menu {
    padding: 0 var(--spacing-small);
  }
`;
