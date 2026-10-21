import { css } from "lit";
export default css`
  :host([flavor="primary"]:not([disabled])) > :first-child {
    background-color: var(--interactive-primary-background-default);
    color: var(--interactive-primary-foreground-default);
    -webkit-tap-highlight-color: transparent;
    &:active {
      background-color: var(--interactive-primary-background-pressed);
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-primary-background-hover);
      }
      &:active {
        background-color: var(--interactive-primary-background-pressed);
      }
    }
  }
  :host([flavor="secondary"]:not([disabled])) > :first-child {
    background-color: var(--interactive-secondary-background-default);
    color: var(--interactive-secondary-foreground-default);
    -webkit-tap-highlight-color: transparent;
    &:active {
      background-color: var(--interactive-secondary-background-pressed);
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-secondary-background-hover);
      }
      &:active {
        background-color: var(--interactive-secondary-background-pressed);
      }
    }
  }
  :host([flavor="positive"]:not([disabled])) > :first-child {
    background-color: var(--interactive-positive-background-default);
    color: var(--interactive-positive-foreground-default);
    -webkit-tap-highlight-color: transparent;
    &:active {
      background-color: var(--interactive-positive-background-pressed);
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-positive-background-hover);
      }
      &:active {
        background-color: var(--interactive-positive-background-pressed);
      }
    }
  }
  :host([flavor="negative"]:not([disabled])) > :first-child {
    background-color: var(--interactive-destructive-background-default);
    color: var(--interactive-destructive-foreground-default);
    -webkit-tap-highlight-color: transparent;
    &:active {
      background-color: var(--interactive-destructive-background-pressed);
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-destructive-background-hover);
      }
      &:active {
        background-color: var(--interactive-destructive-background-pressed);
      }
    }
  }
  :host([flavor="custom"]:not([disabled])) > :first-child {
    background-color: var(--flavor-background-color, var(--interactive-primary-background-default));
    color: var(--flavor-text-color, var(--interactive-primary-foreground-default));
    -webkit-tap-highlight-color: transparent;
    &:active {
      background-color: var(--button-active-color, var(--flavor-background-color, var(--interactive-primary-background-pressed)));
      /* If --button-active-color is set its color value is invalid for filter, resolving to none */
      filter: var(--button-active-color, brightness(0.85));
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--button-hover-color, var(--flavor-background-color, var(--interactive-primary-background-hover)));
        /* If --button-hover-color is set its color value is invalid for filter, resolving to none */
        filter: var(--button-hover-color, brightness(0.92));
      }
      &:active {
        background-color: var(--button-active-color, var(--flavor-background-color, var(--interactive-primary-background-pressed)));
        filter: var(--button-active-color, brightness(0.82));
      }
    }
  }
  :host([flavor="outline"]:not([disabled])) > :first-child,
  :host([flavor="outline-subtle"]:not([disabled])) > :first-child,
  :host([flavor="text"]:not([disabled])) > :first-child,
  :host([flavor="text-gradient"]:not([disabled])) > :first-child,
  :host([flavor="basic"]:not([disabled])) > :first-child,
  :host([flavor="basic-negative"]:not([disabled])) > :first-child,
  :host([flavor="subtle"]:not([disabled])) > :first-child {
    background-color: var(--interactive-neutral-background-default);
    -webkit-tap-highlight-color: transparent;
    &:active {
      background-color: var(--interactive-neutral-background-pressed);
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-neutral-background-hover);
      }
      &:active {
        background-color: var(--interactive-neutral-background-pressed);
      }
    }
  }
  :host([flavor="outline"]:not([disabled])) > :first-child {
    color: var(--interactive-ghost-foreground-default);
    box-shadow: 0 0 0 var(--stroke-thin) var(--interactive-ghost-border-default);
  }
  :host([flavor="outline-subtle"]:not([disabled])) > :first-child {
    color: var(--interactive-neutral-foreground-default);
    box-shadow: 0 0 0 var(--stroke-thin) var(--interactive-neutral-border-default);
  }
  :host([flavor="text"]:not([disabled])) > :first-child {
    color: var(--interactive-ghost-foreground-default);
  }
  :host([flavor="subtle"]:not([disabled])) > :first-child {
    color: var(--interactive-neutral-foreground-default);
  }

  :host([flavor="primary"][disabled]) > :first-child {
    background-color: var(--interactive-primary-background-disabled);
    color: var(--interactive-primary-foreground-disabled);
  }
  :host([flavor="positive"][disabled]) > :first-child {
    background-color: var(--interactive-positive-background-disabled);
    color: var(--interactive-positive-foreground-disabled);
  }
  :host([flavor="negative"][disabled]) > :first-child {
    background-color: var(--interactive-destructive-background-disabled);
    color: var(--interactive-destructive-foreground-disabled);
  }
  :host([flavor="outline"][disabled]) > :first-child,
  :host([flavor="outline-subtle"][disabled]) > :first-child,
  :host([flavor="subtle"][disabled]) > :first-child {
    background-color: var(--interactive-neutral-background-disabled);
    color: var(--interactive-neutral-foreground-disabled);
  }
  :host([flavor="text"][disabled]) > :first-child,
  :host([flavor="text-gradient"][disabled]) > :first-child {
    background-color: var(--interactive-ghost-background-disabled);
    color: var(--interactive-ghost-foreground-disabled);
  }
  :host([flavor="custom"][disabled]) > :first-child {
    background-color: var(--flavor-disabled-background-color, var(--interactive-primary-background-disabled));
    color: var(--flavor-disabled-text-color, var(--interactive-primary-foreground-disabled));
  }

  :host([flavor="gradient"]:not([disabled])) > :first-child {
    background: linear-gradient(96deg, var(--surface-gradient-start) 0%, var(--surface-gradient-end) 87.02%);
    color: var(--interactive-primary-foreground-default);
    -webkit-tap-highlight-color: transparent;
    &:active {
      background: var(--surface-gradient-start);
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background: var(--surface-gradient-end);
      }
      &:active {
        background: var(--surface-gradient-start);
      }
    }
  }
  :host([flavor="gradient"][disabled]) > :first-child {
    background-color: var(--interactive-primary-background-disabled);
    color: var(--interactive-primary-foreground-disabled);
  }
`;
