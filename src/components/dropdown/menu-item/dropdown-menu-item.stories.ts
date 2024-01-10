import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaDropdownMenuItem } from "./dropdown-menu-item.js";
import { html } from "lit";
import "./dropdown-menu-item.js";
import "../../icon/icon.js";
import "../../checkbox/checkbox.js";
import "../../radio-button/radio-button.js";

import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaDropdownMenuItem> = {
  component: "zeta-dropdown-menu-item",
  args: {
    rounded: true,
    condensed: false,
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
    html`<zeta-dropdown-menu-item icon=${args.icon} type=${args.type} .condensed=${args.condensed} .rounded=${args.rounded} .disabled=${args.disabled}>
      Menu Item
    </zeta-dropdown-menu-item>`
};
