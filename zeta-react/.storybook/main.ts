import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import viteConfig from "../../vite.config";

const config: StorybookConfig = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-mdx-gfm"],
  framework: {
    name: "@storybook/react-vite",
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

