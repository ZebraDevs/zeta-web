import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ifDefined } from "lit/directives/if-defined.js";
import type { ZetaGridMenuItem } from "../../components/grid-menu-item/grid-menu-item.js";
import "../../components/grid-menu-item/grid-menu-item";

const meta: Meta<ZetaGridMenuItem> = {
  component: "zeta-grid-menu-item",
  title: "Grid Menu Item",
  tags: ["autodocs"],
  args: {
    rounded: true,
    active: false,
    icon: "star",
    label: "Label",
    notificationValue: ""
  },
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    notificationValue: {
      options: [true, false, "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21186-41419&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Item: StoryObj<ZetaGridMenuItem> = {
  render: args => {
    return html`<zeta-grid-menu-item
      .rounded=${args.rounded}
      .active=${args.active}
      icon=${ifDefined(args.icon)}
      label=${ifDefined(args.label)}
      .notificationValue=${args.notificationValue}
    >
    </zeta-grid-menu-item>`;
  }
};
