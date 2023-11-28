import type { StorybookConfig } from "@storybook/web-components-vite";
import { mergeConfig } from "vite";
import viteConfig from "../vite.config";

const config: StorybookConfig = {
  stories: ["../**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  core: {
    disableTelemetry: true
  }
};
export default mergeConfig(viteConfig, config);

