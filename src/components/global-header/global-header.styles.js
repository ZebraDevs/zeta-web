import { css } from "lit";
export default css`
  :host * {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #global-header-main-container {
    justify-content: space-between;
  }

  #user-profile {
    gap: var(--spacing-large);
  }

  /*zeta-icon-button and zeta-button styling*/
  zeta-icon-button::part(icon) {
    --icon-color: var(--main-default);
  }
  zeta-icon-button::part(button),
  zeta-button::part(button) {
    color: var(--main-subtle);
  }
  zeta-icon-button:not([disabled]):not(:hover):not(:active)::part(button),
  zeta-button:not([disabled]):not(:hover):not(:active)::part(button) {
    --flavor-background-color: --surface-default;
  }

  /*Spacing between elements in global-header-info*/
  #logo {
    margin: 0 var(--spacing-large) 0 var(--spacing-small);
  }
  #global-header-info {
    margin-right: var(--spacing-large);
  }
`;
