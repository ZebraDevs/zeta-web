import { css } from "lit";
export default css`
  :host([flavor="primary"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--state-primary-enabled));
    color: var(--state-default-enabled);

    &:hover {
      background-color: var(--state-primary-hover);
    }
    &:active {
      background-color: var(--state-primary-selected);
    }
  }
  :host([flavor="secondary"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--state-secondary-enabled));
    color: var(--state-default-enabled);
    &:hover {
      background-color: var(--state-secondary-hover);
    }
    &:active {
      background-color: var(--state-secondary-selected);
    }
  }
  :host([flavor="positive"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--state-positive-enabled));
    color: var(--state-default-enabled);
    &:hover {
      background-color: var(--state-positive-hover);
    }
    &:active {
      background-color: var(--state-positive-selected);
    }
  }
  :host([flavor="negative"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--state-negative-enabled));
    color: var(--state-default-enabled);
    &:hover {
      background-color: var(--state-negative-hover);
    }
    &:active {
      background-color: var(--state-negative-selected);
    }
  }
  :host([flavor="outline"]:not([disabled])) > :first-child,
  :host([flavor="outline-subtle"]:not([disabled])) > :first-child,
  :host([flavor="text"]:not([disabled])) > :first-child,
  :host([flavor="basic"]:not([disabled])) > :first-child,
  :host([flavor="basic-negative"]:not([disabled])) > :first-child,
  :host([flavor="subtle"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--surface-default));
    &:hover {
      background-color: var(--surface-hover);
    }
    &:active {
      background-color: var(--surface-selected);
    }
  }
  :host([flavor="outline"]:not([disabled])) > :first-child {
    color: var(--main-primary);
    box-shadow: 0 0 0 var(--border-size-small) var(--border-primary-main);
  }
  :host([flavor="outline-subtle"]:not([disabled])) > :first-child {
    color: var(--main-default);
    box-shadow: 0 0 0 var(--border-size-small) var(--border-default);
  }
  :host([flavor="text"]:not([disabled])) > :first-child {
    color: var(--main-primary);
  }
  :host([flavor="subtle"]:not([disabled])) > :first-child {
    color: var(--main-subtle);
  }

  :host([disabled]) > * {
    background: var(--flavor-disabled-background-color, var(--surface-disabled));
  }
`;
