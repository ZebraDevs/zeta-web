import { css } from "lit";
export default css`
  :host {
    --default-avatar-size: 48px;
    --computed-avatar-size: var(--avatar-size, var(--default-avatar-size));
    display: block;
    position: relative;
    width: var(--computed-avatar-size);
    min-width: var(--computed-avatar-size);
    height: var(--computed-avatar-size);
    font-size: calc(var(--computed-avatar-size) * 0.4);
    --border-width: calc(var(--computed-avatar-size) * 0.05);
    --icon-size: calc(var(--computed-avatar-size) * 0.5);
  }

  :host([size="xxxs"]) {
    --avatar-size: 24px;
  }

  :host([size="xxs"]) {
    --avatar-size: 32px;
  }

  :host([size="xs"]) {
    --avatar-size: 36px;
  }

  :host([size="s"]) {
    --avatar-size: 40px;
  }

  :host([size="m"]) {
    --avatar-size: var(--default-avatar-size);
  }

  :host([size="l"]) {
    --avatar-size: 64px;
  }

  :host([size="xl"]) {
    --avatar-size: 80px;
  }

  :host([size="xxl"]) {
    --avatar-size: 120px;
  }

  :host([size="xxxl"]) {
    --avatar-size: 200px;
  }

  :host([show-ring]) .avatar {
    border: var(--border-width) solid var(--border-default);
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .avatar {
    border-radius: var(--radius-full);
    color: var(--avatar-initials-color, var(--main-inverse));
    font-weight: 500;
    background-color: var(--avatar-color, var(--surface-avatar-purple));
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
    object-fit: cover;
  }

  ::slotted(zeta-icon) {
    color: var(--main-inverse);
  }

  .close,
  .status {
    position: absolute;
    border-radius: var(--radius-full);
    border: calc(var(--computed-avatar-size) * 0.02) solid var(--surface-default);
    right: 0;
  }

  :host([show-close]) {
    --show-close: "show";
  }

  .close {
    visibility: var(--show-close, hidden);
    top: 0;
    --icon-size: calc(var(--computed-avatar-size) * 0.3);
    --icon-color: var(--main-inverse);
    background-color: var(--main-disabled);
    cursor: pointer;
  }

  .status {
    bottom: 0;
  }
`;
