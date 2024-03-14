import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationDrawerSubItem } from "../../index.js";

const meta: Meta<ZetaNavigationDrawerSubItem> = {
  component: "zeta-navigation-drawer-sub-item",
  title: "Navigation Drawer",
  args: {
    headline: "Navigation Sub Item",
    rounded: true,
    active: false,
    disabled: false
  },
  argTypes: {}
};
export default meta;

export const SubItem: StoryObj<ZetaNavigationDrawerSubItem> = {};

