import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { fn } from "@storybook/test";
import { spreadGenerator } from "../utils";
import { ZetaCheckbox } from "../../components/checkbox/checkbox";

const spread = spreadGenerator(ZetaCheckbox);

const meta: Meta<ZetaCheckbox> = {
  component: "zeta-checkbox",
  title: "Components/Checkbox",
  tags: ["autodocs"],
  args: {
    rounded: true,
    disabled: false,
    checked: false,
    indeterminate: false,
    slot: undefined,
    name: "",
    id: "",
    onchange: fn(),
    oninput: fn()
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"]
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21510-54003&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Checkbox: StoryObj<ZetaCheckbox> = {
  render: ({ slot, ...args }) => {
    return html` <zeta-checkbox ${spread(args)}>${slot}</zeta-checkbox> `;
  }
};
export const CheckboxWithLabel: StoryObj<ZetaCheckbox> = {
  args: { slot: "Checkbox Label" },
  render: Checkbox.render
};
