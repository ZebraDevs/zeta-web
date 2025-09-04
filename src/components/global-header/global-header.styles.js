import { css } from "lit";
export default css`
  :host * {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #header-main {
    justify-content: space-between;
  }

  #header-right {
    gap: var(--spacing-large);
  }

  #name {
    color: var(--main-default);
    font: var(--title-small);
    font-size: 12px;
  }

  #platform-name {
    font: var(--label-large);
  }

  /*Optional nav items*/
  #menu-items {
    padding-left: var(--spacing-small);
  }
  #menu-items.has-items {
    border-left: 1px solid var(--border-default);
  }
  #menu-items zeta-button::part(button) {
    font: var(--label-medium);
  }
  #action-items {
    padding-right: var(--spacing-small);
  }
  #action-items.has-items {
    border-right: 1px solid var(--border-default);
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
    width: 24px;
    height: 24px;
    color: var(--main-inverse);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
  }

  .expand-icon {
    --icon-color: var(--main-default);
  }

  @media (prefers-color-scheme: dark) {
    #logo {
      filter: invert(1);
    }
  }
`;
