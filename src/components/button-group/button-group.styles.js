import { css } from "lit";
export default css`
  :host {
    display: flex;
    height: fit-content;
    width: fit-content;

    .group {
      display: flex;
    }
  }

  /* Only display group items */
  ::slotted(*:not(zeta-button-group-item)) {
    display: none;
  }

  /*  Handle sizes for group buttons */
  :host([size="medium"]) {
    --group-item-padding: var(--spacing-3);
  }

  :host([size="large"]) {
    --group-item-padding: var(--spacing-4);
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
`;
