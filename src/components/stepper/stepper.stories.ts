import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaStepper } from "./stepper.js";
import { html } from "lit";

const meta: Meta<ZetaStepper> = {
  component: "zeta-stepper",
  args: { bar: false, variant: "vertical", rounded: false, activeStep: 0 },
  argTypes: {
    variant: {
      options: ["vertical", "horizontal"],
      control: { type: "inline-radio" }
    }
  }
};

export default meta;

export const Stepper: StoryObj<ZetaStepper> = {
  render: args => {
    return html`
      <zeta-stepper .bar=${args.bar} active-step=${args.activeStep} variant="${args.variant}.rounded" =${args.rounded}>
        <li data-title="title 1" data-label="label 1"></li>
        <li data-title="title 2" data-label="label 2"></li>
        <li data-title="title 3" data-label="label 3"></li>
      </zeta-stepper>
    `;
  }
};

