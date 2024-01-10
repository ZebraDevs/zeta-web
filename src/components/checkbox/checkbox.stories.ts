import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaCheckbox } from "./checkbox.js";
import "./checkbox.js";
import "../icon/icon.js";

const meta: Meta<ZetaCheckbox> = {
  component: "zeta-checkbox",
  args: {
    rounded: true,
    condensed: false,
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
