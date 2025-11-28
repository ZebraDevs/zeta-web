import { css } from "lit";
export default css`
  :host {
    margin-left: var(--spacing-2xl);
    -webkit-tap-highlight-color: transparent;
  }

  .container {
    display: flex;
    gap: var(--spacing-small);
  }

  .border {
    border-left: var(--border-size-small) solid var(--border-subtle);
  }

  .sub-item {
    margin: 0;
    padding: var(--spacing-small) var(--spacing-large);
    font: var(--title-medium);
    display: flex;
    flex: 1;
    color: var(--main-subtle);
  }

  :host([active]:not([disabled])) .sub-item {
    background-color: var(--surface-selected);
    color: var(--main-default);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):hover) .sub-item {
      color: var(--main-default);
    }
  }
`;
