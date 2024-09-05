import { css } from "lit";

export default css`
  :host .container:active {
    background-color: var(--surface-selected);
  }

  :host([disabled]) .container {
    background-color: var(--surface-disabled);
    color: var(--main-disabled);
    box-shadow: 0 0 0 var(--border-size-small) var(--border-disabled);
  }
`;
