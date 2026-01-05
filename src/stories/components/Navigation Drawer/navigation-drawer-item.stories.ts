import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationDrawerItem } from "../../../components/navigation-drawer/navigation-drawer-item/navigation-drawer-item.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../components/icon/icon.js";
import "../../../components/badges/label/label.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaNavigationDrawerItem);

const meta: Meta<ZetaNavigationDrawerItem> = {
  component: "zeta-navigation-drawer-item",
  title: "Components/Navigation Drawer",
  args: {
    headline: "Navigation Item",
    rounded: true,
    disabled: false,
    active: false
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1092-22034&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const Item: StoryObj<ZetaNavigationDrawerItem> = {
  argTypes: {
    rounded: { table: { disable: true } }
  }
};

export const ExpandableItem: StoryObj<ZetaNavigationDrawerItem> = {
  argTypes: {
    rounded: { table: { disable: true } },
    expandable: { table: { disable: true } }
  },
  args: {
    expandable: true,
    headline: "Global Configurations"
  },
  render: args =>
    html`<zeta-navigation-drawer-item ${spread(args)}>
      <zeta-navigation-drawer-item expandable slot="children">
        <zeta-icon slot="leading" name="label"></zeta-icon>Tags
        <zeta-navigation-drawer-item slot="children"> <zeta-icon slot="leading" name="wifi"></zeta-icon>Wi-Fi Presets </zeta-navigation-drawer-item>
      </zeta-navigation-drawer-item>
    </zeta-navigation-drawer-item>`
};

export const ItemWithLeadingIcon: StoryObj<ZetaNavigationDrawerItem | any> = {
  args: {
    leading: "star"
  },
  argTypes: {
    leading: {
      options: ZetaIconNameList,
      control: { type: "select" }
    }
  },
  render: args =>
    html`<zeta-navigation-drawer-item headline=${ifDefined(args.headline)} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">${args.leading}</zeta-icon>
    </zeta-navigation-drawer-item>`
};

export const ItemWithLeadingAndTrailingIcon: StoryObj<ZetaNavigationDrawerItem | any> = {
  args: {
    leading: "star",
    trailing: "more_vertical"
  },
  argTypes: {
    leading: {
      options: ZetaIconNameList,
      control: { type: "select" }
    },
    trailing: {
      options: ZetaIconNameList,
      control: { type: "select" }
    }
  },
  render: args =>
    html`<zeta-navigation-drawer-item headline=${ifDefined(args.headline)} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">${args.leading}</zeta-icon>
      <zeta-icon slot="trailing">${args.trailing}</zeta-icon>
    </zeta-navigation-drawer-item>`
};

export const ItemWithBadge: StoryObj<ZetaNavigationDrawerItem | any> = {
  args: {
    leading: "star",
    trailing: "more_vertical"
  },
  argTypes: {
    leading: {
      options: ZetaIconNameList,
      control: { type: "select" }
    },
    trailing: {
      options: ZetaIconNameList,
      control: { type: "select" }
    }
  },
  render: args =>
    html`<zeta-navigation-drawer-item headline=${ifDefined(args.headline)} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">${args.leading}</zeta-icon>
      <zeta-label slot="badge" status="info">99+</zeta-label>
      <zeta-icon slot="trailing">${args.trailing}</zeta-icon>
    </zeta-navigation-drawer-item>`
};
