import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTooltip } from "./tooltip.js";

const meta: Meta<ZetaTooltip> = {
  component: "zeta-tooltip",
  args: {
    label: "Label",
    point: "bottom",
    rounded: false,
    condensed: false
  },
  argTypes: {
    point: {
      options: ["left", "right", "bottom", "top"],
      control: { type: "inline-radio" }
    }
  }
};

export default meta;

export const Tooltip: StoryObj<ZetaTooltip> = {};

