import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaTabBar } from "../../components/tab-bar/tab-bar.js";
import "../../components/tab-bar/tab-item/tab-item.js";

//TODO: Component seems to be removed from figma.
const meta: Meta<ZetaTabBar> = {
  component: "zeta-tab-bar",
  title: "Components/Tab Bar",
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-18"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const TabBar: StoryObj<ZetaTabBar> = {
  render: () =>
    html`<zeta-tab-bar>
      <zeta-tab-item active>Menu Item</zeta-tab-item>
      <zeta-tab-item>Menu Item</zeta-tab-item>
      <zeta-tab-item>Menu Item</zeta-tab-item>
      <zeta-tab-item>Menu Item</zeta-tab-item>
      <zeta-tab-item>Menu Item</zeta-tab-item>
      <zeta-tab-item disabled>Menu Item</zeta-tab-item>
    </zeta-tab-bar>`
};
