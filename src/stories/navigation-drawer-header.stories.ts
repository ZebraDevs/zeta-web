import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationDrawerHeader } from "../index.js";

const meta: Meta<ZetaNavigationDrawerHeader> = {
  component: "zeta-navigation-drawer-header",
  args: {
    headline: "Title",
    subHeadline: "subtitle",
    divide: false
  },
  argTypes: {}
};
export default meta;

export const NavigationDrawerHeader: StoryObj<ZetaNavigationDrawerHeader> = {};

export const AvatarAndIcon: StoryObj<ZetaNavigationDrawerHeader> = {
  render: args =>
    html`<zeta-navigation-drawer-header headline=${args.headline} sub-headline=${args.subHeadline} .divide=${args.divide}
      ><zeta-avatar slot="leading"></zeta-avatar><zeta-icon slot="trailing" color="white">settings</zeta-icon></zeta-navigation-drawer-header
    >`
};

