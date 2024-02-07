import type { Meta, StoryObj } from "@storybook/react";
import { ZetaInPageBanner } from "./in-page-banner.js";
import React from "react";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../index.js";
const meta: Meta<typeof ZetaInPageBanner> = {
  component: ZetaInPageBanner,
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
  }
};
export default meta;
export const Banner: StoryObj<typeof ZetaInPageBanner> = {};
export const BannerSingleAction: StoryObj<typeof ZetaInPageBanner> = {
  //TODO: This render method may need to change for react
  render: args => (
    <ZetaInPageBanner {...args}>
      <zeta-button slot="leading-action">Button</zeta-button>
    </ZetaInPageBanner>
  )
};
export const BannerDualAction: StoryObj<typeof ZetaInPageBanner> = {
  //TODO: This render method may need to change for react
  render: args => (
    <ZetaInPageBanner {...args}>
      <zeta-button slot="leading-action">Button</zeta-button> <zeta-button slot="trailing-action">Button 2</zeta-button>
    </ZetaInPageBanner>
  )
};
