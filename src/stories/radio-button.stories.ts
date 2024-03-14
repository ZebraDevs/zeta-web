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
  }
};

export default meta;

export const RadioButton: StoryObj<ZetaRadioButton> = {};

