import { css } from "lit";
export default css`
  :host([divide]) ::slotted(zeta-list-item:not(:last-child)) {
    box-shadow: 0 var(--border-size-medium) 0 -1px var(--border-default);
  }
`;
