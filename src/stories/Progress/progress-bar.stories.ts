import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressBar } from "../../components/progress-indicators/progress-bar/progress-bar.js";

const meta: Meta<ZetaProgressBar> = {
  component: "zeta-progress-bar",
  title: "Progress",
  args: {
    rounded: true,
    size: "medium",
    value: 50,
    label: "Loading...",
    indeterminate: false,
    buffering: false
  },
  argTypes: {
    size: {
      options: ["thin", "medium"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1358-31337&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const ProgressBar: StoryObj<ZetaProgressBar> = {};
