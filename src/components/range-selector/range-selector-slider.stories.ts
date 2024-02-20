import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../slider/slider/slider.js";
import "../slider/slider/slider.js";

const args: Partial<ZetaSlider> = {
  rounded: true,
  disabled: false,
  lowerValue: 10,
  upperValue: 90,
  min: 0,
  max: 100,
  type: "range"
};

const meta: Meta<ZetaSlider> = {
  component: "zeta-slider"
};

export default meta;

export const RangeSlider: StoryObj<ZetaSlider> = {
  args: { ...args }
};

export const SteppedRangeSlider: StoryObj<ZetaSlider> = {
  args: { ...args, stepIncrement: 10 }
};
