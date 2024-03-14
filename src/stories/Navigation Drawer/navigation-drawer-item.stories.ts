import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationDrawerItem } from "../../index.js";

const meta: Meta<ZetaNavigationDrawerItem> = {
  component: "zeta-navigation-drawer-item",
  title: "Navigation Drawer",
  args: {
    headline: "Navigation Item",
    rounded: true,
    disabled: false,
    active: false
  }
};
export default meta;

export const Item: StoryObj<ZetaNavigationDrawerItem> = {};

export const ItemWithLeadingIcon: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${args.headline} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
    </zeta-navigation-drawer-item>`
};

export const ItemWithLeadingAndTrailingIcon: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${args.headline} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
      <zeta-icon slot="trailing">more_vertical</zeta-icon>
    </zeta-navigation-drawer-item>`
};

export const ItemWithBadge: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${args.headline} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
      <zeta-text-badge slot="badge" status="info">99+</zeta-text-badge>
      <zeta-icon slot="trailing">more_vertical</zeta-icon>
    </zeta-navigation-drawer-item>`
};

