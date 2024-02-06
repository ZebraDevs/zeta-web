import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationItem } from "./navigation-item.js";
import "./navigation-item.js";
import { html } from "lit-html";

const meta: Meta<ZetaNavigationItem> = {
  component: "zeta-navigation-item",
  args: {
    rounded: true,
    disabled: false,
    active: false
  },
  argTypes: {}
};
export default meta;

export const NavigationItem: StoryObj<ZetaNavigationItem> = {
  render: args => html`<zeta-navigation-item .rounded=${args.rounded} ?disabled=${args.disabled} ?active=${args.active}>Menu Item</zeta-navigation-item>`
};
