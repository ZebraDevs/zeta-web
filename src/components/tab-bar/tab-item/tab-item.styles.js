import { css } from "lit";
export default css`
  :host {
    width: min-content;
    display: block;
    white-space: nowrap;
    background-color: var(--surface-default);
    color: var(--text-subtle);
    padding: var(--spacing-3) var(--spacing-4);
    font: var(--title-medium);
  }

  :host(:not([disabled]):hover),
  :host(:not([disabled]):active),
  :host(:not([disabled])[active]) {
    color: var(--text-default);
  }

  :host([disabled]) {
    color: var(--text-disabled);
  }

  :host([active]) {
    border-bottom: 2px solid var(--border-flavor-primary);
  }
`;
