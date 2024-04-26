import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationDrawerItem } from "../../index.js";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta<ZetaNavigationDrawerItem> = {
  component: "zeta-navigation-drawer-item",
  title: "Navigation Drawer",
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

export const ItemWithLeadingIcon: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${ifDefined(args.headline)} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
    </zeta-navigation-drawer-item>`
};

export const ItemWithLeadingAndTrailingIcon: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${ifDefined(args.headline)} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
      <zeta-icon slot="trailing">more_vertical</zeta-icon>
    </zeta-navigation-drawer-item>`
};

export const ItemWithBadge: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${ifDefined(args.headline)} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
      <zeta-label slot="badge" status="info">99+</zeta-label>
      <zeta-icon slot="trailing">more_vertical</zeta-icon>
    </zeta-navigation-drawer-item>`
};
