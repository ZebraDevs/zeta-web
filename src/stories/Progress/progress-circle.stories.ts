import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressCircle } from "../../components/progress-indicators/progress-circle/progress-circle.js";

const meta: Meta<ZetaProgressCircle> = {
  component: "zeta-progress-circle",
  title: "Progress",
  args: {
    progress: 75,
    size: 64,
    rounded: false,
    type: "default"
  },
  argTypes: {
    size: {
      options: [24, 36, 40, 48, 64],
      control: {
        type: "inline-radio"
      }
    },
    type: {
      options: ["default", "upload"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=900-10416&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export const ProgressCircle: StoryObj<ZetaProgressCircle> = {};

export default meta;
