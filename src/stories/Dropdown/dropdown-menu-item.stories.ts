import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDropdownMenuItem } from "../../index.js";

import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaDropdownMenuItem> = {
  component: "zeta-dropdown-menu-item",
  title: "Dropdown",
  args: {
    rounded: true,
    disabled: false,
    icon: "star",
    type: "default"
  },
  argTypes: {
    type: {
      options: ["default", "checkbox", "radio"],
      control: {
        type: "select"
      }
    },
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const DropdownMenuItem: StoryObj<ZetaDropdownMenuItem> = {
  render: args =>
    html`<zeta-dropdown-menu-item icon=${args.icon} type="${args.type}" .rounded=${args.rounded} .disabled=${args.disabled}>
      Menu Item
    </zeta-dropdown-menu-item>`
};

