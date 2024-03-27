import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSliderInputField } from "../../index.js";
import { spread } from "@open-wc/lit-helpers";
import { html } from "lit";

const meta: Meta<ZetaSliderInputField | { "step-increment": number }> = {
  component: "zeta-slider-input-field",
  title: "Slider",
  args: { rounded: true, disabled: false, error: false, label: "Label", value: 50, min: 0, max: 100, name: "" },
  argTypes: {
    value: { table: { disable: true } },
    "step-increment": { control: { type: "number", min: 0, max: 50 } },
    min: { control: { type: "number", min: 0, max: 100 } },
    max: { control: { type: "number", min: 0, max: 100 } }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=875-14677&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const SliderInputField: StoryObj = {
  argTypes: {
    "step-increment": { table: { disable: true } }
  },
  render: args => html` <zeta-slider-input-field ${spread(args)} .disabled=${args.disabled} .rounded=${args.rounded}> </zeta-slider-input-field>`
};

export const SteppedSliderInputField: StoryObj = {
  args: { "step-increment": 10 },
  render: args => html` <zeta-slider-input-field ${spread(args)} .disabled=${args.disabled} .rounded=${args.rounded}> </zeta-slider-input-field>`
};
