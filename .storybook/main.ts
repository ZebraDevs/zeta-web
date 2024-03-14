import type { StorybookConfig } from "@storybook/web-components-vite";
import { mergeConfig } from "vite";
import viteConfig from "../vite.config";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true
  },
  staticDirs: ["./static"]
};
export default mergeConfig(viteConfig, config);

