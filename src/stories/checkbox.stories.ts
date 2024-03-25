import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaCheckbox } from "../index.js";

const meta: Meta<ZetaCheckbox> = {
  component: "zeta-checkbox",
  title: "Checkbox",
  tags: ["autodocs"],
  args: {
    rounded: true,
    disabled: false,
    checked: false,
    label: ""
  },
  argTypes: {
    checked: {
      options: [true, false, "intermediate"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21510-54003&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Checkbox: StoryObj<ZetaCheckbox> = {};

