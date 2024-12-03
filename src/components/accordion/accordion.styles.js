import { css } from "lit";
export default css`
  :not([open]) .body {
    display: none;
  }
  :host([open]) .body {
    display: block;
  }
  :host([contained]) .accordion {
    border: var(--border-size-small) solid var(--border-default);
  }
  :host([disabled]) .accordion {
    border-color: var(--border-disabled);
    color: var(--main-disabled);
  }
  .title {
    font: var(--title-medium);
    padding: var(--spacing-large);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .body {
    padding: var(--spacing-small) 0;
  }
  .body ::slotted(li) {
    padding: var(--spacing-small) var(--spacing-large);
    list-style-type: none;
    font: var(--body-medium);
  }
`;
