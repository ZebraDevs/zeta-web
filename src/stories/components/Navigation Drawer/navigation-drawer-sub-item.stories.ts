import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationDrawerSubItem } from "../../../components/navigation-drawer/navigation-drawer-sub-item/navigation-drawer-sub-item.js";

const meta: Meta<ZetaNavigationDrawerSubItem> = {
  component: "zeta-navigation-drawer-sub-item",
  title: "Components/Navigation Drawer",
  args: {
    headline: "Navigation Sub Item",
    rounded: true,
    active: false,
    disabled: false
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1092-24772&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const SubItem: StoryObj<ZetaNavigationDrawerSubItem> = {};
