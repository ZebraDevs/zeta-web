import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaRangeSelector } from "../../components/slider/range-selector/range-selector.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
const spread = spreadGenerator(ZetaRangeSelector);

const meta: Meta<ZetaRangeSelector> = {
  component: "zeta-range-selector",
  title: "Components/Range Selector",
  args: {
    rounded: true,
    disabled: false,
    label: "Label",
    min: 0,
    max: 100,
    stepIncrement: 0
  },
  argTypes: {
    stepIncrement: { control: { type: "range", min: 0, max: 50 } },
    min: { control: { type: "number", min: 0, max: 100 } },
    max: { control: { type: "number", min: 0, max: 100 } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=980-16448&m=dev"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const RangeSlider: StoryObj = {
  render: args => html`<zeta-range-selector ${spread(args)} .initialValues=${{ min: 10, max: 90 }}> </zeta-range-selector>`
};
