import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationDrawerSubItem } from "./navigation-drawer-sub-item.js";
import "./navigation-drawer-sub-item.js";

const meta: Meta<ZetaNavigationDrawerSubItem> = {
  component: "zeta-navigation-drawer-sub-item",
  args: {
    headline: "Navigation Sub Item",
    rounded: true,
    active: false,
    disabled: false
  },
  argTypes: {}
};
export default meta;

export const NavigationDrawerSubItem: StoryObj<ZetaNavigationDrawerSubItem> = {};
