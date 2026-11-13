import { css } from "lit";
export default css`
  :host {
    display: flex;
    align-items: center;
    min-width: 0;
    padding: var(--space-md) var(--space-lg);
    background-color: var(--_row-fill, var(--interactive-neutral-background-default));
    border-bottom: var(--stroke-thin) solid var(--border-subtle);
    color: var(--foreground-primary);
    font: var(--body-small);
  }
  :host([hidden]),
  :host(:state(hidden)) {
    display: none;
  }
  :host(:state(frozen)) {
    position: sticky;
    left: var(--_frozen-left);
    z-index: 1;
  }
  :host(:state(frozen-edge)) {
    box-shadow: inset calc(-1 * var(--stroke-thin)) 0 0 var(--border-default);
  }
  [part="content"] {
    min-width: 0;
    /* Room for borders and focus rings drawn just outside slotted controls, which overflow: hidden would cut off. */
    padding: var(--stroke-thick);
    margin: calc(-1 * var(--stroke-thick));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: var(--_row-content-opacity, 1);
  }
`;
