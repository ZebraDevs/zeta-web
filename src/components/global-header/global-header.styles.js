import { css } from "lit";
export default css`
  :host * {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--surface-default);
  }

  #header-main {
    justify-content: space-between;
    padding: var(--spacing-small) var(--spacing-large);
  }

  #header-right {
    gap: var(--spacing-large);
  }

  #platform-name {
    font: var(--label-large);
    color: var(--main-default);
  }

  /*User info container - Holds name, avatar and icon*/
  #name {
    color: var(--main-default);
    font: var(--title-small);
    font-size: 12px;
    background-color: inherit;
  }
  #user-info-icon {
    background-color: inherit;
  }

  /*Optional nav items*/
  ::slotted([slot="menu-items"]) {
    padding-left: var(--spacing-small);
  }
  ::slotted([slot="menu-items"]) zeta-button::part(button) {
    font: var(--label-medium);
  }
  ::slotted([slot="menu-items"]) zeta-icon {
    --icon-color: var(--main-subtle);
  }
  ::slotted([slot="action-items"]) {
    padding-right: var(--spacing-small);
  }
  #menu-items.has-items {
    border-left: 1px solid var(--border-default);
  }
  #action-items.has-items {
    border-right: 1px solid var(--border-default);
  }

  /*zeta-icon-button and zeta-button styling*/
  zeta-icon-button::part(icon) {
    --icon-color: var(--main-default);
  }
  ::slotted([slot="action-items"]) {
    --icon-color: var(--main-default);
  }
  zeta-icon-button::part(button),
  zeta-button::part(button) {
    color: var(--main-subtle);
  }

  /*Spacing between elements in header-info*/
  #logo {
    margin: 0 var(--spacing-large) 0 var(--spacing-small);
  }
  #header-info {
    margin-right: var(--spacing-large);
  }

  /*Style avatar icon*/
  #avatar {
    background-color: var(--avatar-purple);
    border-radius: 50%;
    width: var(--spacing-2xl);
    height: var(--spacing-2xl);
    color: var(--main-inverse);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
  }

  /*Invert logo in dark mode*/
  #logo {
    filter: invert(1);
    background-color: transparent;
  }
`;
