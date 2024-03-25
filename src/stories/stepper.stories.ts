import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaStepper } from "../index.js";

const meta: Meta<ZetaStepper> = {
  component: "zeta-stepper",
  tags: ["autodocs"],
  title: "Stepper",
  args: { bar: false, rounded: false, activeStep: 0 },
  argTypes: {
    variant: {
      options: ["vertical", "horizontal"],
      control: { type: "inline-radio" }
    }
  }
};

export default meta;

export const Horizontal: StoryObj<ZetaStepper> = {
  render: args => {
    return html`
      <zeta-stepper .bar=${args.bar} active-step=${args.activeStep} variant="horizontal" .rounded=${args.rounded}>
        <li data-title="title 1" data-label="label 1"></li>
        <li data-title="title 2" data-label="label 2"></li>
        <li data-title="title 3" data-label="label 3"></li>
      </zeta-stepper>
    `;
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21529-11408&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};
export const Vertical: StoryObj<ZetaStepper> = {
  render: args => {
    return html`
      <zeta-stepper .bar=${args.bar} active-step=${args.activeStep} variant="vertical" .rounded=${args.rounded}>
        <li data-title="title 1" data-label="label 1"></li>
        <li data-title="title 2" data-label="label 2"></li>
        <li data-title="title 3" data-label="label 3"></li>
      </zeta-stepper>
    `;
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21529-11531&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

