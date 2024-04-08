import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDropdownMenuItem } from "../../index.js";

import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta<ZetaDropdownMenuItem> = {
  component: "zeta-dropdown-menu-item",
  title: "Dropdown",
  args: {
    rounded: true,
    disabled: false,
    icon: "star",
    type: "default",
    checked: false
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
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22391-10146&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const DropdownMenuItem: StoryObj<ZetaDropdownMenuItem> = {
  render: args =>
    html`<zeta-dropdown-menu-item .checked=${args.checked} icon=${ifDefined(args.icon)} type="${args.type}" .rounded=${args.rounded} .disabled=${args.disabled}>
      Menu Item
    </zeta-dropdown-menu-item>`
};
