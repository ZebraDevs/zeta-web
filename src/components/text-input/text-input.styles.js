import { css } from "lit";
export default css`
  :host .container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    width: fit-content;
    height: fit-content;
    align-items: flex-start;
  }

  .hint-text {
    --icon-size: 16px;
  }

  .left,
  .right {
    --icon-size: 20px;
  }

  :host([size="small"]) .left,
  :host([size="small"]) .right {
    --icon-size: 16px;
  }

  :host * {
    border: none;
    outline: none;
  }

  zeta-icon {
    --icon-color: var(--icon-default);
  }

  zeta-icon.subtle {
    --icon-color: var(--icon-subtle);
  }

  /* ERROR */
  :host([error]:not([disabled])) .input-container {
    background-color: var(--surface-flavor-negative-subtle);
    box-shadow: 0 0 0 var(--border-size-medium) var(--border-flavor-negative);
  }

  :host([error]:not([disabled])) .hint-text zeta-icon {
    --icon-color: var(--icon-flavor-negative);
  }

  :host([error]:not([disabled])) .hint-text {
    color: var(--text-flavor-negative);
  }

  /* DISABLED */
  :host([disabled]) .input-container {
    pointer-events: none;
    background-color: var(--surface-disabled);
  }

  :host([disabled]) zeta-icon {
    --icon-color: var(--icon-disabled);
  }

  :host([disabled]) input,
  :host([disabled]) textarea,
  :host([disabled]) .affix,
  :host([disabled]) .label,
  :host([disabled]) .hint-text span {
    color: var(--text-disabled);
  }
  :host([disabled]) input::placeholder,
  :host([disabled]) textarea::placeholder,
  :host([disabled]) .affix::placeholder,
  :host([disabled]) .label::placeholder,
  :host([disabled]) .hint-text span::placeholder {
    color: inherit;
  }

  /* SIZE */
  :host([size="small"]) .input-container:not(.text-area) {
    padding: var(--spacing-2) var(--spacing-2);
  }

  :host([size="small"]) input,
  :host([size="small"]) .affix {
    font: var(--body-small);
  }
  :host([size="medium"]) .input-container:not(.text-area) {
    padding: var(--spacing-2) var(--spacing-3);
  }

  :host([size="medium"]) input,
  :host([size="medium"]) .affix {
    font: var(--body-medium);
  }

  :host([size="large"]) .input-container:not(.text-area) {
    padding: var(--spacing-3);
  }

  :host([size="large"]) input,
  :host([size="large"]) .affix {
    font: var(--body-medium);
  }

  /* DEFAULT */
  .input-container {
    border-radius: inherit;
    display: flex;
    align-items: center;
    min-width: 328px;
    height: fit-content;
    background-color: var(--surface-default);
    padding: var(--spacing-3);
    box-shadow: 0 0 0 var(--border-size-small) var(--border-default);
  }

  .input-container input,
  .input-container textarea {
    background-color: inherit;
    caret-color: var(--icon-flavor-primary);
    color: var(--text-default);
    flex: 1;
    padding: 0;
    margin: 0;
    font: var(--body-medium);
  }

  .input-container textarea::placeholder,
  .input-container input::placeholder {
    color: var(--text-subtle);
  }

  .input-container:hover {
    box-shadow: 0 0 0 var(--border-size-small) var(--border-hover) !important;
  }

  .input-container:has(input:focus),
  .input-container:has(textarea:focus) {
    box-shadow: 0 0 0 var(--border-size-medium) var(--border-flavor-primary) !important;
  }

  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="time"]::-webkit-calendar-picker-indicator {
    display: none !important;
    /* TODO: Firefox default date icon appears. */
  }

  .left {
    margin-right: var(--spacing-2);
  }

  .right {
    margin-left: var(--spacing-2);
  }

  .affix {
    color: var(--text-subtle);
  }

  .label {
    font: var(--body-small);
    margin-bottom: var(--spacing-1);
    display: flex;
    color: var(--text-default);
    position: relative;
    width: fit-content;
  }

  .label.required::after {
    content: "*";
    display: flex;
    position: absolute;
    right: var(--spacing-2);
    color: var(--text-flavor-negative);
  }

  .hint-text {
    display: flex;
    align-items: center;
    column-gap: var(--spacing-1);
  }

  .hint-text {
    font: var(--body-x-small);
    color: var(--text-subtle);
  }

  textarea {
    resize: none;
    width: 100%;
  }
`;
