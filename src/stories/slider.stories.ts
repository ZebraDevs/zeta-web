import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../index.js";

const args: Partial<ZetaSlider> = {
  rounded: true,
  disabled: false,
  value: 10,
  min: 0,
  max: 100
};

const meta: Meta<ZetaSlider> = {
  component: "zeta-slider"
};

export default meta;

export const Slider: StoryObj<ZetaSlider> = {
  args: args
};

export const SteppedSlider: StoryObj<ZetaSlider> = {
  args: { ...args, stepIncrement: 10 }
};

