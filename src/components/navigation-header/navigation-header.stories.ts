import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationHeader } from "./navigation-header.js";
import "./navigation-header.js";
import "./navigation-item/navigation-item.js";
import { html } from "lit-html";

const meta: Meta<ZetaNavigationHeader> = {
  component: "zeta-navigation-header",
  args: {},
  argTypes: {}
};
export default meta;

export const NavigationHeader: StoryObj<ZetaNavigationHeader> = {
  render: () => html`<zeta-navigation-header>
    <zeta-navigation-item active>Menu Item</zeta-navigation-item>
    <zeta-navigation-item>Menu Item</zeta-navigation-item>
    <zeta-navigation-item>Menu Item</zeta-navigation-item>
    <zeta-navigation-item>Menu Item</zeta-navigation-item>
    <zeta-navigation-item disabled>Menu Item</zeta-navigation-item>
    <zeta-navigation-item>Menu Item</zeta-navigation-item>
  </zeta-navigaiton-item>`
};
