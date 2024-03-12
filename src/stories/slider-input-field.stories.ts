import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSliderInputField } from "../index.js";

const args: Partial<ZetaSliderInputField> = {
  rounded: true,
  disabled: false,
  error: false,
  label: "Label",
  value: 50,
  min: 0,
  max: 100
};

const meta: Meta<ZetaSliderInputField> = {
  component: "zeta-slider-input-field"
};
export default meta;

export const SliderInputField: StoryObj<ZetaSliderInputField> = {
  args: args
};

export const SteppedSliderInputField: StoryObj<ZetaSliderInputField> = {
  args: { ...args, stepIncrement: 10 }
};

