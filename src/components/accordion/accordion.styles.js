import { css } from "lit";
export default css`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
    background-color: var(--surface-section);
    box-sizing: border-box;
  }
  :host([inCard]) {
    border: var(--stroke-thin) solid var(--border-subtle);
  }
  :host(:not([inCard])) {
    border: var(--stroke-thin) solid transparent;
  }

  :host([rounded]) {
    border-radius: var(--radius-md);
  }

  :host([inCard]) ::slotted(zeta-accordion-item:not(:first-child))::before {
    content: "";
    height: var(--stroke-thin);
    background: var(--border-subtle);
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
  }
`;
