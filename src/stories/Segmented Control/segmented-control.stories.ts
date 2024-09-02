import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaSegmentedControl } from "../../components/segmented-control/segmented-control";
import { html } from "lit";
import "../../components/segmented-control/segmented-control";
import "../../components/segmented-control/segmented-item";
import "../../components/icon/icon";

const meta: Meta<ZetaSegmentedControl> = {
  title: "Segmented Control",
  component: "zeta-segmented-control",
  args: {
    rounded: true
  }
};

export default meta;

export const SegmentedControl: StoryObj<ZetaSegmentedControl> = {
  argTypes: { slot: { table: { disable: true } } },
  render: args => html`
    <zeta-segmented-control .rounded=${args.rounded}>
      <zeta-segmented-item>Item 1</zeta-segmented-item>
      <zeta-segmented-item>Item 2</zeta-segmented-item>
      <zeta-segmented-item active>Item 3</zeta-segmented-item>
      <zeta-segmented-item>Item 4</zeta-segmented-item>
    </zeta-segmented-control>
  `
};

export const SegmentedControlWithIcons: StoryObj<ZetaSegmentedControl> = {
  argTypes: { slot: { table: { disable: true } } },
  render: args => html`
    <zeta-segmented-control .rounded=${args.rounded}>
      <zeta-segmented-item active><zeta-icon>star</zeta-icon></zeta-segmented-item>
      <zeta-segmented-item><zeta-icon>star</zeta-icon></zeta-segmented-item>
      <zeta-segmented-item><zeta-icon>star</zeta-icon></zeta-segmented-item>
    </zeta-segmented-control>
  `
};
