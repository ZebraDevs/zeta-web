import { css } from "lit";
export default css`
  :host {
    display: block;
    background-color: var(--surface-card);
    overflow: hidden;
  }

  .card-header {
    padding: var(--space-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
  }

  /*This was copied from global-header.styles. This needs some better rethinking, how to default a button style if in a header?? */
  ::slotted(zeta-icon-button) {
    --icon-button-icon-color: var(--foreground-primary);
    --icon-button-icon-color-disabled: var(--foreground-disabled);
    --icon-button-color: var(--surface-card);
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font: var(--title-medium);
    font-size: var(--title-medium-font-size);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
    color: var(--foreground-primary);
    margin: 0;
  }

  h2 {
    font: var(--body-small);
    font-size: var(--body-small-font-size);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    color: var(--foreground-secondary);
    margin: 0;
  }

  .leading {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
  }

  .trailing {
    display: flex;
    justify-self: flex-end;
  }
`;
