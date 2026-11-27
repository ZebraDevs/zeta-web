import { css } from "lit";
export default css`
  :host {
    display: block;
    /* Fills a parent that has its own height, so the footer floats to the bottom of it. In a parent that sizes to its content this is just auto */
    height: 100%;
    font: var(--body-small);
    color: var(--foreground-primary);

    /* Private sizing, shared by the column widths and the frozen offsets */
    --_table-select-col-width: calc(var(--control-target-min) + var(--space-md) * 2);
    --_table-expand-col-width: var(--control-target-min);
    --_table-actions-col-width: calc(var(--control-target-min) + var(--space-md) * 2);
    --_table-radius: var(--radius-element-md);
    --_table-control-radius: var(--radius-element-sm);

    /* Layout */
    --table-width: 100%;
    --table-border-color: var(--border-default);

    /* Header */
    --table-header-bg: var(--interactive-neutral-background-default);
    --table-header-text: var(--foreground-primary);
    --table-header-font-size: var(--label-medium-font-size);
    --table-header-font-weight: var(--label-medium-font-weight);
    --table-header-height: calc(var(--space-md) * 2 + var(--label-medium-line-height));
    --table-header-border-bottom: var(--stroke-thin) solid var(--table-border-color);

    /* Rows */
    --table-row-height: calc(var(--space-md) * 2 + var(--control-sm));
    --table-row-bg: var(--interactive-neutral-background-default);
    --table-row-hover-bg: var(--interactive-neutral-background-hover);
    --table-row-selected-bg: var(--interactive-neutral-background-selected);
    --table-row-active-bg: var(--interactive-neutral-background-selected);
    --table-row-clickable-cursor: pointer;

    /* Columns */
    --table-cell-padding-y: var(--space-md);
    --table-cell-padding-x: var(--space-lg);
    --table-cell-padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
    --table-cell-font-size: var(--body-small-font-size);

    /* Frozen */
    --table-frozen-shadow: var(--elevation-2);

    /* Sort */
    --table-sort-active-color: var(--foreground-cursor);
    --table-sort-inactive-color: var(--foreground-tertiary);

    /* Resize */
    --table-resize-handle-color: var(--interactive-neutral-border-hover);

    /* Toolbar */
    --table-toolbar-bg: var(--surface-section);
    --table-search-min-width: calc(var(--control-sm) * 7 + var(--space-xl) + var(--space-xs));
    /* Footer / Pagination */
    --table-footer-bg: var(--surface-section);

    /* Data count badge */
    --table-data-count-bg: var(--feedback-info-background-subtle);
    --table-data-count-color: var(--feedback-info-foreground);
  }

  :host([shape="sharp"]) {
    --_table-radius: var(--radius-none);
    --_table-control-radius: var(--radius-none);
  }

  .zeta-table-wrapper {
    display: flex;
    flex-direction: column;
    border-radius: var(--table-border-radius, var(--_table-radius));
    overflow: hidden;
    background: var(--table-row-bg);
    width: var(--table-width);
    /* Fills a host that has its own height, so the footer sits at the bottom of it */
    height: 100%;
    box-sizing: border-box;
  }

  /* Header bar (title + data count + toolbar actions) */
  .zeta-table-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    min-height: calc(var(--control-sm) + var(--space-md) * 2);
    background: var(--table-toolbar-bg);
    box-sizing: border-box;
  }

  .zeta-table-header-bar-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
  }

  .zeta-table-header-meta {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  /* Live region wrapper for the selected count; kept in the DOM so changes are announced */
  .zeta-table-selected-count {
    display: inline-flex;
    align-items: center;
  }

  .zeta-table-header-bar-right {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-left: auto;
  }

  .zeta-table-title {
    font: var(--title-medium);
    color: var(--table-header-text);
  }

  .zeta-table-data-count {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    background: var(--table-data-count-bg);
    color: var(--table-data-count-color);
    font: var(--label-small);
    padding: var(--space-3xs) var(--space-sm);
    border-radius: var(--radius-pill);
  }

  zeta-search.zeta-table-global-search {
    min-width: var(--table-search-min-width);
  }

  /* Column panel */
  .zeta-table-column-panel-wrapper {
    position: relative;
  }

  .zeta-table-column-panel {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 100;
    min-width: calc(var(--control-sm) * 7);
    max-height: calc(var(--control-sm) * 10);
    overflow-y: auto;
    background: var(--surface-menu);
    border: var(--stroke-thin) solid var(--table-border-color);
    border-radius: var(--table-border-radius, var(--_table-radius));
    box-shadow: var(--elevation-3);
    padding: var(--space-xs);
    margin-top: var(--space-2xs);
    box-sizing: border-box;
  }

  .zeta-table-column-panel-section {
    padding: var(--space-xs) 0;
    border-bottom: var(--stroke-thin) solid var(--border-subtle);
  }

  .zeta-table-column-panel-section:last-child {
    border-bottom: none;
  }

  .zeta-table-column-panel-heading {
    padding: var(--space-xs) var(--space-md);
    font: var(--label-small);
    color: var(--foreground-secondary);
  }

  .zeta-table-column-panel-item {
    display: flex;
    padding: 0 var(--space-xs);
    font: var(--body-small);
    cursor: pointer;
  }

  .zeta-table-column-panel-item[disabled] {
    cursor: default;
  }

  .zeta-table-column-panel-item:hover {
    background: var(--table-row-hover-bg);
  }

  /* Scroll container */
  .zeta-table-scroll {
    overflow: auto;
    position: relative;
    max-height: var(--table-max-height, none);
    overflow-anchor: auto;
    /* The content takes the room between the controls bar and the footer, so a host with its own height keeps the footer at the bottom */
    flex: 1 1 auto;
    min-height: 0;
  }

  /* With Vertical Scroll the content height is capped and the rows scroll under the sticky header */
  :host([verticalscroll]) .zeta-table-scroll {
    max-height: var(--table-max-height, calc(var(--table-header-height) + var(--table-row-height) * 7));
  }

  /* With numbered pagination and a height cap, the content always takes the whole cap. The footer stays put
     whatever the number of rows on the page (a last page, or a search with few results) */
  .zeta-table-scroll--paginated {
    min-height: var(--table-max-height, 0px);
  }

  :host([verticalscroll]) .zeta-table-scroll--paginated {
    min-height: var(--table-max-height, calc(var(--table-header-height) + var(--table-row-height) * 7));
  }

  /* Table */
  .zeta-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
  }

  .zeta-table-thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .zeta-table-thead tr {
    background: var(--table-header-bg);
  }

  .zeta-table-th,
  .zeta-table-td {
    padding: var(--table-cell-padding);
    text-align: left;
    border-bottom: var(--stroke-thin) solid var(--table-row-border-color, var(--border-subtle));
    position: relative;
    box-sizing: border-box;
    vertical-align: middle;
  }

  .zeta-table-th {
    font: var(--label-medium);
    font-size: var(--table-header-font-size);
    font-weight: var(--table-header-font-weight);
    color: var(--table-header-text);
    white-space: nowrap;
    user-select: none;
    background: var(--table-header-bg);
    height: calc(var(--table-header-height) + var(--stroke-thin) * 2);
    border-top: var(--stroke-thin) solid var(--table-border-color);
    border-bottom: var(--table-header-border-bottom);
  }

  .zeta-table-td {
    font-size: var(--table-cell-font-size);
    background: var(--table-row-bg);
  }

  .zeta-table-td--data {
    padding: 0;
  }

  .zeta-table-cell-inner {
    padding: var(--table-cell-padding);
    height: var(--table-row-height);
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  ::slotted([slot^="cell-"]) {
    display: contents;
  }

  .zeta-table-cell-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    cursor: inherit;
  }

  /* Row states */
  .zeta-table-row:hover .zeta-table-td {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-row--clickable,
  .zeta-table-row--clickable .zeta-table-td,
  .zeta-table-row--clickable .zeta-table-td * {
    cursor: var(--table-row-clickable-cursor);
  }

  .zeta-table-row--clickable:active .zeta-table-td {
    background: var(--table-row-selected-bg);
  }

  .zeta-table-row--active .zeta-table-td {
    background: var(--table-row-active-bg);
    box-shadow:
      inset 0 var(--stroke-thick) 0 0 var(--border-focus),
      inset 0 calc(-1 * var(--stroke-thick)) 0 0 var(--border-focus);
  }

  .zeta-table-row--active .zeta-table-td:first-child {
    box-shadow:
      inset var(--stroke-thick) 0 0 0 var(--border-focus),
      inset 0 var(--stroke-thick) 0 0 var(--border-focus),
      inset 0 calc(-1 * var(--stroke-thick)) 0 0 var(--border-focus);
  }

  .zeta-table-row--active .zeta-table-td:last-child {
    box-shadow:
      inset calc(-1 * var(--stroke-thick)) 0 0 0 var(--border-focus),
      inset 0 var(--stroke-thick) 0 0 var(--border-focus),
      inset 0 calc(-1 * var(--stroke-thick)) 0 0 var(--border-focus);
  }

  .zeta-table-row--active .zeta-table-cell--frozen-last {
    box-shadow:
      var(--table-frozen-shadow),
      inset 0 var(--stroke-thick) 0 0 var(--border-focus),
      inset 0 calc(-1 * var(--stroke-thick)) 0 0 var(--border-focus);
  }

  .zeta-table-row--selected .zeta-table-td {
    background: var(--table-row-selected-bg);
  }

  /* A disabled row keeps the plain fill (no hover or selected fill) and dims everything in it */
  .zeta-table-row--disabled .zeta-table-td,
  .zeta-table-row--disabled:hover .zeta-table-td,
  .zeta-table-row--disabled .zeta-table-cell--frozen,
  .zeta-table-row--disabled:hover .zeta-table-cell--frozen {
    background: var(--table-row-bg);
  }

  .zeta-table-row--disabled .zeta-table-cell-inner {
    opacity: 0.5;
  }

  .zeta-table-row--disabled .zeta-table-td,
  .zeta-table-row--disabled .zeta-table-td span,
  .zeta-table-row--disabled .zeta-table-td .zeta-table-cell-content {
    color: var(--foreground-disabled) !important;
  }

  /* Frozen columns */
  .zeta-table-cell--frozen {
    position: sticky;
    z-index: 8;
    background: var(--table-row-bg);
  }

  .zeta-table-row:hover .zeta-table-cell--frozen {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-row--selected .zeta-table-cell--frozen {
    background: var(--table-row-selected-bg);
  }

  .zeta-table-row--active .zeta-table-cell--frozen {
    background: var(--table-row-active-bg);
  }

  .zeta-table-thead .zeta-table-cell--frozen {
    z-index: 16;
    background: var(--table-header-bg);
  }

  .zeta-table-cell--frozen-last {
    box-shadow: var(--table-frozen-shadow);
    clip-path: inset(0 calc(-1 * var(--space-md)) 0 0);
  }

  /* Checkbox column */
  .zeta-table-col-checkbox {
    width: var(--_table-select-col-width);
    min-width: var(--_table-select-col-width);
    max-width: var(--_table-select-col-width);
    text-align: center;
    padding: 0;
  }

  .zeta-table-select-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Accessible name for a checkbox without a visible label (slotted into zeta-checkbox's label) */
  .zeta-table-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  /* Expand column */
  .zeta-table-col-expand {
    width: var(--_table-expand-col-width);
    min-width: var(--_table-expand-col-width);
    max-width: var(--_table-expand-col-width);
    text-align: center;
    padding: var(--table-cell-padding-y) var(--space-2xs);
  }

  .zeta-table-expand-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--control-icon-md);
    height: var(--control-icon-md);
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition:
      background 0.15s,
      transform 0.2s;
  }

  .zeta-table-expand-btn:hover {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-expand-btn:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  .zeta-table-expand-btn zeta-icon {
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-secondary);
    transition: transform 0.2s;
  }

  .zeta-table-expand-btn--expanded zeta-icon {
    transform: rotate(90deg);
  }

  /* Nested row */
  .zeta-table-nested-row .zeta-table-td {
    padding: 0;
    border-bottom: var(--stroke-thin) solid var(--table-row-border-color, var(--border-subtle));
  }

  .zeta-table-nested-content {
    padding: var(--space-md) var(--space-md) var(--space-md) var(--space-5xl);
    background: var(--table-row-bg);
  }

  .zeta-table-nested-table {
    width: 100%;
    border-collapse: collapse;
  }

  .zeta-table-nested-th {
    padding: var(--space-xs) var(--space-md);
    text-align: left;
    font: var(--label-small);
    border-bottom: var(--stroke-thin) solid var(--table-border-color);
  }

  .zeta-table-nested-td {
    padding: var(--space-xs) var(--space-md);
    font: var(--body-small);
    border-bottom: var(--stroke-thin) solid var(--table-row-border-color, var(--border-subtle));
  }

  .zeta-table-cell--frozen-start {
    left: 0;
  }

  .zeta-table-cell--frozen-after-checkbox {
    left: var(--_table-select-col-width);
  }

  /* Only the header cell sits above the sticky header. A body cell here must stay below it (z-index 8, from the frozen rule),
     or the checkbox column would scroll over the header */
  .zeta-table-thead .zeta-table-col-checkbox.zeta-table-cell--frozen-start {
    z-index: 16;
  }

  .zeta-table-col-checkbox-width {
    width: var(--_table-select-col-width);
  }

  .zeta-table-col-expand-width {
    width: var(--_table-expand-col-width);
  }

  .zeta-table-filter-icon {
    --icon-size: var(--control-icon-xs);
  }

  .zeta-table-action-menu-icon {
    --icon-size: var(--control-icon-sm);
  }

  /* Sort indicators */
  .zeta-table-header-content {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    width: 100%;
  }

  .zeta-table-header-title {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: default;
  }

  button.zeta-table-header-title--sortable {
    all: unset;
    cursor: pointer;
    font: inherit;
    color: inherit;
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button.zeta-table-header-title--sortable:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  .zeta-table-header-title--sortable:hover {
    color: var(--foreground-primary);
  }

  .zeta-table-header-icons {
    display: flex;
    align-items: center;
    gap: var(--space-3xs);
    flex-shrink: 0;
    margin-left: auto;
  }

  .zeta-table-header-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: var(--radius-sm);
    width: var(--control-icon-md);
    height: var(--control-icon-md);
    padding: 0;
    color: var(--foreground-primary);
    transition:
      background 0.12s,
      color 0.12s;
  }

  .zeta-table-header-icon-btn:hover {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-header-icon-btn:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  .zeta-table-header-icon-btn zeta-icon {
    --icon-color: currentColor;
  }

  .zeta-table-sort-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    height: var(--control-icon-xs);
    padding: 0 var(--space-3xs);
    border-radius: var(--radius-sm);
    background: none;
    border: none;
    color: inherit;
  }

  .zeta-table-sort-btn:hover {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-sort-btn:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  /* A filtered column keeps its glyph in the cursor foreground */
  .zeta-table-header-icon-btn--active {
    color: var(--foreground-cursor);
  }

  /* Filter panel dropdown */
  .zeta-table-filter-panel {
    position: fixed;
    z-index: 9999;
    min-width: calc(var(--control-sm) * 5);
    max-width: calc(var(--control-sm) * 7);
    max-height: calc(var(--control-sm) * 8);
    background: var(--surface-menu);
    border: var(--stroke-thin) solid var(--table-border-color);
    border-radius: var(--table-border-radius, var(--_table-radius));
    box-shadow: var(--elevation-3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: var(--space-xs);
    box-sizing: border-box;
    font: var(--body-small);
  }

  .zeta-table-filter-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xs) var(--space-md);
    font: var(--label-small);
    border-bottom: var(--stroke-thin) solid var(--border-subtle);
  }

  .zeta-table-filter-panel-list {
    overflow-y: auto;
    padding: var(--space-xs) 0;
    flex: 1;
  }

  .zeta-table-filter-panel-item {
    display: flex;
    align-items: center;
    padding: 0 var(--space-xs);
    font: var(--body-small);
  }

  .zeta-table-filter-panel-item:hover {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-filter-panel-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md) var(--space-xs);
    border-top: var(--stroke-thin) solid var(--border-subtle);
  }

  .zeta-table-filter-panel-btn {
    padding: var(--space-2xs) var(--space-md);
    font: var(--label-small);
    border-radius: var(--radius-sm);
    cursor: pointer;
    border: var(--stroke-thin) solid transparent;
    transition: background 0.12s;
  }

  .zeta-table-filter-panel-btn:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  .zeta-table-filter-panel-btn--clear {
    background: var(--interactive-neutral-background-default);
    border-color: var(--interactive-neutral-border-default);
    color: var(--interactive-neutral-foreground-default);
  }

  .zeta-table-filter-panel-btn--clear:hover {
    background: var(--interactive-neutral-background-hover);
  }

  .zeta-table-filter-panel-btn--apply {
    background: var(--interactive-primary-background-default);
    color: var(--interactive-primary-foreground-default);
    border-color: var(--interactive-primary-border-default);
  }

  .zeta-table-filter-panel-btn--apply:hover {
    background: var(--interactive-primary-background-hover);
  }

  .zeta-table-sort-icons {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  /* Two halves of one caret icon: the up triangle sits above the down triangle, filling a --control-icon-xs square together */
  .zeta-table-sort-arrow {
    width: var(--control-icon-xs);
    height: calc(var(--control-icon-xs) / 2);
    display: block;
    cursor: pointer;
    box-sizing: border-box;
  }

  .zeta-table-sort-arrow:hover path {
    fill: var(--foreground-secondary);
  }

  .zeta-table-sort-arrow path {
    fill: var(--table-sort-inactive-color);
    transition: fill 0.15s;
  }

  .zeta-table-sort-arrow--active path,
  .zeta-table-sort-arrow--active:hover path {
    fill: var(--table-sort-active-color);
  }

  /* Resize handle: a full cell height bar, in the neutral hover border while hovered and in the focus border while dragging */
  .zeta-table-resize-handle {
    position: absolute;
    top: 0;
    right: 0;
    width: var(--space-xs);
    height: 100%;
    cursor: col-resize;
    background: transparent;
    z-index: 20;
  }

  .zeta-table-resize-handle::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: var(--stroke-thick);
    height: 100%;
    background: transparent;
    transition: background 0.15s;
  }

  .zeta-table-resize-handle:hover::after {
    background: var(--table-resize-handle-color);
  }

  .zeta-table-resize-handle--active::after {
    background: var(--border-focus);
  }

  /* Footer / Pagination */
  .zeta-table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    min-height: calc(var(--control-sm) + var(--space-md) * 2);
    background: var(--table-footer-bg);
    font: var(--body-small);
    color: var(--foreground-secondary);
    box-sizing: border-box;
  }

  .zeta-table-page-info {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
  }

  .zeta-table-page-details {
    color: var(--foreground-secondary);
  }

  .zeta-table-rows-per-page {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  zeta-select-input.zeta-table-page-size-select {
    min-width: calc(var(--control-sm) * 2);
  }

  /* Infinite scroll */
  .zeta-table-infinite-sentinel {
    height: var(--stroke-thin);
    width: 100%;
    overflow-anchor: none;
  }

  .zeta-table-loading-row {
    overflow-anchor: none;
  }

  .zeta-table-loading-row .zeta-table-td {
    text-align: center;
    padding: var(--space-lg);
    color: var(--foreground-secondary);
  }

  /* Tooltip */
  .zeta-table-tooltip {
    position: fixed;
    z-index: 9999;
    padding: var(--space-xs) var(--space-md);
    background: var(--surface-tooltip);
    color: var(--foreground-inverse);
    border-radius: var(--radius-sm);
    font: var(--body-xsmall);
    max-width: calc(var(--control-sm) * 8);
    word-wrap: break-word;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    box-shadow: var(--elevation-2);
  }

  .zeta-table-tooltip--visible {
    opacity: 1;
  }

  /* No data: one row spanning every column */
  .zeta-table-no-data {
    text-align: center;
    padding: var(--space-md) var(--space-lg);
    color: var(--foreground-secondary);
    font: var(--body-xsmall);
  }

  /* Actions column (more button) */
  .zeta-table-col-actions {
    width: var(--_table-actions-col-width);
    min-width: var(--_table-actions-col-width);
    text-align: right;
    position: sticky;
    right: 0;
    background: inherit;
    padding-top: 0;
    padding-bottom: 0;
    padding-inline: var(--space-md);
  }

  .zeta-table-thead .zeta-table-col-actions {
    background: var(--table-header-bg);
    z-index: 16;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .zeta-table-action-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }

  /* The row's more button is transparent, so the row's own fill shows through, selected or not */
  .zeta-table-action-btn {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--control-sm);
    height: var(--control-sm);
    margin: 0;
    padding: 0;
    color: var(--foreground-primary);
    background: transparent;
    border: var(--stroke-thin) solid transparent;
    border-radius: var(--_table-control-radius);
    cursor: pointer;
  }

  .zeta-table-action-btn zeta-icon {
    --icon-color: currentColor;
    --icon-size: var(--control-icon-sm);
  }

  .zeta-table-action-btn:hover {
    background: var(--interactive-neutral-background-hover);
  }

  .zeta-table-action-btn:active {
    background: var(--interactive-neutral-background-pressed);
  }

  .zeta-table-action-btn--active {
    background: var(--interactive-neutral-background-default);
    border-color: var(--interactive-neutral-border-default);
  }

  .zeta-table-action-btn:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(var(--stroke-thick) * -1);
  }

  .zeta-table-action-menu {
    position: fixed;
    z-index: 9999;
    min-width: calc(var(--control-sm) * 4);
    max-height: calc(var(--control-sm) * 6);
    overflow-y: auto;
    background: var(--surface-menu);
    border: var(--stroke-thin) solid var(--table-border-color);
    border-radius: var(--table-border-radius, var(--_table-radius));
    box-shadow: var(--elevation-3);
    padding: var(--space-xs);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .zeta-table-action-menu-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    font: var(--body-small);
    color: var(--interactive-ghost-foreground-default);
    background: var(--interactive-ghost-background-default);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    transition: background 0.12s;
  }

  .zeta-table-action-menu-item:hover:not(:disabled) {
    background: var(--interactive-ghost-background-hover);
  }

  .zeta-table-action-menu-item:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  .zeta-table-action-menu-item--disabled {
    color: var(--interactive-ghost-foreground-disabled);
    cursor: not-allowed;
  }

  .zeta-table-action-icon {
    display: inline-flex;
    align-items: center;
    font: var(--label-large);
  }

  .zeta-table-action-icon zeta-icon {
    --icon-color: currentColor;
    --icon-size: var(--control-icon-sm);
  }

  .zeta-table-action-label {
    flex: 1;
  }
`;
