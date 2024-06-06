import { css } from "lit";
export default css`
  .header {
    display: flex;
    flex: 1;
  }

  .leading {
    display: flex;
  }

  .menu-item {
    background-color: var(--surface-default);
    padding: var(--spacing-3) var(--spacing-2);
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    user-select: none;
    font: var(--body-medium);
  }
`;
