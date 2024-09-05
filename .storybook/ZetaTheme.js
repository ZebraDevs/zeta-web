// .storybook/YourTheme.js

import { create } from "@storybook/theming";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

const shared = {
  // Typography
  fontCode: "monospace",

  inputBorderRadius: 0,

  brandTitle: "Zeta Design System",
  brandUrl: "https://www.zebra.com",
  brandTarget: "_self",
};

export default {
  light: create({
    ...shared,
    ...{
      base: "light",
      brandImage: logoLight,

      // UI
      appBg: "white",
      appBorderColor: "grey",
      appBorderRadius: 0,

      // Toolbar default and active colors
      barTextColor: "white",
      barSelectedColor: "#E0E3E9",
      barBg: "#1d1e23",

      // Form colors
      inputBg: "white",
      inputBorder: "silver",
      inputTextColor: "black",

      // Text colors
      textColor: "#1d1e23", //"var(--main-default)",
      textInverseColor: "#ffffff", //"var(--main-inverse)",
      colorPrimary: "#1d1e23", //"var(--color-cool-90)"
    },
  }),
  dark: create({
    ...shared,
    ...{
      base: "dark",
      brandImage: logoDark,

      // UI
      appBg: "black",
      appBorderColor: "grey",
      appBorderRadius: 0,

      // Toolbar default and active colors
      barTextColor: "white",
      barSelectedColor: "#E0E3E9",
      barBg: "#1d1e23",

      // Form colors
      inputBg: "white",
      inputBorder: "silver",
      inputTextColor: "black",

      // Text colors
      textColor: "#f8fbff", //"var(--main-default)",
      textInverseColor: "#000000", //"var(--main-inverse)",
      colorPrimary: "#f3f6fa", //"var(--color-cool-90)"
    },
  }),
};
