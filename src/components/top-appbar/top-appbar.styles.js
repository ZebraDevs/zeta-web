import { css } from "lit";

export default css`
  :host([centered]) .title {
    justify-content: center;
  }

  .title {
    flex: 1;
    display: flex;
  }

  header {
    display: flex;
    height: fit-content;
    flex-direction: column;
    gap: var(--spacing-large);
    background-color: var(--surface-default);
    padding: var(--spacing-xl) var(--spacing-large);
    font: var(--body-large);
  }

  .body {
    gap: var(--spacing-large);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ::slotted(zeta-search) {
    --search-icon-display: none;
    --search-border-color: transparent;
    width: 100%;
  }
`;
