import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../../index.js";

const meta: Meta<ZetaSlider> = {
  component: "zeta-slider",
  title: "Slider",
  args: { rounded: true, disabled: false, value: 10, min: 0, max: 100 }
};

export default meta;

export const Slider: StoryObj<ZetaSlider> = {};

export const SteppedSlider: StoryObj<ZetaSlider> = {
  args: { stepIncrement: 10 }
};

