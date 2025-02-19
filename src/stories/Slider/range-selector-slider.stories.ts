import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../../components/slider/slider.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import { fn } from "@storybook/test";
const spread = spreadGenerator(ZetaSlider);

// TODO: Although this component is the same code, the design is on a different page. Should this be moved?
const meta: Meta<ZetaSlider> = {
  component: "zeta-slider",
  title: "Slider",
  args: {
    rounded: true,
    disabled: false,
    lowerValue: 10,
    upperValue: 90,
    min: 0,
    max: 100,
    type: "range",
    onchange: fn()
  },
  argTypes: {
    type: { table: { disable: true } },
    value: { table: { disable: true } },
    lowerValue: { control: { type: "number", min: 0, max: 100 } },
    upperValue: { control: { type: "number", min: 0, max: 100 } },
    stepIncrement: { control: { type: "number", min: 0, max: 50 } },
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
    stepIncrement: { table: { disable: true } }
  },
  render: ({ onchange, ...args }) => html`<zeta-slider @change=${onchange} ${spread(args)}> </zeta-slider>`
};

export const SteppedRangeSlider: StoryObj = {
  args: { stepIncrement: 10 },
  render: RangeSlider.render
};
