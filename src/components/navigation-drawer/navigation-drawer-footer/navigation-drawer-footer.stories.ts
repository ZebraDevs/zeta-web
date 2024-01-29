import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationDrawerFooter } from "./navigation-drawer-footer.js";
import "./navigation-drawer-footer.js";
import { html } from "lit";

const meta: Meta<ZetaNavigationDrawerFooter> = {
  component: "zeta-navigation-drawer-footer",
  args: {
    headline: "Title",
    subHeadline: "subtitle",
    divide: false
  },
  argTypes: {}
};
export default meta;

export const NavigationDrawerFooter: StoryObj<ZetaNavigationDrawerFooter> = {};

export const AvatarAndIcon: StoryObj<ZetaNavigationDrawerFooter> = {
  render: args =>
    html`<zeta-navigation-drawer-footer headline=${args.headline} sub-headline=${args.subHeadline} .divide=${args.divide}
      ><zeta-avatar slot="leading"></zeta-avatar><zeta-icon slot="trailing" color="white">settings</zeta-icon></zeta-navigation-drawer-footer
    >`
};
