import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationDrawerHeader } from "../../components/navigation-drawer/navigation-drawer-header/navigation-drawer-header.js";
import { spreadGenerator } from "../utils.js";
const spread = spreadGenerator(ZetaNavigationDrawerHeader);
import "../../components/avatar/avatar.js";
import "../../components/icon/icon.js";

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
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1092-21721&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const Header: StoryObj = {
  render: args => html`<zeta-navigation-drawer-header ${spread(args)}></zeta-navigation-drawer-header>`
};

export const HeaderAvatarAndIcon: StoryObj = {
  render: args =>
    html`<zeta-navigation-drawer-header ${spread(args)}>
      <zeta-avatar slot="leading"></zeta-avatar>
      <zeta-icon slot="trailing" color="white">settings</zeta-icon>
    </zeta-navigation-drawer-header>`
};
