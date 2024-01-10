import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaRadioButton } from "./radio-button.js";
import "./radio-button.js";

const meta: Meta<ZetaRadioButton> = {
  component: "zeta-radio-button",
  args: {
    disabled: false,
    checked: false,
    label: ""
  }
};

export default meta;

export const RadioButton: StoryObj<ZetaRadioButton> = {};
