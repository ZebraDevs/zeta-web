import { css } from "lit";
export default css`
  zeta-table {
    display: block;
    font-family: var(--body-font-family, "IBM Plex Sans", sans-serif);
    font-size: var(--table-font-size, 14px);
    color: var(--main-default, #1d1e23);

    /* Layout */
    --table-width: 100%;
    --table-max-height: none;
    --table-border-color: var(--border-default, #e0e3e9);
    --table-border-radius: 8px;

    /* Header */
    --table-header-bg: var(--surface-default, #ffffff);
    --table-header-text: var(--main-default, #1d1e23);
    --table-header-font-size: 12px;
    --table-header-font-weight: 600;
    --table-header-height: 40px;
    --table-header-border-bottom: 2px solid var(--table-border-color);

    /* Rows */
    --table-row-height: 40px;
    --table-row-bg: var(--surface-default, #fff);
    --table-row-hover-bg: var(--surface-hover, #f5f7fa);
    --table-row-selected-bg: var(--surface-selected, #e8f2ff);
    --table-row-active-bg: #e8f4fd;
    --table-row-clickable-cursor: pointer;

    /* Columns */
    --table-cell-padding-y: 10px;
    --table-cell-padding-x: 12px;
    --table-cell-padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
    --table-cell-font-size: 14px;

    /* Frozen */
    --table-frozen-shadow: 4px 0 8px -2px rgba(0, 0, 0, 0.08);

    /* Sort */
    --table-sort-active-color: var(--main-primary, #0073e6);
    --table-sort-inactive-color: var(--main-disabled, #c4c9d4);

    /* Resize */
    --table-resize-handle-color: var(--main-primary, #0073e6);

    /* Toolbar */
    --table-toolbar-bg: var(--surface-default, #fff);
    /* Footer / Pagination */
    --table-footer-bg: var(--surface-default, #fff);

    /* Data count badge */
    --table-data-count-bg: var(--surface-selected, #e8f2ff);
    --table-data-count-color: var(--main-primary, #0073e6);
  }

  .zeta-table-wrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--table-border-color);
    border-radius: var(--table-border-radius);
    overflow: hidden;
    background: var(--table-row-bg);
    width: var(--table-width);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  /* Header bar (title + data count + toolbar actions) */
  .zeta-table-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid var(--table-border-color);
    background: var(--table-toolbar-bg);
  }

  .zeta-table-header-bar-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .zeta-table-header-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 3px;
  }

  .zeta-table-header-bar-right {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .zeta-table-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--table-header-text);
  }

  .zeta-table-data-count {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--table-data-count-bg);
    color: var(--table-data-count-color);
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    padding: 2px 10px;
    border-radius: 12px;
  }

  .zeta-table-global-search {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--surface-default, #fff);
    border: 1px solid var(--table-border-color);
    border-radius: 6px;
    padding: 6px 12px;
    min-width: 280px;
    max-width: 320px;
  }

  .zeta-table-global-search:focus-within {
    border-color: #0073e6;
    box-shadow: 0 0 0 2px rgba(0, 115, 230, 0.12);
  }

  .zeta-table-global-search-icon {
    fill: var(--main-subtle, #6b7280);
    flex-shrink: 0;
  }

  .zeta-table-global-search-input {
    border: none;
    outline: none;
    font-size: 13px;
    width: 100%;
    background: transparent;
    color: var(--main-default, #1d1e23);
  }

  .zeta-table-global-search-input::placeholder {
    color: var(--main-subtle, #6b7280);
  }

  .zeta-table-toolbar-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    border: 1px solid var(--table-border-color);
    border-radius: 4px;
    background: var(--table-row-bg);
    cursor: pointer;
    font-size: 13px;
    color: var(--main-default, #1d1e23);
    transition:
      background 0.15s,
      border-color 0.15s;
  }

  .zeta-table-toolbar-btn:hover {
    background: var(--table-row-hover-bg);
    border-color: var(--main-primary, #0073e6);
  }

  .zeta-table-toolbar-btn--icon {
    padding: 6px 8px;
  }

  .zeta-table-toolbar-btn svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  .zeta-table-selection-info {
    font-size: 14px;
    color: var(--main-primary, #0073e6);
    font-weight: 400;
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
    background: var(--surface-default, #fff);
    border: 1px solid var(--table-border-color);
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    padding: 0;
    margin-top: 4px;
  }

  .zeta-table-column-panel-section {
    padding: 8px 0;
    border-bottom: 1px solid var(--table-border-color);
  }

  .zeta-table-column-panel-section:last-child {
    border-bottom: none;
  }

  .zeta-table-column-panel-heading {
    padding: 6px 12px 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--main-subtle, #6b7280);
  }

  .zeta-table-column-panel-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px;
    cursor: pointer;
    user-select: none;
    font-size: 13px;
  }

  .zeta-table-column-panel-item:hover {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-column-panel-item input[type="checkbox"] {
    width: 15px;
    height: 15px;
    accent-color: var(--main-primary, #0073e6);
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
    border-bottom: 1px solid var(--table-border-color);
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
      inset 0 2px 0 0 #0073e6,
      inset 0 -2px 0 0 #0073e6;
  }

  .zeta-table-row--active .zeta-table-td:first-child {
    box-shadow:
      inset 2px 0 0 0 #0073e6,
      inset 0 2px 0 0 #0073e6,
      inset 0 -2px 0 0 #0073e6;
  }

  .zeta-table-row--active .zeta-table-td:last-child {
    box-shadow:
      inset -2px 0 0 0 #0073e6,
      inset 0 2px 0 0 #0073e6,
      inset 0 -2px 0 0 #0073e6;
  }

  .zeta-table-row--active .zeta-table-cell--frozen-last {
    box-shadow:
      var(--table-frozen-shadow),
      inset 0 2px 0 0 #0073e6,
      inset 0 -2px 0 0 #0073e6;
  }

  .zeta-table-row--selected .zeta-table-td {
    background: var(--table-row-selected-bg);
  }

  .zeta-table-row--disabled .zeta-table-td,
  .zeta-table-row--disabled .zeta-table-td span,
  .zeta-table-row--disabled .zeta-table-td .zeta-table-cell-content {
    color: #b0b5bf !important;
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
    width: 44px;
    min-width: 44px;
    max-width: 44px;
    text-align: center;
    padding: 10px 8px;
  }

  .zeta-table-col-checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--main-primary, #0073e6);
    cursor: pointer;
  }

  .zeta-table-col-checkbox input[type="checkbox"]:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Expand column */
  .zeta-table-col-expand {
    width: 40px;
    min-width: 40px;
    max-width: 40px;
    text-align: center;
    padding: 10px 4px;
  }

  .zeta-table-expand-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition:
      background 0.15s,
      transform 0.2s;
  }

  .zeta-table-expand-btn:hover {
    background: var(--table-row-hover-bg);
  }

  .zeta-table-expand-btn svg {
    width: 16px;
    height: 16px;
    fill: var(--main-subtle, #6b7280);
    transition: transform 0.2s;
  }

  .zeta-table-expand-btn--expanded svg {
    transform: rotate(90deg);
  }

  /* Nested row */
  .zeta-table-nested-row .zeta-table-td {
    padding: 0;
    border-bottom: 1px solid var(--table-border-color);
  }

  .zeta-table-nested-content {
    padding: 12px 12px 12px 56px;
    background: var(--table-row-bg);
  }

  /* Sort indicators */
  .zeta-table-header-content {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
  }

  .zeta-table-header-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: default;
  }

  .zeta-table-header-title--sortable {
    cursor: pointer;
  }

  .zeta-table-header-title--sortable:hover {
    color: var(--table-sort-active-color);
  }

  .zeta-table-header-icons {
    display: flex;
    align-items: center;
    gap: 2px;
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
    border-radius: 4px;
    width: 22px;
    height: 22px;
    padding: 0;
    color: var(--main-subtle, #6b7280);
    transition:
      background 0.12s,
      color 0.12s;
  }

  .zeta-table-header-icon-btn:hover {
    background: var(--surface-hover, #f5f7fa);
    color: var(--main-primary, #0073e6);
  }

  .zeta-table-header-icon-btn svg {
    fill: currentColor;
  }

  .zeta-table-sort-btn {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 2px;
    border-radius: 4px;
  }

  .zeta-table-sort-btn:hover {
    background: var(--surface-hover, #f5f7fa);
  }

  .zeta-table-header-icon-btn--active {
    color: #0073e6;
  }

  /* Filter panel dropdown */
  .zeta-table-filter-panel {
    position: fixed;
    z-index: 9999;
    min-width: 180px;
    max-width: 260px;
    max-height: 280px;
    background: var(--surface-default, #fff);
    border: 1px solid var(--table-border-color);
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: var(--body-font-family, "IBM Plex Sans", sans-serif);
    font-size: 13px;
  }

  .zeta-table-filter-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 600;
    border-bottom: 1px solid var(--table-border-color);
  }

  .zeta-table-filter-panel-list {
    overflow-y: auto;
    padding: 6px 0;
    flex: 1;
  }

  .zeta-table-filter-panel-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.12s;
  }

  .zeta-table-filter-panel-item:hover {
    background: var(--surface-hover, #f5f7fa);
  }

  .zeta-table-filter-panel-item input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
  }

  .zeta-table-filter-panel-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px 12px;
    border-top: 1px solid var(--table-border-color);
  }

  .zeta-table-filter-panel-btn {
    padding: 5px 14px;
    font-size: 13px;
    font-family: var(--body-font-family, "IBM Plex Sans", sans-serif);
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: background 0.12s;
  }

  .zeta-table-filter-panel-btn--clear {
    background: none;
    border-color: var(--table-border-color);
    color: var(--table-header-color, #374151);
  }

  .zeta-table-filter-panel-btn--clear:hover {
    background: var(--surface-hover, #f5f7fa);
  }

  .zeta-table-filter-panel-btn--apply {
    background: #0073e6;
    color: #fff;
    border-color: #0073e6;
  }

  .zeta-table-filter-panel-btn--apply:hover {
    background: #005bb5;
  }

  .zeta-table-sort-icons {
    display: inline-flex;
    flex-direction: column;
    gap: 0px;
    line-height: 0;
  }

  .zeta-table-sort-arrow {
    width: 10px;
    height: 8px;
    display: block;
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
    padding: 4px 8px;
    background: var(--surface-default, #fff);
    border-bottom: 1px solid var(--table-border-color);
    height: auto;
  }

  .zeta-table-search-input {
    width: 100%;
    padding: 5px 8px;
    border: 1px solid var(--table-border-color);
    border-radius: 4px;
    font-size: 12px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s;
  }

  .zeta-table-search-input:focus {
    border-color: var(--main-primary, #0073e6);
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
    width: 7px;
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
    right: 2px;
    width: 2px;
    height: 50%;
    background: var(--table-border-color);
    border-radius: 1px;
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
    background: rgba(0, 115, 230, 0.08);
  }

  /* Footer / Pagination */
  .zeta-table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-top: 1px solid var(--table-border-color);
    background: var(--table-footer-bg);
    font-size: 13px;
    color: var(--main-subtle, #6b7280);
  }

  .zeta-table-pagination {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .zeta-table-page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid var(--table-border-color);
    border-radius: 4px;
    background: var(--surface-default, #fff);
    cursor: pointer;
    font-size: 13px;
    color: var(--main-default, #1d1e23);
    transition:
      background 0.15s,
      border-color 0.15s;
  }

  .zeta-table-page-btn:hover:not(:disabled) {
    background: var(--table-row-hover-bg);
    border-color: var(--main-primary, #0073e6);
  }

  .zeta-table-page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .zeta-table-page-btn--active {
    background: var(--main-primary, #0073e6);
    color: #fff;
    border-color: var(--main-primary, #0073e6);
  }

  .zeta-table-page-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .zeta-table-page-size-select {
    padding: 4px 8px;
    border: 1px solid var(--table-border-color);
    border-radius: 4px;
    font-size: 13px;
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
    padding: 16px;
    color: var(--main-subtle, #6b7280);
  }

  /* Tooltip */
  .zeta-table-tooltip {
    position: fixed;
    z-index: 9999;
    padding: 6px 10px;
    background: var(--main-default, #1d1e23);
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    max-width: 300px;
    word-wrap: break-word;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .zeta-table-tooltip--visible {
    opacity: 1;
  }

  /* No data */
  .zeta-table-no-data {
    text-align: center;
    padding: 40px 16px;
    color: var(--main-subtle, #6b7280);
    font-size: 14px;
  }

  /* Actions column (kebab menu) */
  .zeta-table-col-actions {
    width: 56px;
    min-width: 56px;
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
    width: 32px;
    height: 32px;
    padding: 0;
    color: var(--main-default, #1d1e23);
    transition: background 0.15s;
  }

  .zeta-table-action-btn:hover {
    background: var(--surface-hover, #f5f7fa);
  }

  .zeta-table-action-btn--active {
    background: #0073e6;
    color: #fff;
  }

  .zeta-table-action-btn--active:hover {
    background: #005bb5;
  }

  .zeta-table-action-btn svg {
    fill: currentColor;
  }

  .zeta-table-action-menu {
    position: fixed;
    z-index: 9999;
    min-width: 160px;
    max-height: 200px;
    overflow-y: auto;
    background: var(--surface-default, #fff);
    border: 1px solid var(--table-border-color);
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    padding: 4px 0;
    display: flex;
    flex-direction: column;
  }

  .zeta-table-action-menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    font-size: 13px;
    color: var(--main-default, #1d1e23);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    transition: background 0.12s;
  }

  .zeta-table-action-menu-item:hover:not(:disabled) {
    background: var(--surface-hover, #f5f7fa);
  }

  .zeta-table-action-menu-item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .zeta-table-action-icon {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
  }

  .zeta-table-action-label {
    flex: 1;
  }
`;
