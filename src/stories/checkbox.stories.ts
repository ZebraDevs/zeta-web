import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaCheckbox } from "../index.js";

const meta: Meta<ZetaCheckbox> = {
  component: "zeta-checkbox",
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
  }
};

export default meta;

export const Checkbox: StoryObj<ZetaCheckbox> = {};

