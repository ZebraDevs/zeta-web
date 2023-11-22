// .storybook/YourTheme.js

import { create } from "@storybook/theming";
import logo from './logo.png'

export default create({
  base: "light",

  colorPrimary: "#1d1e23",

  // UI
  appBg: "white",
  appBorderColor: "grey",
  appBorderRadius: 0,

  // Typography
  fontCode: "monospace",

  // Text colors
  textColor: "#1d1e23",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "white",
  barSelectedColor: "#E0E3E9",
  barBg: "#1d1e23",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 0,

  brandTitle: "Zeta Design System",
  brandUrl: "https://www.zebra.com",
  brandImage: logo,
  brandTarget: "_self",


});
