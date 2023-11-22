import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaInPageBanner } from "./in-page-banner.js";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../index.js";

const meta: Meta<ZetaInPageBanner> = {
  component: "zeta-in-page-banner",
  args: {
    title: "Banner title",
    body: "Lorem ipsum dolor sit amet, conse ctetur  cididunt ut labore et do lore magna aliqua.",
    rounded: true,
    condensed: false,
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

export const Banner: StoryObj<ZetaInPageBanner> = {};

export const BannerSingleAction: StoryObj<ZetaInPageBanner> = {
  render: args =>
    html`<zeta-in-page-banner
      title=${ifDefined(args.title)}
      body=${ifDefined(args.body)}
      .rounded=${ifDefined(args.rounded)}
      .condensed=${ifDefined(args.condensed)}
      status=${ifDefined(args.status)}
    >
      <zeta-button slot="leading-action">Button</zeta-button>
    </zeta-in-page-banner>`
};

export const BannerDualAction: StoryObj<ZetaInPageBanner> = {
  render: args =>
    html`<zeta-in-page-banner
      title=${ifDefined(args.title)}
      body=${ifDefined(args.body)}
      .rounded=${ifDefined(args.rounded)}
      .condensed=${ifDefined(args.condensed)}
      status=${ifDefined(args.status)}
      ><zeta-button slot="leading-action">Button</zeta-button> <zeta-button slot="trailing-action">Button 2</zeta-button>
    </zeta-in-page-banner>`
};

