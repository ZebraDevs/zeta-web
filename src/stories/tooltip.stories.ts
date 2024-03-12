import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTooltip } from "../index.js";

const meta: Meta<ZetaTooltip> = {
  component: "zeta-tooltip",
  args: {
    label: "Label",
    point: "bottom",
    rounded: false
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

