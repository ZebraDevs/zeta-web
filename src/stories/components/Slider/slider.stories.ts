import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../../../components/slider/slider.js";
import { html } from "lit";
import { spreadGenerator } from "../../utils.js";
import { fn } from "@storybook/test";
const spread = spreadGenerator(ZetaSlider);

const meta: Meta<ZetaSlider> = {
  component: "zeta-slider",
  title: "Components/Slider",
  args: { rounded: true, disabled: false, value: 50, lowerValue: 10, upperValue: 90, min: 0, max: 100, stepIncrement: 0, type: "default" },
  argTypes: {
    type: { control: { type: "inline-radio" }, options: ["range", "default"] },
    value: { table: { disable: true } },
    stepIncrement: { control: { type: "range", min: 0, max: 50 } },
    lowerValue: { table: { disable: true } },
    upperValue: { table: { disable: true } },
    min: { control: { type: "number", min: 0, max: 100 } },
    max: { control: { type: "number", min: 0, max: 100 } },
    onchange: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=875-11860&m=dev"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Slider: StoryObj = {
  argTypes: {
    stepIncrement: { table: { disable: true } }
  },
  render: ({ onchange, ...args }) => html`<zeta-slider @change=${onchange} ${spread(args)}> </zeta-slider>`
};

export const SteppedSlider: StoryObj = {
  argTypes: {
    stepIncrement: { control: { type: "number", min: 0, max: 50 } }
  },
  args: { stepIncrement: 10 },
  render: Slider.render
};
