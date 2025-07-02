import { css } from "lit";
export default css`
  :host {
    max-width: 375px;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  h4 {
    text-align: center;
    margin-top: var(--spacing-6xl);
    margin-bottom: var(--spacing-small);
    font: var(--h4);
  }

  p {
    text-align: center;
    font: var(--body-small);
    color: var(--main-subtle);
    margin: var(--spacing-none);
  }

  .actions {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-small);
    justify-content: center;
    margin-top: var(--spacing-large);
  }
  .content {
    margin-top: var(--spacing-large);
  }

  ::slotted(zeta-illustration) {
    height: var(--spacing-11xl);
    display: block;
    margin: var(--spacing-2xl) var(--spacing-none);
  }
`;
