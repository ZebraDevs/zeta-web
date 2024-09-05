import { css } from "lit";
export default css`
  .card-header {
    padding: var(--spacing-small) var(--spacing-large);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-medium);
  }

  /*This was copied from global-header.styles. This needs some better rethinking, how to default a button style if in a header?? */
  ::slotted(zeta-icon-button) {
    --icon-button-icon-color: var(--main-default);
    --icon-button-icon-color-disabled: var(--main-disabled);
    --icon-button-color: var(--surface-default);
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
