import { css } from "lit";
export default css`
  ::part(body) {
    padding-block: var(--spacing-medium);
    padding-inline-end: var(--spacing-medium);
    padding-top: var(--spacing-medium);
    padding-bottom: var(--spacing-medium);
    background: var(--surface-default);
    display: flex;
    gap: var(--spacing-large);
    justify-content: space-between;
    align-items: center;
    color: var(--main-default);
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: background-color 100ms ease-out;
  }

  :host(:not([disabled])[active])::part(body) {
    background-color: var(--surface-selected);
  }
  .children {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 250ms ease-out;
    > div {
      overflow: hidden;
    }
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):hover) {
      color: var(--main-hover);
    }
    :host(:not([disabled]):hover)::part(body) {
      background: var(--surface-hover);
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
