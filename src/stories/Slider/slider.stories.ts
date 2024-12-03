import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSlider } from "../../components/slider/slider.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import type { ZetaRangeSliderEvent, ZetaRangeSliderEventDetail, ZetaSliderEvent, ZetaSliderEventDetail } from "../../events.js";
const spread = spreadGenerator(ZetaSlider);

const meta: Meta<ZetaSlider> = {
  component: "zeta-slider",
  title: "Slider",
  args: { rounded: true, disabled: false, value: 50, lowerValue: 10, upperValue: 90, min: 0, max: 100, stepIncrement: 0, type: "default" },
  argTypes: {
    type: { control: { type: "inline-radio" }, options: ["range", "default"] },
    value: { table: { disable: true } },
    stepIncrement: { control: { type: "range", min: 0, max: 50 } },
    lowerValue: { table: { disable: true } },
    upperValue: { table: { disable: true } },
    min: { control: { type: "number", min: 0, max: 100 } },
    max: { control: { type: "number", min: 0, max: 100 } }
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
  render: args =>
    html`<zeta-slider
      @zeta-slider-change=${(e: ZetaSliderEvent<ZetaSliderEventDetail>) => {
        console.log(e.detail.value);
      }}
      @zeta-range-slider-change=${(e: ZetaRangeSliderEvent<ZetaRangeSliderEventDetail>) => {
        console.log(e.detail.min, e.detail.max);
      }}
      ${spread(args)}
    >
    </zeta-slider>`
};
