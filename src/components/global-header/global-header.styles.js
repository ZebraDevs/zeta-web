import { css } from "lit";
export default css`
  :host {
    display: block;
    min-width: min-content;
  }

  .global-header {
    display: flex;
    flex-direction: column;
  }

  .slotted-content,
  .leading,
  .global-header-content {
    display: flex;
    align-items: center;
  }

  .global-header-content {
    background-color: var(--color-cool-90);
    color: var(--text-inverse);
    gap: var(--spacing-11);
    justify-content: space-between;
    padding: var(--spacing-2) var(--spacing-6);
  }

  .slotted-content {
    gap: var(--spacing-4);
  }

  .leading {
    gap: var(--spacing-11);
  }

  .header {
    font: var(--title-large);
  }

  .navigation-menu {
    background-color: var(--color-cool-90);
    padding: 0 var(--spacing-2);
  }
`;
