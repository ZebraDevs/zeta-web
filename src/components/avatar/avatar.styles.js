import { css } from "lit";
export default css`
  :host {
    width: min-content;
    display: block;
    position: relative;
  }

  :host([size="xxxs"]) {
    --avatar-size: 24px;
    --border-width: calc(var(--avatar-size) * 0.05);
    --icon-size: calc(var(--avatar-size) * 0.5);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([size="xxs"]) {
    --avatar-size: 32px;
    --border-width: calc(var(--avatar-size) * 0.05);
    --icon-size: calc(var(--avatar-size) * 0.5);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([size="xs"]) {
    --avatar-size: 36px;
    --icon-size: calc(var(--avatar-size) * 0.5);
    --border-width: calc(var(--avatar-size) * 0.05);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([size="s"]) {
    --avatar-size: 40px;
    --border-width: calc(var(--avatar-size) * 0.05);
    --icon-size: calc(var(--avatar-size) * 0.5);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([size="m"]) {
    --avatar-size: 48px;
    --border-width: calc(var(--avatar-size) * 0.05);
    --icon-size: calc(var(--avatar-size) * 0.5);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([size="l"]) {
    --avatar-size: 64px;
    --border-width: calc(var(--avatar-size) * 0.05);
    --icon-size: calc(var(--avatar-size) * 0.5);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([size="xl"]) {
    --avatar-size: 80px;
    --border-width: calc(var(--avatar-size) * 0.05);
    --icon-size: calc(var(--avatar-size) * 0.5);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([size="xxl"]) {
    --avatar-size: 120px;
    --border-width: calc(var(--avatar-size) * 0.05);
    --icon-size: calc(var(--avatar-size) * 0.5);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([size="xxxl"]) {
    --avatar-size: 200px;
    --border-width: calc(var(--avatar-size) * 0.05);
    --icon-size: calc(var(--avatar-size) * 0.5);
    width: var(--avatar-size);
    height: var(--avatar-size);
    font-size: calc(var(--avatar-size) * 0.4);
  }

  :host([show-ring]) .avatar {
    border: var(--border-width) solid var(--border-default);
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .avatar {
    border-radius: var(--radius-full);
    color: var(--avatar-initials-color, var(--text-inverse));
    font-weight: 500;
    background-color: var(--avatar-color, var(--component-avatar-purple));
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-transform: uppercase;
  }

  ::slotted(img) {
    border-radius: var(--radius-full);
    height: 100%;
    width: 100%;
    display: flex;
  }

  ::slotted(zeta-icon) {
    color: var(--text-inverse);
  }

  .close,
  .status {
    position: absolute;
    border-radius: var(--radius-full);
    border: calc(var(--avatar-size) * 0.02) solid var(--surface-default);
    right: 0;
  }

  .close {
    top: 0;
    --icon-size: calc(var(--avatar-size) * 0.3);
    --icon-color: var(--icon-inverse);
    background-color: var(--icon-disabled);
    cursor: pointer;
  }

  .status {
    bottom: 0;
  }
`;
