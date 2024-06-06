import type { StorybookConfig } from "@storybook/web-components-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    "@etchteam/storybook-addon-status"
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },

  staticDirs: ["../assets/", "../.release-please/"],
};
export default config;
