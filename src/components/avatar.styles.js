import { css } from "lit";
export default css`
  .avatar {
    border-radius: var(--radius-full);
    width: min-content;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  :host([showStatus]) .avatar {
    box-shadow: 0 0 0 var(--border-size-medium) var(--color-green-60);
  }

  :host .icon-container > zeta-icon {
    position: relative;
    top: 0;
    left: -10%;
    --icon-color: var(--icon-disabled);
  }

  :host([size="xs"]) .icon-container {
    width: 24px;
    height: 24px;
    --icon-size: 28.8px;
  }
  :host([size="sm"]) .icon-container {
    width: 32px;
    height: 32px;
    --icon-size: 38.4px;
  }
  :host([size="md"]) .icon-container {
    width: 40px;
    height: 40px;
    --icon-size: 48px;
  }
  :host([size="lg"]) .icon-container {
    width: 48px;
    height: 48px;
    --icon-size: 57.6px;
  }
  :host([size="xl"]) .icon-container {
    width: 64px;
    height: 64px;
    --icon-size: 76.8px;
  }

  .inidicator {
    position: absolute;
    top: 0;
    right: 0;
  }

  .status-badge {
    border-radius: inherit;
    position: absolute;
    bottom: 0;
    right: 0;
    border: var(--border-size-medium) solid var(--surface-default);
  }

  .initials {
    background-color: var(--color-cool-20);
    width: 100%;
    height: 100%;
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    color: var(--text-subtle);
    overflow: hidden;
  }

  :host([size="xl"]) > .avatar > .initials {
    font: var(--title-large);
  }
  :host([size="lg"]) > .avatar > .initials {
    font: var(--label-large);
  }
  :host([size="md"]) > .avatar > .initials {
    font: var(--label-medium);
  }
  :host([size="sm"]) > .avatar > .initials,
  :host([size="xs"]) > .avatar > .initials {
    font: var(--label-small);
  }

  .icon-container {
    border-radius: inherit;
    overflow: hidden;
    position: relative;
  }

  img {
    object-fit: cover;
    object-position: center;
    border-radius: inherit;
  }
`;
