import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../../index.js";

const meta: Meta<ZetaSlider> = {
  component: "zeta-slider",
  title: "Slider",
  args: { rounded: true, disabled: false, value: 10, min: 0, max: 100 },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=875-15530&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Slider: StoryObj<ZetaSlider> = {};

export const SteppedSlider: StoryObj<ZetaSlider> = {
  args: { stepIncrement: 10 }
};

