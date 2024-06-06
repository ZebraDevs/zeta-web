import { css /*unsafeCSS*/ } from "lit";
// import * as styles from "@zebra-fed/zeta-icons/index.css" assert { type: "css" };
export default [
  // unsafeCSS(styles),
  css`
    :host {
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
    }
    :host .icon.rounded {
      font-family: "zeta-icons-round" !important;
    }
    :host .icon.sharp {
      font-family: "zeta-icons-sharp" !important;
    }
  `
];
