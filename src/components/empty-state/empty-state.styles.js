import { css } from "lit";
export default css`
  :host {
    max-width: var(--empty-state-max-width, 375px);
    align-items: center;
    justify-content: center;
    display: flex;
  }

  h4.title,
  ::slotted([slot="title"]) {
    text-align: center;
    margin-top: var(--spacing-6xl);
    margin-bottom: var(--spacing-small);
  }

  h4.title {
    font: var(--h4);
  }

  p.description {
    font: var(--body-small);
    color: var(--main-subtle);
  }

  p.description,
  ::slotted([slot="description"]) {
    margin: var(--spacing-none);
    text-align: center;
  }

  div[part="actions"] {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-small);
    justify-content: center;
    margin-top: var(--spacing-large);
  }

  div[part="content"] {
    margin-top: var(--spacing-large);
  }

  ::slotted(zeta-illustration) {
    height: var(--spacing-11xl);
    display: block;
    margin: var(--spacing-2xl) var(--spacing-none);
  }
`;
