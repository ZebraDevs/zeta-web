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
    gap: var(--spacing-4);
    background-color: var(--surface-default);
    padding: var(--spacing-5) var(--spacing-4);
    font-size: 20px;
  }

  .body {
    gap: var(--spacing-4);
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
