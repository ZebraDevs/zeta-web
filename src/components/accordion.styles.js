import { css } from "lit";
export default css`
  :not([open]).body {
    display: none;
  }
  :host([open]).body {
    display: block;
  }
  :host([contained]) .accordion {
    border: var(--border-size-small) solid var(--border-default);
  }
  :host([disabled]) .accordion {
    border-color: var(--border-disabled);
  }
  .title {
    font: var(--title-medium);
    padding: var(--spacing-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .body {
    padding: var(--spacing-2) 0;
  }
  .body ::slotted(li) {
    padding: var(--spacing-2) var(--spacing-4);
    list-style-type: none;
    font: var(--body-medium);
  }
`;
