import { css } from "lit";
export default css`
  :host {
    display: flex;
    height: fit-content;
  }

  /* Only display group items */
  ::slotted(*:not(zeta-button-group-item)) {
    display: none;
  }

  /*  Handle sizes for group buttons */
  :host([size="medium"]) {
    --group-item-padding: var(--spacing-medium);
  }

  :host([size="large"]) {
    --group-item-padding: var(--spacing-large);
  }

  :host([rounded]) {
    /*  Round start of first button */
    ::slotted(zeta-button-group-item:first-child) {
      --group-item-left-radius: var(--radius-minimal);
    }

    /*  Round end of last button */
    ::slotted(zeta-button-group-item:last-child) {
      --group-item-right-radius: var(--radius-minimal);
    }
  }
  /*  Remove double border between buttons */
  ::slotted(zeta-button-group-item:not(*:last-child)) {
    --group-item-border-right: 0;
  }
  :host {
    --group-item-right-radius: 0;
    --group-item-left-radius: 0;
  }
`;
