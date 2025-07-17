import { css } from "lit";
export default css`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
    background-color: var(--surface-default);
    box-sizing: border-box;
  }
  :host([inCard]) {
    border: var(--border-size-small) solid var(--border-subtle);
  }
  :host(:not([inCard])) {
    border: var(--border-size-small) solid transparent;
  }

  :host([rounded]) {
    border-radius: var(--radius-rounded);
  }

  :host([inCard]) ::slotted(zeta-accordion-item:not(:first-child))::before {
    content: "";
    height: var(--border-size-small);
    background: var(--border-subtle);
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
  }
`;
