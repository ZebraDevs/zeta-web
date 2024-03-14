import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationHeader } from "../../index.js";

const meta: Meta<ZetaNavigationHeader> = {
  component: "zeta-navigation-header",
  title: "Navigation Header",
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

