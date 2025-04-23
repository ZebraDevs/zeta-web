import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDropdownMenuItem } from "../../../components/dropdown/menu-item/dropdown-menu-item.js";
import { ZetaIconNameList, type ZetaIconName } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaDropdownMenuItem & { icon: ZetaIconName }> = {
  component: "zeta-dropdown-menu-item",
  title: "Components/Dropdown",
  args: {
    rounded: true,
    disabled: false,
    icon: "star",
    slot: "Menu Item"
  },
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: { type: "select" }
    },
    tabIndex: {
      table: { disable: true }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22391-10146&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: { type: "ready" }
  }
};

export default meta;

export const DropdownMenuItem: StoryObj<ZetaDropdownMenuItem & { icon: ZetaIconName }> = {
  render: args =>
    html`<zeta-dropdown-menu-item .rounded=${args.rounded} .disabled=${args.disabled}>
      <zeta-icon .rounded=${args.rounded} slot="icon">${args.icon}</zeta-icon>
      ${args.slot}
    </zeta-dropdown-menu-item>`
};
