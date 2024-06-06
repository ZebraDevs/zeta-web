import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationHeader } from "../../components/navigation-header/navigation-header.js";
import "../../components/navigation-header/navigation-item/navigation-item.js";

//TODO: Component seems to be removed from figma.
const meta: Meta<ZetaNavigationHeader> = {
  component: "zeta-navigation-header",
  title: "Navigation Header"
};
export default meta;

export const NavigationHeader: StoryObj<ZetaNavigationHeader> = {
  render: () =>
    html`<zeta-navigation-header>
      <zeta-navigation-item active>Menu Item</zeta-navigation-item>
      <zeta-navigation-item>Menu Item</zeta-navigation-item>
      <zeta-navigation-item>Menu Item</zeta-navigation-item>
      <zeta-navigation-item>Menu Item</zeta-navigation-item>
      <zeta-navigation-item>Menu Item</zeta-navigation-item>
      <zeta-navigation-item disabled>Menu Item</zeta-navigation-item>
    </zeta-navigation-header>`
};
