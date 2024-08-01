import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaNavigationBarItem } from "../../components/navigation-bar/navigation-bar-item/navigation-bar-item.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../components/badges/indicators/indicators.js";

const meta: Meta<ZetaNavigationBarItem> = {
  component: "zeta-navigation-bar-item",
  title: "Navigation Bar",
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

export const Item: StoryObj<ZetaNavigationBarItem> = {
  render: args => {
    return html`<zeta-navigation-bar-item
      .rounded=${args.rounded}
      .active=${args.active}
      icon=${ifDefined(args.icon)}
      label=${ifDefined(args.label)}
      .notificationValue=${args.notificationValue}
    >
    </zeta-navigation-bar-item>`;
  }
};
