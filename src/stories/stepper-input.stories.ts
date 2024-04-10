import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaStepperInput } from "../index.js";

const meta: Meta<ZetaStepperInput> = {
  component: "zeta-stepper-input",
  tags: ["autodocs"],
  title: "Stepper Input",
  args: {
    min: 0,
    max: 100,
    rounded: false,
    disabled: false,
    size: "medium",
    value: 1
  },
  argTypes: {
    size: {
      options: ["medium", "large"],
      control: { type: "select" }
    }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21529-9963&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export const StepperInput: StoryObj<ZetaStepperInput> = {};

export default meta;
