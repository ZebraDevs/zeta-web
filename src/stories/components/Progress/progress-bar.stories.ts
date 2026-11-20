import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressBar } from "../../../components/progress-indicators/progress-bar/progress-bar.js";
import { html, nothing } from "lit";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaProgressBar);

type ProgressBarStory = ZetaProgressBar & { details?: string; "--progress-bar-color"?: string };

const meta: Meta<ProgressBarStory> = {
  component: "zeta-progress-bar",
  title: "Components/Progress",
  args: {
    rounded: true,
    size: "large",
    value: 0.5,
    label: "Loading...",
    indeterminate: false,
    buffering: false,
    hideTrack: false,
    maxValue: undefined,
    details: ""
  },
  argTypes: {
    size: {
      options: ["small", "large"],
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
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4275-1997&m=dev"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const ProgressBar: StoryObj<ProgressBarStory> = {
  render: ({ details, ...args }) => {
    return html`
      ${
        args["--progress-bar-color"] &&
        html`<style>
          zeta-progress-bar {
            --progress-bar-color: ${args["--progress-bar-color"]};
          }
        </style>`
      }
      <zeta-progress-bar ${spread(args)}>${details ? html`<span slot="details">${details}</span>` : nothing}</zeta-progress-bar>
    `;
  }
};
