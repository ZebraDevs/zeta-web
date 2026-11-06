import { css } from "lit";

import "@zebra-fed/zeta-icons/index.css";

export default [
  css`
    :host[rounded] {
      --icon-font: "zeta-icons-round";
    }
    :host(:not([rounded])) {
      --icon-font: "zeta-icons-sharp";
    }

    :host([size="small"]) {
      --icon-size: var(--control-icon-sm);
    }
    :host([size="large"]) {
      --icon-size: var(--control-icon-lg);
    }

    :host,
    slot {
      display: flex;
      flex-shrink: 0;
      max-width: initial;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-weight: normal;
      font-style: normal;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      text-rendering: optimizeLegibility;
      font-feature-settings: "liga";
      user-select: none;
      color: var(--icon-color, inherit);
      font-size: var(--icon-size, var(--control-icon-md));
      line-height: var(--icon-size, var(--control-icon-md));
      font-family: var(--icon-font, "zeta-icons-round");
      width: var(--icon-size, var(--control-icon-md));
      height: var(--icon-size, var(--control-icon-md));
      -webkit-text-stroke-width: var(--icon-border-width, 2px);
      -webkit-text-stroke-color: var(--icon-border-color, transparent);
      paint-order: stroke fill;
    }

    :host([framed]) {
      width: var(--control-target-min);
      height: var(--control-target-min);
      align-items: center;
      justify-content: center;
    }

    .icon-frame {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host ::slotted(svg) {
      width: var(--icon-size, var(--control-icon-md));
      height: var(--icon-size, var(--control-icon-md));
      fill: var(--icon-color, currentColor);
    }
  `
];
