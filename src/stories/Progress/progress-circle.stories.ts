import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressCircle } from "../../index.js";

const meta: Meta<ZetaProgressCircle> = {
  component: "zeta-progress-circle",
  title: "Progress",
  args: {
    progress: 75,
    size: 64,
    rounded: false,
    loading: false,
    uploading: true
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

