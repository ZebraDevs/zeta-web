import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressBar } from "./progress-bar.js";
import "./progress-bar.js";

const meta: Meta<ZetaProgressBar> = {
  component: "zeta-progress-bar",
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
  }
};

export default meta;

export const ProgressBar: StoryObj<ZetaProgressBar> = {};
