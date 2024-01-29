import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationDrawerItem } from "./navigation-drawer-item.js";
import "./navigation-drawer-item.js";
import "../../icon/icon.js";
import "../../badges/text-badge/text-badge.js";
import { html } from "lit";

const meta: Meta<ZetaNavigationDrawerItem> = {
  component: "zeta-navigation-drawer-item",
  args: {
    headline: "Navigation Item",
    rounded: true,
    disabled: false,
    active: false
  }
};
export default meta;

export const NavigationDrawerItem: StoryObj<ZetaNavigationDrawerItem> = {};

export const WithLeadingIcon: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${args.headline} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
    </zeta-navigation-drawer-item>`
};

export const WithLeadingAndTrailingIcon: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${args.headline} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
      <zeta-icon slot="trailing">more_vertical</zeta-icon>
    </zeta-navigation-drawer-item>`
};

export const WithBadge: StoryObj<ZetaNavigationDrawerItem> = {
  render: args =>
    html`<zeta-navigation-drawer-item headline=${args.headline} .rounded=${args.rounded} .disabled=${args.disabled} .active=${args.active}>
      <zeta-icon slot="leading">star</zeta-icon>
      <zeta-text-badge slot="badge" status="info">99+</zeta-text-badge>
      <zeta-icon slot="trailing">more_vertical</zeta-icon>
    </zeta-navigation-drawer-item>`
};
