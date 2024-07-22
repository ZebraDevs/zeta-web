import { css } from "lit";
export default css`
  :host {
    display: block;
    min-width: min-content;
    display: flex;
    flex-direction: column;
    background-color: var(--surface-default);
    --tab-bar-background: var(--surface-default);
    color: var(--text-default);
  }

  ::slotted(zeta-icon-button) {
    --icon-button-icon-color: var(--icon-default);
    --icon-button-icon-color-disabled: var(--icon-disabled);
    --icon-button-color: var(--surface-default);
  }

  .slotted-content,
  .leading,
  .global-header {
    display: flex;
    align-items: center;
  }

  .global-header {
    gap: var(--spacing-6);
    justify-content: space-between;
    padding: var(--spacing-2) var(--spacing-6);
  }

  .slotted-content {
    gap: var(--spacing-small);
  }

  .leading {
    gap: var(--spacing-6);
  }

  .header {
    font: var(--title-large);
  }

  .navigation-menu {
    padding: 0 var(--spacing-2);
  }
`;
