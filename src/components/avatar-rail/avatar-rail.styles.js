import { css } from "lit";

export default css`
  :host {
    display: flex;
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
    height: min-content;
    gap: var(--spacing-2);
  }

  :host([show-close]) {
    --show-close: "block";
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
`;
