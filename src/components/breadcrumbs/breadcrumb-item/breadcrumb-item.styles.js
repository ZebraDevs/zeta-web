import { css } from "lit";
export default css`
  :host {
    display: flex;
  }

  a {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: var(--main-subtle);
    gap: var(--spacing-small);
  }

  a:hover ::slotted([slot="icon"]) {
    --icon-color: var(--main-primary);
  }

  a:active ::slotted([slot="icon"]) {
    --icon-color: var(--main-default);
  }

  a:hover {
    color: var(--main-primary);
  }

  a:active {
    color: var(--main-default);
  }

  ::slotted([slot="icon"]) {
    --icon-color: var(--main-subtle);
    margin: var(--spacing-none) var(--spacing-minimum);
  }
`;
