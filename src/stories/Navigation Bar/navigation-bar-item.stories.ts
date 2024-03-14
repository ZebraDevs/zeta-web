import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaNavigationBarItem } from "../../index.js";

const meta: Meta<ZetaNavigationBarItem> = {
  component: "zeta-navigation-bar-item",
  title: "Navigation Bar",
  args: {
    rounded: true,
    active: false,
    icon: "star",
    label: "Label"
  },
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const Item: StoryObj<ZetaNavigationBarItem> = {};

export const ItemWithBadge: StoryObj<ZetaNavigationBarItem> = {
  render: args =>
    html`<zeta-navigation-bar-item .rounded=${args.rounded} .active=${args.active} icon=${args.icon} label=${args.label}
      ><zeta-notification-indicator slot="badge">2</zeta-notification-indicator></zeta-navigation-bar-item
    >`
};

