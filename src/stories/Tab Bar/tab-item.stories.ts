import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaTabItem } from "../../components/tab-bar/tab-item/tab-item.js";

const meta: Meta<ZetaTabItem> = {
  component: "zeta-tab-item",
  title: "Tab Bar",
  args: {
    rounded: true,
    disabled: false,
    active: false
  },
  argTypes: {}
};
export default meta;

export const Item: StoryObj<ZetaTabItem> = {
  render: args => html`<zeta-tab-item .rounded=${args.rounded} ?disabled=${args.disabled} ?active=${args.active}>Menu Item</zeta-tab-item>`
};
