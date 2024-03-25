import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../../index.js";

// TODO: Although this component is the same code, the design is on a different page. Should this be moved?
const meta: Meta<ZetaSlider> = {
  component: "zeta-slider",
  title: "Slider",
  args: {
    rounded: true,
    disabled: false,
    lowerValue: 10,
    upperValue: 90,
    min: 0,
    max: 100,
    type: "range"
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1186-28564&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const RangeSlider: StoryObj<ZetaSlider> = {};

export const SteppedRangeSlider: StoryObj<ZetaSlider> = {
  args: { stepIncrement: 10 }
};

