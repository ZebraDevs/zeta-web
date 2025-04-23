import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSliderInputField } from "../../../components/slider/slider-input-field/slider-input-field.js";
import { spreadGenerator } from "../../utils.js";
const spread = spreadGenerator(ZetaSliderInputField);
import { html } from "lit";

const meta: Meta<ZetaSliderInputField> = {
  component: "zeta-slider-input-field",
  title: "Components/Slider",
  args: {
    rounded: true,
    disabled: false,
    error: false,
    label: "Label",
    value: "50",
    min: 0,
    max: 100,
    stepIncrement: 0
  },
  argTypes: {
    name: { table: { disable: true } },
    stepIncrement: { control: { type: "range", min: 0, max: 50 } },
    min: { control: { type: "number", min: 0, max: 100 } },
    max: { control: { type: "number", min: 0, max: 100 } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=875-11860&m=dev"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const SliderInputField: StoryObj = {
  render: args => html` <zeta-slider-input-field ${spread(args)}> </zeta-slider-input-field> `
};
