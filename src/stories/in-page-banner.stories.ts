import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { ZetaInPageBanner } from "../index.js";

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
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21156-27071&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Banner: StoryObj<ZetaInPageBanner> = {};

export const BannerSingleAction: StoryObj<ZetaInPageBanner> = {
  render: args =>
    html`<zeta-in-page-banner title=${ifDefined(args.title)} body=${ifDefined(args.body)} .rounded=${args.rounded} status=${ifDefined(args.status)}>
      <zeta-button slot="leading-action">Button</zeta-button>
    </zeta-in-page-banner>`
};

export const BannerDualAction: StoryObj<ZetaInPageBanner> = {
  render: args =>
    html`<zeta-in-page-banner title=${ifDefined(args.title)} body=${ifDefined(args.body)} .rounded=${args.rounded} status=${ifDefined(args.status)}
      ><zeta-button slot="leading-action">Button</zeta-button> <zeta-button slot="trailing-action">Button 2</zeta-button>
    </zeta-in-page-banner>`
};
