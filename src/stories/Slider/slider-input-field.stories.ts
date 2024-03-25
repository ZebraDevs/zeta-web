import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSliderInputField } from "../../index.js";

const meta: Meta<ZetaSliderInputField> = {
  component: "zeta-slider-input-field",
  title: "Slider",
  args: { rounded: true, disabled: false, error: false, label: "Label", value: 50, min: 0, max: 100 },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=875-14677&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const SliderInputField: StoryObj<ZetaSliderInputField> = {};

export const SteppedSliderInputField: StoryObj<ZetaSliderInputField> = {
  args: { stepIncrement: 10 }
};

