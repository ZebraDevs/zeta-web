import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaRadioButton } from "../index.js";

const meta: Meta<ZetaRadioButton> = {
  component: "zeta-radio-button",
  tags: ["autodocs"],
  title: "Radio Button",
  args: {
    disabled: false,
    checked: false,
    label: ""
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21510-54345&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const RadioButton: StoryObj<ZetaRadioButton> = {};

