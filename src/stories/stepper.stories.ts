import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { spreadGenerator } from "./utils.js";
const spread = spreadGenerator(ZetaStepper);
import { ZetaStepper } from "../components/stepper/stepper.js";

const meta: Meta<ZetaStepper> = {
  component: "zeta-stepper",
  tags: ["autodocs"],
  title: "Stepper",
  args: { bar: false, rounded: false, activeStep: 0 },
  argTypes: {
    variant: {
      table: { disable: true }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=3420-67488"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Horizontal: StoryObj = {
  render: args => {
    return html`
      <zeta-stepper ${spread(args)} variant="horizontal">
        <li data-title="title 1" data-label="label 1"></li>
        <li data-title="title 2" data-label="label 2"></li>
        <li data-title="title 3" data-label="label 3"></li>
      </zeta-stepper>
    `;
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21529-11408&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};
export const Vertical: StoryObj = {
  render: args => {
    return html`
      <zeta-stepper ${spread(args)} variant="vertical">
        <li data-title="title 1" data-label="label 1"></li>
        <li data-title="title 2" data-label="label 2"></li>
        <li data-title="title 3" data-label="label 3"></li>
      </zeta-stepper>
    `;
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21529-11531&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
