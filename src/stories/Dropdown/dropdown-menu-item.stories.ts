import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDropdownMenuItem } from "../../components/dropdown/menu-item/dropdown-menu-item.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { spreadGenerator } from "../utils.js";
import "../../components/icon/icon.js";

const spread = spreadGenerator(ZetaDropdownMenuItem);

const meta: Meta<ZetaDropdownMenuItem | { icon: string }> = {
  component: "zeta-dropdown-menu-item",
  title: "Dropdown",
  args: {
    rounded: true,
    disabled: false,
    icon: "star",
    type: "default",
    checked: false,
    slot: "Menu Item"
  },
  argTypes: {
    type: {
      options: ["default", "checkbox", "radio"],
      control: { type: "select" }
    },
    icon: {
      options: ZetaIconNameList,
      control: { type: "select" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22391-10146&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: { type: "needsAttention" }
  }
};

export default meta;

export const DropdownMenuItem: StoryObj<ZetaDropdownMenuItem> = {
  render: ({ slot, icon, ...args }) =>
    html`
    <zeta-dropdown-menu-item ${spread(args)}>
      <zeta-icon slot="icon">${icon}</zeta-icon>
      ${slot}
    </zeta-dropdown-menu-item>
  `
};
