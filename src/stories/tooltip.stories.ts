import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTooltip } from "../index.js";

const meta: Meta<ZetaTooltip> = {
  component: "zeta-tooltip",
  tags: ["autodocs"],
  title: "Tooltip",
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
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21816-222&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Tooltip: StoryObj<ZetaTooltip> = {};
