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
      line-height: 1;
      max-width: initial;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: "liga";
      user-select: none;
      height: var(--icon-size, 24px);
      width: var(--icon-size, 24px);
      transition: all 0.3s ease-in-out;
      color: var(--icon-color, var(--main-default));
      font-size: var(--icon-size, 24px);
      line-height: var(--icon-size, 1);
      font-family: var(--icon-font, "zeta-icons-round");
    }
  `
];
