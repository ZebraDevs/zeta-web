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
      transition: all 0.3s ease-in-out;
      color: var(--icon-color, var(--main-default));
      font-size: var(--icon-size, var(--spacing-2xl));
      line-height: var(--icon-size, 1);
      font-family: var(--icon-font, "zeta-icons-round");
      width: var(--icon-size, var(--spacing-2xl));
      height: var(--icon-size, var(--spacing-2xl));
      -webkit-text-stroke-width: var(--icon-border-width, 2px);
      -webkit-text-stroke-color: var(--icon-border-color, transparent);
      paint-order: stroke fill;
    }

    :host ::slotted(svg) {
      width: var(--icon-size, var(--spacing-2xl));
      height: var(--icon-size, var(--spacing-2xl));
      fill: var(--icon-color, var(--main-default));
    }
  `
];
