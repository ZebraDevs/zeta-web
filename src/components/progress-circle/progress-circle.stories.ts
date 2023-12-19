import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressCircle } from "./progress-circle.js";

const meta: Meta<ZetaProgressCircle> = {
  component: "zeta-progress-circle",
  args: {
    progress: 75,
    size: 64,
    rounded: false,
    loading: false
  },
  argTypes: {
    size: {
      options: [24, 36, 40, 48, 64],
      control: {
        type: "inline-radio"
      }
    }
  }
};

export const ProgressCircle: StoryObj<ZetaProgressCircle> = {};

export default meta;

