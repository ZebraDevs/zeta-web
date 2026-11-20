import { css } from "lit";
export default css`
  :host {
    --default-avatar-size: var(--control-lg, 48px);
    --computed-avatar-size: var(--avatar-size, var(--default-avatar-size));
    display: block;
    position: relative;
    width: var(--computed-avatar-size);
    min-width: var(--computed-avatar-size);
    height: var(--computed-avatar-size);
    font-size: calc(var(--computed-avatar-size) * 0.4);
    font: var(--label-large-font-weight) calc(var(--computed-avatar-size) * 0.4)/var(--label-large-line-height) var(--label-large-font-family);
    --border-width: var(--stroke-thick);
    --icon-color: var(--foreground-inverse);
    --avatar-status-indicator-size: 16px;

    /* Swatch colors behind initials/icons, per the design system's chart/series palette. */
    --avatar-purple: var(--chart-series-4);
    --avatar-yellow: var(--chart-series-7);
    --avatar-blue: var(--chart-series-1);
    --avatar-orange: var(--chart-series-11);
    --avatar-sea: var(--chart-series-9);
    --avatar-burgundy: var(--chart-series-5);
    --avatar-green: var(--chart-series-6);
  }

  .avatar.ring {
    border: var(--border-width) solid var(--avatar-border-color, var(--border-default));
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .avatar {
    border-radius: var(--radius-pill);
    color: var(--avatar-initials-color, var(--foreground-inverse));
    background-color: var(--avatar-color, var(--avatar-purple));
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-transform: uppercase;
  }

  ::slotted(img) {
    border-radius: var(--radius-pill);
    height: 100%;
    width: 100%;
    display: flex;
    object-fit: cover;
  }

  ::slotted(zeta-icon) {
    --icon-size: calc(var(--computed-avatar-size) * 0.5);
    color: var(--icon-color, var(--foreground-inverse));
  }

  .close,
  .status {
    position: absolute;
    display: inline-flex;
    right: 0;
  }

  .close {
    top: 0;
    cursor: pointer;
  }

  .status {
    bottom: 0;
  }
`;
