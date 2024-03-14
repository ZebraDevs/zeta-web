import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSliderInputField } from "../../index.js";

const meta: Meta<ZetaSliderInputField> = {
  component: "zeta-slider-input-field",
  title: "Slider",
  args: { rounded: true, disabled: false, error: false, label: "Label", value: 50, min: 0, max: 100 }
};
export default meta;

export const SliderInputField: StoryObj<ZetaSliderInputField> = {};

export const SteppedSliderInputField: StoryObj<ZetaSliderInputField> = {
  args: { stepIncrement: 10 }
};

