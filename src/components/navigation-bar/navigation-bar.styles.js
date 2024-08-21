import { css } from "lit";
export default css`
  :host {
    border-top: var(--border-size-small) solid var(--border-default);
    display: flex;
    /* justify-content: space-around; */
    align-items: stretch;
  }

  ::slotted(.divider)::before {
    content: "";
    width: var(--border-size-small);
    background-color: var(--border-default);
    display: block;
    height: 100%;
    position: absolute;
    left: 50%;
  }

  ::slotted(.divider) {
    display: flex;
    flex: 2;
    position: relative;
    margin: var(--spacing-small) 0;
  }

  ::slotted(.spacer) {
    display: flex;
    flex: 1;
  }

  :host([shrinkItems]) ::slotted(zeta-grid-menu-item) {
    width: 62px;
    flex: 0;
  }

  :host([shrinkItems]) ::slotted(zeta-button) {
    flex: 0;
  }

  :host([shrinkItems]) ::slotted(.divider) {
    flex: 0;
    width: 62px;
    margin: 0 var(--spacing-6xl);
  }

  ::slotted(zeta-button) {
    margin: var(--spacing-large) var(--spacing-6);
    flex: 1;
  }
`;
