import { css } from "lit";
export default css`
  .card-header {
    padding: var(--spacing-2-5) var(--spacing-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-3);
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font: var(--title-medium);
    margin: 0;
  }

  h2 {
    font: var(--body-small);
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
