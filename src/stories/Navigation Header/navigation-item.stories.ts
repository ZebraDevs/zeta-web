import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationItem } from "../../index.js";

const meta: Meta<ZetaNavigationItem> = {
  component: "zeta-navigation-item",
  title: "Navigation Header",
  args: {
    rounded: true,
    disabled: false,
    active: false
  },
  argTypes: {}
};
export default meta;

export const Item: StoryObj<ZetaNavigationItem> = {
  render: args => html`<zeta-navigation-item .rounded=${args.rounded} ?disabled=${args.disabled} ?active=${args.active}>Menu Item</zeta-navigation-item>`
};
