import { css } from "lit";
export default css`
  :host {
    display: flex;
  }

  a {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: var(--icon-subtle);
    text-decoration: none;
    gap: var(--spacing-2);
  }

  a:hover ::slotted([slot="icon"]) {
    --icon-color: var(--text-flavor-primary);
  }

  a:active ::slotted([slot="icon"]) {
    --icon-color: var(--icon-default);
  }

  a:hover {
    color: var(--text-flavor-primary);
  }

  a:active {
    color: var(--text-default);
  }

  ::slotted([slot="icon"]) {
    --icon-color: var(--icon-subtle);
    margin: var(--spacing-none) var(--spacing-minimum);
  }
`;
