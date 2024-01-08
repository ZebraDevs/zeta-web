import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaStepperInput } from "./stepper-input.js";
import "./stepper-input.js";

const meta: Meta<ZetaStepperInput> = {
  component: "zeta-stepper-input",
  args: {
    min: 0,
    max: 100,
    condensed: false,
    rounded: false,
    disabled: false,
    size: "medium"
  },
  argTypes: {
    size: {
      options: ["medium", "large"],
      control: { type: "select" }
    }
  }
};

export const StepperInput: StoryObj<ZetaStepperInput> = {};

export default meta;

