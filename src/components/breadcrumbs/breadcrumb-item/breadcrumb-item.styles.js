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
    margin-right: var(--spacing-small);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
`;
