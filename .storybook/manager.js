import { addons } from "@storybook/addons";
import themes from "./ZetaTheme";

const setDarkMode = (isDarkMode) => {
  addons.setConfig({
    theme: isDarkMode ? themes.dark : themes.light
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  setDarkMode(event.matches);
});

setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);