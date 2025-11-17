import { css } from "lit";
export default css`
  :host {
    padding: var(--spacing-medium);
    background: var(--surface-default);
    display: flex;
    gap: var(--spacing-large);
    justify-content: space-between;
    align-items: center;
    color: var(--main-subtle);
    -webkit-tap-highlight-color: transparent;
  }

  :host(:not([disabled])[active]) {
    background-color: var(--surface-selected);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):hover) {
      color: var(--main-default);
    }
  }

  h1 {
    display: flex;
    font: var(--title-medium);
    margin: 0;
  }

  .leading {
    display: flex;
    gap: inherit;
    align-items: center;
  }

  .trailing {
    display: flex;
    gap: var(--spacing-small);
    align-items: center;
    justify-self: flex-end;
  }
`;
