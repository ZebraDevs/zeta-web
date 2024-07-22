import { css } from "lit";
export default css`
  :host([flavor="primary"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--surface-flavor-primary));
    color: var(--text-inverse);

    &:hover {
      background-color: var(--component-button-primary-hover);
    }
    &:active {
      background-color: var(--component-button-primary-pressed);
    }
  }
  :host([flavor="secondary"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--surface-flavor-secondary));
    color: var(--text-inverse);
    &:hover {
      background-color: var(--component-button-secondary-hover);
    }
    &:active {
      background-color: var(--component-button-secondary-pressed);
    }
  }
  :host([flavor="positive"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--surface-flavor-positive));
    color: var(--text-inverse);
    &:hover {
      background-color: var(--component-button-positive-hover);
    }
    &:active {
      background-color: var(--component-button-positive-pressed);
    }
  }
  :host([flavor="negative"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--surface-flavor-negative));
    color: var(--text-inverse);
    &:hover {
      background-color: var(--component-button-negative-hover);
    }
    &:active {
      background-color: var(--component-button-negative-pressed);
    }
  }
  :host([flavor="outline"]:not([disabled])) > :first-child,
  :host([flavor="outline-subtle"]:not([disabled])) > :first-child,
  :host([flavor="text"]:not([disabled])) > :first-child,
  :host([flavor="basic"]:not([disabled])) > :first-child,
  :host([flavor="basic-negative"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--surface-default));
    &:hover {
      background-color: var(--surface-hover);
    }
    &:active {
      background-color: var(--surface-pressed);
    }
  }
  :host([flavor="outline"]:not([disabled])) > :first-child {
    color: var(--text-flavor-primary);
    box-shadow: 0 0 0 var(--border-size-small) var(--component-button-outline-text-border);
  }
  :host([flavor="outline-subtle"]:not([disabled])) > :first-child {
    color: var(--text-default);
    box-shadow: 0 0 0 var(--border-size-small) var(--border-default);
  }
  :host([flavor="text"]:not([disabled])) > :first-child {
    color: var(--text-flavor-primary);
  }

  :host([disabled]) > * {
    background: var(--flavor-disabled-background-color, var(--surface-disabled));
  }
`;
