import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaCheckbox } from "../components/checkbox/checkbox.js";
import { spreadGenerator } from "./utils.js";
import { html } from "lit";
const spread = spreadGenerator(ZetaCheckbox);

const meta: Meta<ZetaCheckbox> = {
  component: "zeta-checkbox",
  title: "Checkbox",
  tags: ["autodocs"],
  args: {
    rounded: true,
    disabled: false,
    checked: false,
    indeterminate: false,
    slot: undefined,
    name: "",
    id: ""
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21510-54003&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Checkbox: StoryObj<ZetaCheckbox> = {};
export const CheckboxWithLabel: StoryObj<ZetaCheckbox> = {
  args: { slot: "Checkbox Label" },
  render: ({ slot, ...args }) => {
    return html` <zeta-checkbox ${spread(args)}>${slot}</zeta-checkbox> `;
  }
};
