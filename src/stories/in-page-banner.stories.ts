import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaInPageBanner } from "../components/in-page-banner/in-page-banner.js";
import "../components/button/button.js";
import { spreadGenerator } from "./utils.js";
const spread = spreadGenerator(ZetaInPageBanner);

const meta: Meta<ZetaInPageBanner> = {
  component: "zeta-in-page-banner",
  tags: ["autodocs"],
  title: "In Page Banner",
  args: {
    title: "Banner title",
    body: "Lorem ipsum dolor sit amet, conse ctetur  cididunt ut labore et do lore magna aliqua.",
    rounded: true,
    status: "default"
  },
  argTypes: {
    status: {
      options: ["default", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21156-27071&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export const Banner: StoryObj<ZetaInPageBanner> = {};

export const BannerSingleAction: StoryObj = {
  render: args =>
    html`<zeta-in-page-banner ${spread(args)}>
      <zeta-button slot="leading-action">Button</zeta-button>
    </zeta-in-page-banner>`
};

export const BannerDualAction: StoryObj = {
  render: args =>
    html`<zeta-in-page-banner ${spread(args)}>
      <zeta-button slot="leading-action">Button</zeta-button>
      <zeta-button slot="trailing-action">Button 2</zeta-button>
    </zeta-in-page-banner>`
};

export default meta;
