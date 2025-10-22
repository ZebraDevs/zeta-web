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
    font: var(--title-medium);
    color: var(--main-default);
  }

  /*User info container - Holds name, avatar and icon*/
  #name {
    color: var(--main-default);
    font: var(--label-small);
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
    border-left: var(--border-size-small) solid var(--border-default);
  }
  #action-items.has-items {
    border-right: var(--border-size-small) solid var(--border-default);
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
    --avatar-color: var(--avatar-purple);
    --avatar-initials-color: var(--main-inverse);
  }

  .logo svg {
    background-color: transparent;
  }

  /* Invert logo in dark mode*/
  .logo {
    fill: var(--state-inverse-enabled);
    background-color: transparent;
    width: 80px;
    height: 32px;
    margin-inline: var(--spacing-large);
  }

  /*Hide components at different screen sizes*/
  /*Use nth child for slotted elements and display none for others*/
  @media (max-width: 1440px) {
    #header-right.six-menu-action-items #search-bar {
      display: none;
    }
    #header-main {
      gap: var(--spacing-6xl);
    }
  }
`;
