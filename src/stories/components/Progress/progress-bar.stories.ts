import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressBar } from "../../../components/progress-indicators/progress-bar/progress-bar.js";
import { html } from "lit";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaProgressBar);

const meta: Meta<ZetaProgressBar> = {
  component: "zeta-progress-bar",
  title: "Components/Progress",
  args: {
    rounded: true,
    size: "medium",
    value: 50,
    label: "Loading...",
    indeterminate: false,
    buffering: false,
    maxValue: undefined
  },
  argTypes: {
    size: {
      options: ["thin", "medium"],
      control: {
        type: "select"
      }
    },
    maxValue: {
      control: {
        type: "number"
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

export const ProgressBar: StoryObj = {
  render: ({ ...args }) => {
    return html`
      ${args["--progress-bar-color"] &&
      html`<style>
        zeta-progress-bar {
          --progress-bar-color: ${args["--progress-bar-color"]};
        }
      </style>`}
      <zeta-progress-bar ${spread(args)}></zeta-progress-bar>
    `;
  }
};
