import { css } from "lit";
export default css`
  :host {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    --_row-fill: var(--interactive-neutral-background-default);
  }
  :host([hidden]) {
    display: none;
  }
  /* Contourable rounds every direct child; the cells of a row stay square. */
  :host > * {
    border-radius: 0;
  }
  :host(:hover) {
    --_row-fill: var(--interactive-neutral-background-hover);
  }
  :host([selected]) {
    --_row-fill: var(--interactive-neutral-background-selected);
  }
  :host([disabled]) {
    --_row-fill: var(--interactive-neutral-background-default);
    /* ponytail: no opacity token exists; swap for one when the design system adds it. */
    --_row-content-opacity: 0.4;
  }
  :host([disabled]) ::slotted(*) {
    pointer-events: none;
  }
  :host([rounded]) {
    --_table-control-radius: var(--radius-sm);
  }
  :host([rounded="false"]) {
    --_table-control-radius: var(--radius-none);
    --_table-menu-radius: var(--radius-none);
  }
  [part="select"],
  [part="actions"] {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--space-md);
    background-color: var(--_row-fill);
    border-bottom: var(--stroke-thin) solid var(--border-subtle);
  }
  [part="select"].frozen {
    position: sticky;
    left: 0;
    z-index: 1;
  }
`;
