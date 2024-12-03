import { css } from "lit";
export default css`
  :host {
    width: min-content;
    display: block;
    white-space: nowrap;
    background-color: var(--surface-default);
    color: var(--main-subtle);
    padding: var(--spacing-medium) var(--spacing-large);
    font: var(--title-medium);
  }

  :host(:not([disabled]):hover),
  :host(:not([disabled]):active),
  :host(:not([disabled])[active]) {
    color: var(--main-default);
  }

  :host([disabled]) {
    color: var(--main-disabled);
  }

  :host([active]) {
    border-bottom: 2px solid var(--border-primary);
  }
`;
