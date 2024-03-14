import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../../index.js";

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
  }
};

export default meta;

export const RangeSlider: StoryObj<ZetaSlider> = {};

export const SteppedRangeSlider: StoryObj<ZetaSlider> = {
  args: { stepIncrement: 10 }
};

