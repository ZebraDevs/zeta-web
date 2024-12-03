import themes from "./ZetaTheme";
import { addons } from '@storybook/manager-api';
const setDarkMode = (isDarkMode) => {
  addons.setConfig({
    theme: isDarkMode ? themes.dark : themes.light
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  setDarkMode(event.matches);
});

setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);