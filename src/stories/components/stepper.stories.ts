import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
const spread = spreadGenerator(ZetaStepper);
import { ZetaStepper } from "../../components/stepper/stepper.js";
import type { StepperItemFlavor } from "../../components/stepper/stepper-item.js";

type Args = ZetaStepper & {
  flavor1: StepperItemFlavor;
  title1: string;
  flavor2: StepperItemFlavor;
  title2: string;
  flavor3: StepperItemFlavor;
  title3: string;
  editing: boolean;
};
const meta: Meta<Args> = {
  component: "zeta-stepper",
  tags: ["autodocs"],
  title: "Components/Stepper",
  args: {
    editing: false,
    flavor1: "default",
    title1: "Label",
    flavor2: "default",
    title2: "Label",
    flavor3: "default",
    title3: "Label"
  },
  argTypes: {
    variant: {
      table: { disable: true }
    },
    flavor1: {
      options: ["completed", "partial", "success", "active", "default"],
      control: { type: "select" }
    },
    title1: {
      control: { type: "text" }
    },
    flavor2: {
      options: ["completed", "partial", "success", "active", "default"],
      control: { type: "select" }
    },
    title2: {
      control: { type: "text" }
    },
    flavor3: {
      options: ["completed", "partial", "success", "active", "default"],
      control: { type: "select" }
    },
    title3: {
      control: { type: "text" }
    },
    editing: {
      control: { type: "boolean" }
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
        <zeta-stepper-item flavor=${args.flavor1} ?editing=${args.editing}>${args.title1}</zeta-stepper-item>
        <zeta-stepper-item flavor=${args.flavor2} ?editing=${args.editing}>${args.title2}</zeta-stepper-item>
        <zeta-stepper-item flavor=${args.flavor3} ?editing=${args.editing}>${args.title3}</zeta-stepper-item>
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
        <zeta-stepper-item flavor=${args.flavor1} ?editing=${args.editing}>${args.title1}</zeta-stepper-item>
        <zeta-stepper-item flavor=${args.flavor2} ?editing=${args.editing}>${args.title2}</zeta-stepper-item>
        <zeta-stepper-item flavor=${args.flavor3} ?editing=${args.editing}>${args.title3}</zeta-stepper-item>
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
