import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../../index.js";
import { html } from "lit";
import { spread } from "@open-wc/lit-helpers";

// TODO: Although this component is the same code, the design is on a different page. Should this be moved?
const meta: Meta<
  | ZetaSlider
  | {
      "lower-value": number;
      "upper-value": number;
      "step-increment": number;
    }
> = {
  component: "zeta-slider",
  title: "Slider",
  args: {
    rounded: true,
    disabled: false,
    "lower-value": 10,
    "upper-value": 90,
    min: 0,
    max: 100,
    type: "range"
  },
  argTypes: {
    type: { table: { disable: true } },
    value: { table: { disable: true } },
    "lower-value": { control: { type: "number", min: 0, max: 100 } },
    "upper-value": { control: { type: "number", min: 0, max: 100 } },
    "step-increment": { control: { type: "number", min: 0, max: 50 } },
    min: { control: { type: "number", min: 0, max: 100 } },
    max: { control: { type: "number", min: 0, max: 100 } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1186-28564&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const RangeSlider: StoryObj = {
  argTypes: {
    "step-increment": { table: { disable: true } }
  },
  render: args => html`<zeta-slider ${spread(args)} .disabled=${args.disabled} .rounded=${args.rounded}> </zeta-slider>`
};

export const SteppedRangeSlider: StoryObj = {
  args: { "step-increment": 10 },
  render: args => html`<zeta-slider ${spread(args)} .disabled=${args.disabled} .rounded=${args.rounded}> </zeta-slider>`
};
