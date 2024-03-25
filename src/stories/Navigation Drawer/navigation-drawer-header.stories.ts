import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationDrawerHeader } from "../../index.js";

const meta: Meta<ZetaNavigationDrawerHeader> = {
  component: "zeta-navigation-drawer-header",
  title: "Navigation Drawer",
  args: {
    headline: "Title",
    subHeadline: "subtitle",
    divide: false
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1092-21721&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const Header: StoryObj<ZetaNavigationDrawerHeader> = {};

export const HeaderAvatarAndIcon: StoryObj<ZetaNavigationDrawerHeader> = {
  render: args =>
    html`<zeta-navigation-drawer-header headline=${args.headline} sub-headline=${args.subHeadline} .divide=${args.divide}
      ><zeta-avatar slot="leading"></zeta-avatar><zeta-icon slot="trailing" color="white">settings</zeta-icon></zeta-navigation-drawer-header
    >`
};

