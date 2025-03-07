import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaStepperInput } from "../components/stepper-input/stepper-input.js";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

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
    value: "1"
  },
  argTypes: {
    size: {
      options: ["medium", "large"],
      control: { type: "select" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21529-9963&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export const StepperInput: StoryObj<ZetaStepperInput> = {
  render: args => html`
    <zeta-stepper-input
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      value=${ifDefined(args.value)}
      size=${args.size}
      ?rounded=${args.rounded}
      ?disabled=${args.disabled}
    ></zeta-stepper-input>
  `
};

export default meta;
