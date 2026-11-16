import { css } from "lit";
export default css`
  :host {
    display: block;
    --_table-radius: var(--radius-none);
    --_table-control-radius: var(--radius-none);
    --_table-menu-radius: var(--radius-none);
    --_column-min-width: var(--table-column-min-width, calc(var(--control-lg) * 2));
    border-radius: var(--_table-radius);
    overflow: hidden;
    background-color: var(--surface-section);
    color: var(--foreground-primary);
    font: var(--body-small);
  }
  :host([rounded]) {
    --_table-radius: var(--radius-element-md);
    --_table-control-radius: var(--radius-sm);
    --_table-menu-radius: var(--radius-element-md);
  }
  :host([rounded="false"]) {
    --_table-radius: var(--radius-none);
    --_table-control-radius: var(--radius-none);
    --_table-menu-radius: var(--radius-none);
  }
  :host([hidden]) {
    display: none;
  }
  /* Contourable rounds every direct child; the table's own corners do the rounding instead. */
  :host > * {
    border-radius: 0;
  }

  /* ---- Controls bar and footer ---- */
  [part="controls"],
  [part="footer"] {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: var(--control-sm);
    padding: var(--space-md) var(--space-lg);
    background-color: var(--surface-section);
  }
  .count {
    margin-inline-end: auto;
  }
  [part="controls"] zeta-search {
    width: var(--table-search-width, calc(var(--control-sm) * 8));
  }
  [part="controls"] .settings {
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);
    background-color: var(--interactive-neutral-background-default);
  }
  [part="controls"] .settings:hover {
    border-color: var(--interactive-neutral-border-hover);
    background-color: var(--interactive-neutral-background-hover);
  }
  [part="footer"] {
    justify-content: space-between;
  }
  .footer-start {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
    color: var(--foreground-secondary);
  }
  .page-size {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  .page-size select {
    height: var(--control-sm);
    padding: 0 var(--space-sm);
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);
    border-radius: var(--_table-control-radius);
    background-color: var(--interactive-neutral-background-default);
    color: var(--interactive-neutral-foreground-default);
    font: var(--body-small);
    cursor: pointer;
  }
  .page-size select:hover {
    border-color: var(--interactive-neutral-border-hover);
  }
  .page-size select:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  /* ---- Content grid: rows are subgrids of these column tracks ---- */
  [part="content"] {
    display: grid;
    align-content: start;
    max-height: var(--table-content-max-height, none);
    overflow: auto;
    background-color: var(--interactive-neutral-background-default);
  }
  [part="header"] {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    position: sticky;
    top: 0;
    z-index: 2;
  }
  [role="columnheader"] {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    position: relative;
    padding: var(--space-md) var(--space-lg);
    background-color: var(--interactive-neutral-background-default);
    border-block: var(--stroke-thin) solid var(--border-default);
    color: var(--foreground-primary);
    font: var(--label-medium);
  }
  [role="columnheader"].data {
    min-width: var(--_column-min-width);
  }
  [role="columnheader"].select,
  [role="columnheader"].actions {
    justify-content: center;
    padding: 0 var(--space-md);
  }
  [role="columnheader"].frozen {
    position: sticky;
    z-index: 1;
  }
  [role="columnheader"].select.frozen {
    left: 0;
  }
  [role="columnheader"].frozen-edge {
    box-shadow: inset calc(-1 * var(--stroke-thin)) 0 0 var(--border-default);
  }
  [role="columnheader"].sortable:hover {
    background-color: var(--interactive-neutral-background-hover);
  }
  [role="columnheader"]:has(.sort:focus-visible) {
    background-color: var(--interactive-neutral-background-focused);
    box-shadow: inset 0 0 0 var(--stroke-thick) var(--border-focus);
  }
  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sort {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    min-width: 0;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .sort:focus-visible {
    outline: none;
  }
  .sort-icon {
    --icon-size: var(--control-icon-sm);
    color: var(--foreground-tertiary);
  }
  .sort:hover .sort-icon {
    color: var(--foreground-secondary);
  }
  .filter {
    margin-inline-start: auto;
    width: auto;
    height: auto;
    --icon-size: var(--control-icon-sm);
  }
  .filter.filtered {
    color: var(--foreground-cursor);
  }
  .grip {
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    width: var(--space-sm);
    cursor: col-resize;
    touch-action: none;
  }
  .grip::after {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    width: var(--stroke-thick);
  }
  .grip:hover::after {
    background-color: var(--interactive-neutral-border-hover);
  }
  .grip:focus-visible {
    outline: none;
  }
  .grip:focus-visible::after {
    background-color: var(--border-focus);
  }
  .empty {
    grid-column: 1 / -1;
    padding: var(--space-md) var(--space-lg);
    background-color: var(--interactive-neutral-background-default);
    border-bottom: var(--stroke-thin) solid var(--border-subtle);
    color: var(--foreground-secondary);
    font: var(--body-xsmall);
  }
`;
