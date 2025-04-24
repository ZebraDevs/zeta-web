import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaNavigationRailItem as ZetaNavigationRailItem } from "../../../components/navigation-rail/navigation-rail-item";
import { ZetaIconNameList, type ZetaIconName } from "@zebra-fed/zeta-icons";
import "../../../components/navigation-rail/navigation-rail-item.js";
import { html } from "lit";
import "../../../components/icon/icon";

type ZetaNavigationRailItemStory = ZetaNavigationRailItem & { icon: ZetaIconName };

const meta: Meta<ZetaNavigationRailItemStory> = {
  component: "zeta-navigation-rail-item",
  title: "Components/Navigation Rail",
  args: {
    slot: "Label",
    icon: "star",
    disabled: false,
    rounded: true,
    selected: false,
    href: undefined
  },
  argTypes: {
    icon: {
      control: {
        type: "select"
      },
      options: ZetaIconNameList
    }
  }
};

export default meta;

export const NavigationRailItem: StoryObj<ZetaNavigationRailItemStory> = {
  render: ({ slot, icon, ...args }) => {
    return html`<zeta-navigation-rail-item .disabled=${args.disabled} .selected=${args.selected} .rounded=${args.rounded} .href=${args.href}
      ><zeta-icon slot="icon">${icon}</zeta-icon>${slot}</zeta-navigation-rail-item
    >`;
  }
};
