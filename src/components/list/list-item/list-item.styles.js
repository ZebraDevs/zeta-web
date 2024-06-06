import { css } from "lit";
export default css`
  .list-item {
    padding: var(--spacing-5) var(--spacing-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-3);
    box-shadow: inherit;
  }

  h1 {
    font: var(--title-medium);
    margin: 0;
  }

  .leading {
    display: flex;
    gap: inherit;
    align-items: center;
  }

  .trailing {
    display: flex;
    justify-self: flex-end;
  }
`;
