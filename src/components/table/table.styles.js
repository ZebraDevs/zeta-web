import { css } from "lit";
export default css`
  zeta-table {
    display: block;
    font-family: var(--type-family-regular);
    font-size: var(--table-font-size, 14px);
    color: var(--main-default);

    /* Layout */
    --table-width: 100%;
    --table-max-height: none;
    --table-border-color: var(--border-default);
    --table-border-radius: var(--radius-rounded);

    /* Header */
    --table-header-bg: var(--surface-default);
    --table-header-text: var(--main-default);
    --table-header-font-size: 12px;
    --table-header-font-weight: 600;
    --table-header-height: var(--spacing-6xl);
    --table-header-border-bottom: var(--border-size-medium) solid var(--table-border-color);

    /* Rows */
    --table-row-height: var(--spacing-6xl);
    --table-row-bg: var(--surface-default);
    --table-row-hover-bg: var(--surface-hover);
    --table-row-selected-bg: var(--surface-selected);
    --table-row-active-bg: var(--surface-selected-hover);
    --table-row-clickable-cursor: pointer;

    /* Columns */
    --table-cell-padding-y: var(--spacing-2-5);
    --table-cell-padding-x: var(--spacing-medium);
    --table-cell-padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
    --table-cell-font-size: 14px;

    /* Frozen */
    --table-frozen-shadow: var(--elevation-2);

    /* Sort */
    --table-sort-active-color: var(--main-primary);
    --table-sort-inactive-color: var(--main-disabled);

    /* Resize */
    --table-resize-handle-color: var(--main-primary);

    /* Toolbar */
    --table-toolbar-bg: var(--surface-default);
    /* Footer / Pagination */
    --table-footer-bg: var(--surface-default);

    /* Data count badge */
    --table-data-count-bg: var(--surface-selected);
    --table-data-count-color: var(--main-primary);
  }

  .zeta-table-wrapper {
    display: flex;
    flex-direction: column;
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--table-border-radius);
    overflow: hidden;
    background: var(--table-row-bg);
    width: var(--table-width);
    box-shadow: var(--elevation-1);
  }

  /* Header bar (title + data count + toolbar actions) */
  .zeta-table-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-2-5) var(--spacing-large);
    border-bottom: var(--border-size-small) solid var(--table-border-color);
    background: var(--table-toolbar-bg);
  }

  .zeta-table-header-bar-left {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-0-5);
  }

  .zeta-table-header-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-medium);
    margin-top: var(--spacing-0-5);
  }

  .zeta-table-header-bar-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-1-5);
  }

  .zeta-table-title {
    font: var(--title-medium);
    font-weight: 600;
    color: var(--table-header-text);
  }

  .zeta-table-data-count {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-minimum);
    background: var(--table-data-count-bg);
    color: var(--table-data-count-color);
    font: var(--label-small);
    padding: var(--spacing-0-5) var(--spacing-2-5);
    border-radius: var(--spacing-medium);
  }

  .zeta-table-global-search {
    display: flex;
    align-items: center;
    gap: var(--spacing-1-5);
    background: var(--surface-default);
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--radius-minimal);
    padding: var(--spacing-1-5) var(--spacing-medium);
    min-width: 280px;
    max-width: 320px;
  }

  .zeta-table-global-search:focus-within {
    border-color: var(--main-primary);
    box-shadow: 0 0 0 var(--border-size-medium) var(--surface-primary-subtle);
  }

  .zeta-table-global-search-icon {
    --icon-size: var(--spacing-large);
    --icon-color: var(--main-subtle);
    flex-shrink: 0;
  }

  .zeta-table-global-search-input {
    border: none;
    outline: none;
    font: var(--body-x-small);
    width: 100%;
    background: transparent;
    color: var(--main-default);
  }

  .zeta-table-global-search-input::placeholder {
    color: var(--main-subtle);
  }

  .zeta-table-toolbar-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-minimum);
    padding: var(--spacing-1-5) var(--spacing-small);
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--radius-minimal);
    background: var(--table-row-bg);
    cursor: pointer;
    font: var(--body-x-small);
    color: var(--main-default);
    transition:
      background 0.15s,
      border-color 0.15s;
  }

  .zeta-table-toolbar-btn:hover {
    background: var(--table-row-hover-bg);
    border-color: var(--main-primary);
  }

  .zeta-table-toolbar-btn--icon {
    padding: var(--spacing-1-5) var(--spacing-small);
  }

  .zeta-table-toolbar-btn zeta-icon {
    --icon-size: var(--spacing-large);
    --icon-color: currentColor;
  }

  .zeta-table-selection-info {
    font: var(--body-small);
    color: var(--main-primary);
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
    min-width: 280px;
    max-height: 400px;
    overflow-y: auto;
    background: var(--surface-default);
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--radius-minimal);
    box-shadow: var(--elevation-3);
    padding: 0;
    margin-top: var(--spacing-minimum);
  }

  .zeta-table-column-panel-section {
    padding: var(--spacing-small) 0;
    border-bottom: var(--border-size-small) solid var(--table-border-color);
  }

  .zeta-table-column-panel-section:last-child {
    border-bottom: none;
  }

  .zeta-table-column-panel-heading {
    padding: var(--spacing-1-5) var(--spacing-medium) var(--spacing-minimum);
    font: var(--label-small);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--main-subtle);
  }

  .zeta-table-column-panel-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
    padding: var(--spacing-minimum) var(--spacing-medium);
    cursor: pointer;
    user-select: none;
    font: var(--body-x-small);
  }

  .zeta-table-column-panel-item:hover {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-column-panel-item input[type="checkbox"] {
    width: var(--spacing-large);
    height: var(--spacing-large);
    accent-color: var(--main-primary);
  }

  /* Scroll container */
  .zeta-table-scroll {
    overflow: auto;
    position: relative;
    max-height: var(--table-max-height);
    overflow-anchor: auto;
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
    border-bottom: var(--border-size-small) solid var(--table-border-color);
    position: relative;
    box-sizing: border-box;
    vertical-align: middle;
  }

  .zeta-table-th {
    font-weight: var(--table-header-font-weight);
    font-size: var(--table-header-font-size);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--table-header-text);
    white-space: nowrap;
    user-select: none;
    background: var(--table-header-bg);
    height: var(--table-header-height);
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
      inset 0 var(--border-size-medium) 0 0 var(--main-primary),
      inset 0 calc(-1 * var(--border-size-medium)) 0 0 var(--main-primary);
  }

  .zeta-table-row--active .zeta-table-td:first-child {
    box-shadow:
      inset var(--border-size-medium) 0 0 0 var(--main-primary),
      inset 0 var(--border-size-medium) 0 0 var(--main-primary),
      inset 0 calc(-1 * var(--border-size-medium)) 0 0 var(--main-primary);
  }

  .zeta-table-row--active .zeta-table-td:last-child {
    box-shadow:
      inset calc(-1 * var(--border-size-medium)) 0 0 0 var(--main-primary),
      inset 0 var(--border-size-medium) 0 0 var(--main-primary),
      inset 0 calc(-1 * var(--border-size-medium)) 0 0 var(--main-primary);
  }

  .zeta-table-row--active .zeta-table-cell--frozen-last {
    box-shadow:
      var(--table-frozen-shadow),
      inset 0 var(--border-size-medium) 0 0 var(--main-primary),
      inset 0 calc(-1 * var(--border-size-medium)) 0 0 var(--main-primary);
  }

  .zeta-table-row--selected .zeta-table-td {
    background: var(--table-row-selected-bg);
  }

  .zeta-table-row--disabled .zeta-table-td,
  .zeta-table-row--disabled .zeta-table-td span,
  .zeta-table-row--disabled .zeta-table-td .zeta-table-cell-content {
    color: var(--main-disabled) !important;
  }

  .zeta-table-row--disabled .zeta-table-td input[type="checkbox"] {
    opacity: 0.6;
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
    clip-path: inset(0 -10px 0 0);
  }

  /* Checkbox column */
  .zeta-table-col-checkbox {
    width: var(--spacing-7xl);
    min-width: var(--spacing-7xl);
    max-width: var(--spacing-7xl);
    text-align: center;
    padding: var(--spacing-2-5) var(--spacing-small);
  }

  .zeta-table-col-checkbox input[type="checkbox"] {
    width: var(--spacing-4-5);
    height: var(--spacing-4-5);
    accent-color: var(--main-primary);
    cursor: pointer;
  }

  .zeta-table-col-checkbox input[type="checkbox"]:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Expand column */
  .zeta-table-col-expand {
    width: var(--spacing-6xl);
    min-width: var(--spacing-6xl);
    max-width: var(--spacing-6xl);
    text-align: center;
    padding: var(--spacing-2-5) var(--spacing-minimum);
  }

  .zeta-table-expand-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--spacing-2xl);
    height: var(--spacing-2xl);
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--radius-minimal);
    transition:
      background 0.15s,
      transform 0.2s;
  }

  .zeta-table-expand-btn:hover {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-expand-btn zeta-icon {
    --icon-size: var(--spacing-large);
    --icon-color: var(--main-subtle);
    transition: transform 0.2s;
  }

  .zeta-table-expand-btn--expanded zeta-icon {
    transform: rotate(90deg);
  }

  /* Nested row */
  .zeta-table-nested-row .zeta-table-td {
    padding: 0;
    border-bottom: var(--border-size-small) solid var(--table-border-color);
  }

  .zeta-table-nested-content {
    padding: var(--spacing-medium) var(--spacing-medium) var(--spacing-medium) var(--spacing-9xl);
    background: var(--table-row-bg);
  }

  .zeta-table-nested-table {
    width: 100%;
    border-collapse: collapse;
  }

  .zeta-table-nested-th {
    padding: var(--spacing-1-5) var(--spacing-medium);
    text-align: left;
    font: var(--label-small);
    border-bottom: var(--border-size-small) solid var(--table-border-color);
  }

  .zeta-table-nested-td {
    padding: var(--spacing-1-5) var(--spacing-medium);
    font: var(--body-x-small);
    border-bottom: var(--border-size-small) solid var(--table-border-color);
  }

  .zeta-table-page-ellipsis {
    padding: 0 var(--spacing-minimum);
  }

  .zeta-table-cell--frozen-start {
    left: 0;
  }

  .zeta-table-cell--frozen-after-checkbox {
    left: var(--spacing-7xl);
  }

  .zeta-table-col-checkbox.zeta-table-cell--frozen-start {
    z-index: 16;
  }

  .zeta-table-col-checkbox-width {
    width: var(--spacing-7xl);
  }

  .zeta-table-col-expand-width {
    width: var(--spacing-6xl);
  }

  .zeta-table-filter-icon {
    --icon-size: var(--spacing-3-5);
  }

  .zeta-table-action-menu-icon {
    --icon-size: var(--spacing-4-5);
  }

  /* Sort indicators */
  .zeta-table-header-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-minimum);
    width: 100%;
  }

  .zeta-table-header-title {
    flex: 1;
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
  }

  .zeta-table-header-title--sortable:hover {
    color: var(--table-sort-active-color);
  }

  .zeta-table-header-icons {
    display: flex;
    align-items: center;
    gap: var(--spacing-0-5);
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
    border-radius: var(--radius-minimal);
    width: var(--spacing-xl);
    height: var(--spacing-xl);
    padding: 0;
    color: var(--main-subtle);
    transition:
      background 0.12s,
      color 0.12s;
  }

  .zeta-table-header-icon-btn:hover {
    background: var(--surface-hover);
    color: var(--main-primary);
  }

  .zeta-table-header-icon-btn zeta-icon {
    --icon-color: currentColor;
  }

  .zeta-table-sort-btn {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: var(--spacing-0-5);
    border-radius: var(--radius-minimal);
    background: none;
    border: none;
    color: inherit;
  }

  .zeta-table-sort-btn:hover {
    background: var(--surface-hover);
  }

  .zeta-table-header-icon-btn--active {
    color: var(--main-primary);
  }

  /* Filter panel dropdown */
  .zeta-table-filter-panel {
    position: fixed;
    z-index: 9999;
    min-width: 180px;
    max-width: 260px;
    max-height: 280px;
    background: var(--surface-default);
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--radius-minimal);
    box-shadow: var(--elevation-3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font: var(--body-x-small);
  }

  .zeta-table-filter-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-small) var(--spacing-medium);
    font: var(--label-small);
    font-weight: 600;
    border-bottom: var(--border-size-small) solid var(--table-border-color);
  }

  .zeta-table-filter-panel-list {
    overflow-y: auto;
    padding: var(--spacing-1-5) 0;
    flex: 1;
  }

  .zeta-table-filter-panel-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
    padding: var(--spacing-1-5) var(--spacing-medium);
    font: var(--body-x-small);
    cursor: pointer;
    transition: background 0.12s;
  }

  .zeta-table-filter-panel-item:hover {
    background: var(--surface-hover);
  }

  .zeta-table-filter-panel-item input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
  }

  .zeta-table-filter-panel-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-small);
    padding: var(--spacing-small) var(--spacing-medium);
    border-top: var(--border-size-small) solid var(--table-border-color);
  }

  .zeta-table-filter-panel-btn {
    padding: var(--spacing-minimum) var(--spacing-3-5);
    font: var(--body-x-small);
    border-radius: var(--radius-minimal);
    cursor: pointer;
    border: var(--border-size-small) solid transparent;
    transition: background 0.12s;
  }

  .zeta-table-filter-panel-btn--clear {
    background: none;
    border-color: var(--table-border-color);
    color: var(--table-header-text);
  }

  .zeta-table-filter-panel-btn--clear:hover {
    background: var(--surface-hover);
  }

  .zeta-table-filter-panel-btn--apply {
    background: var(--main-primary);
    color: var(--state-default-enabled);
    border-color: var(--main-primary);
  }

  .zeta-table-filter-panel-btn--apply:hover {
    background: var(--state-primary-selected);
  }

  .zeta-table-sort-icons {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .zeta-table-sort-arrow {
    width: var(--spacing-3-5);
    height: var(--spacing-3-5);
    padding: var(--spacing-0-5);
    display: block;
    cursor: pointer;
    box-sizing: border-box;
  }

  .zeta-table-sort-arrow:hover polygon {
    fill: var(--main-primary);
  }

  .zeta-table-sort-arrow polygon {
    fill: var(--table-sort-inactive-color);
    transition: fill 0.15s;
  }

  .zeta-table-sort-arrow--active polygon {
    fill: var(--table-sort-active-color);
  }

  /* Filter */
  .zeta-table-search-row .zeta-table-th {
    padding: var(--spacing-minimum) var(--spacing-small);
    background: var(--surface-default);
    border-bottom: var(--border-size-small) solid var(--table-border-color);
    height: auto;
  }

  .zeta-table-search-input {
    width: 100%;
    padding: var(--spacing-minimum) var(--spacing-small);
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--radius-minimal);
    font: var(--body-x-small);
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s;
  }

  .zeta-table-search-input:focus {
    border-color: var(--main-primary);
  }

  .zeta-table-search-input:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Resize handle */
  .zeta-table-resize-handle {
    position: absolute;
    top: 0;
    right: 0;
    width: var(--spacing-small);
    height: 100%;
    cursor: col-resize;
    background: transparent;
    transition: background 0.15s;
    z-index: 20;
  }

  .zeta-table-resize-handle::after {
    content: "";
    position: absolute;
    top: 25%;
    right: var(--spacing-0-5);
    width: var(--border-size-medium);
    height: 50%;
    background: var(--table-border-color);
    border-radius: var(--border-size-small);
    transition:
      background 0.15s,
      height 0.15s,
      top 0.15s;
  }

  .zeta-table-resize-handle:hover::after,
  .zeta-table-resize-handle--active::after {
    background: var(--table-resize-handle-color);
    top: 10%;
    height: 80%;
  }

  .zeta-table-resize-handle:hover,
  .zeta-table-resize-handle--active {
    background: var(--surface-primary-subtle);
  }

  /* Footer / Pagination */
  .zeta-table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-2-5) var(--spacing-large);
    border-top: var(--border-size-small) solid var(--table-border-color);
    background: var(--table-footer-bg);
    font: var(--body-x-small);
    color: var(--main-subtle);
  }

  .zeta-table-pagination {
    display: flex;
    align-items: center;
    gap: var(--spacing-minimum);
  }

  .zeta-table-page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--spacing-4xl);
    height: var(--spacing-4xl);
    padding: 0 var(--spacing-small);
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--radius-minimal);
    background: var(--surface-default);
    cursor: pointer;
    font: var(--body-x-small);
    color: var(--main-default);
    transition:
      background 0.15s,
      border-color 0.15s;
  }

  .zeta-table-page-btn:hover:not(:disabled) {
    background: var(--table-row-hover-bg);
    border-color: var(--main-primary);
  }

  .zeta-table-page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .zeta-table-page-btn--active {
    background: var(--main-primary);
    color: var(--state-default-enabled);
    border-color: var(--main-primary);
  }

  .zeta-table-page-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-medium);
  }

  .zeta-table-page-size-select {
    padding: var(--spacing-minimum) var(--spacing-small);
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--radius-minimal);
    font: var(--body-x-small);
    outline: none;
  }

  /* Infinite scroll */
  .zeta-table-infinite-sentinel {
    height: 1px;
    width: 100%;
    overflow-anchor: none;
  }

  .zeta-table-loading-row {
    overflow-anchor: none;
  }

  .zeta-table-loading-row .zeta-table-td {
    text-align: center;
    padding: var(--spacing-large);
    color: var(--main-subtle);
  }

  /* Tooltip */
  .zeta-table-tooltip {
    position: fixed;
    z-index: 9999;
    padding: var(--spacing-1-5) var(--spacing-2-5);
    background: var(--main-default);
    color: var(--state-default-enabled);
    border-radius: var(--radius-minimal);
    font: var(--body-x-small);
    max-width: 300px;
    word-wrap: break-word;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    box-shadow: var(--elevation-2);
  }

  .zeta-table-tooltip--visible {
    opacity: 1;
  }

  /* No data */
  .zeta-table-no-data {
    text-align: center;
    padding: var(--spacing-6xl) var(--spacing-large);
    color: var(--main-subtle);
    font: var(--body-small);
  }

  /* Actions column (kebab menu) */
  .zeta-table-col-actions {
    width: var(--spacing-9xl);
    min-width: var(--spacing-9xl);
    text-align: center;
    position: sticky;
    right: 0;
    background: inherit;
  }

  .zeta-table-thead .zeta-table-col-actions {
    background: var(--table-header-bg);
    z-index: 16;
  }

  .zeta-table-action-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }

  .zeta-table-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    width: var(--spacing-4xl);
    height: var(--spacing-4xl);
    padding: 0;
    color: var(--main-default);
    transition: background 0.15s;
  }

  .zeta-table-action-btn:hover {
    background: var(--surface-hover);
  }

  .zeta-table-action-btn--active {
    background: var(--main-primary);
    color: var(--state-default-enabled);
  }

  .zeta-table-action-btn--active:hover {
    background: var(--state-primary-selected);
  }

  .zeta-table-action-btn zeta-icon {
    --icon-color: currentColor;
  }

  .zeta-table-action-menu {
    position: fixed;
    z-index: 9999;
    min-width: 160px;
    max-height: 200px;
    overflow-y: auto;
    background: var(--surface-default);
    border: var(--border-size-small) solid var(--table-border-color);
    border-radius: var(--radius-minimal);
    box-shadow: var(--elevation-3);
    padding: var(--spacing-minimum) 0;
    display: flex;
    flex-direction: column;
  }

  .zeta-table-action-menu-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
    padding: var(--spacing-small) var(--spacing-3-5);
    font: var(--body-x-small);
    color: var(--main-default);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    transition: background 0.12s;
  }

  .zeta-table-action-menu-item:hover:not(:disabled) {
    background: var(--surface-hover);
  }

  .zeta-table-action-menu-item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .zeta-table-action-icon {
    display: inline-flex;
    align-items: center;
    font: var(--label-large);
  }

  .zeta-table-action-label {
    flex: 1;
  }
`;
