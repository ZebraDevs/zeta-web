// indicators.stories.ts

import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconIndicator } from "./icon-indicator.js";

const meta: Meta<ZetaIconIndicator> = {
  component: "zeta-icon-indicator",
  args: {
    size: "medium",
    inverse: false,
    rounded: true,
    icon: "star"
  },
  argTypes: {
    size: { options: ["small", "medium", "large"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const IconIndicator: StoryObj<ZetaIconIndicator> = {};

