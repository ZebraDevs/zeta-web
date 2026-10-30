import { css } from "lit";
export default css`
  :host([flavor="gradient"]:not([disabled])) > button {
    background-image: linear-gradient(135deg, var(--surface-gradient-start) 0%, var(--surface-gradient-end) 87%);
  }

  /* Uses the vivid surface gradient colours, horizontally across the label, so the gradient is obvious on short text.
     The foreground gradient tokens are two near-black shades that are hard to tell apart. */
  :host([flavor="text-gradient"]:not([disabled])) > button {
    --text-gradient: linear-gradient(90deg, var(--surface-gradient-start) 0%, var(--surface-gradient-end) 100%);
    background-image: none;
  }

  :host([flavor="text-gradient"]:not([disabled])) > button > slot {
    display: inline-block;
    /* The slot is display: contents on other flavors, so the base slot padding is ignored there. Keep it ignored here. */
    padding: 0;
    background: var(--text-gradient, none);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  :host([flavor="text-gradient"]:not([disabled])) > button > zeta-icon,
  :host([flavor="text-gradient"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--surface-gradient-start);
  }

  :host([flavor="text-gradient"]:not([disabled])) > button > zeta-icon:last-child {
    --icon-color: var(--surface-gradient-end);
  }

  /* Experimental flavors */
  :host([flavor="contrast"]:not([disabled])) > button {
    background-color: var(--interactive-inverse-background-default);
    color: var(--interactive-inverse-foreground-default);
    --icon-color: var(--interactive-inverse-foreground-default);
    -webkit-tap-highlight-color: transparent;
    &:active {
      background-color: var(--interactive-inverse-background-pressed);
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-inverse-background-hover);
      }
      &:active {
        background-color: var(--interactive-inverse-background-pressed);
      }
    }
  }

  :host([flavor="contrast"][disabled]) > button {
    background-color: var(--interactive-inverse-background-disabled);
    color: var(--interactive-inverse-foreground-disabled);
  }

  :host([flavor="outline-contrast"]:not([disabled])) > button {
    background-color: var(--interactive-ghost-background-default);
    color: var(--foreground-primary);
    --icon-color: var(--foreground-primary);
    box-shadow: 0 0 0 var(--stroke-thin) var(--interactive-inverse-border-default);
    -webkit-tap-highlight-color: transparent;
    &:active {
      background-color: var(--interactive-ghost-background-pressed);
      box-shadow: 0 0 0 var(--stroke-thin) var(--interactive-inverse-border-pressed);
    }

    @media (hover: hover), (hover: none) and (pointer: fine) {
      &:hover {
        background-color: var(--interactive-ghost-background-hover);
        box-shadow: 0 0 0 var(--stroke-thin) var(--interactive-inverse-border-hover);
      }
      &:active {
        background-color: var(--interactive-ghost-background-pressed);
        box-shadow: 0 0 0 var(--stroke-thin) var(--interactive-inverse-border-pressed);
      }
    }
  }

  :host([flavor="outline-contrast"][disabled]) > button {
    background-color: var(--interactive-ghost-background-disabled);
    color: var(--interactive-ghost-foreground-disabled);
    box-shadow: 0 0 0 var(--stroke-thin) var(--interactive-inverse-border-disabled);
  }
`;
