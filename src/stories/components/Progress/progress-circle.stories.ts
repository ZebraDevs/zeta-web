import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaProgressCircle } from "../../../components/progress-indicators/progress-circle/progress-circle.js";
import "../../../components/progress-indicators/progress-circle/progress-circle.js";
import { html } from "lit";
import { spreadGenerator } from "../../utils.js";
import { fn } from "@storybook/test";
const spread = spreadGenerator(ZetaProgressCircle);

type ProgressCircleStory = ZetaProgressCircle & {
  oncancelupload: () => void;
  "--progress-circle-color"?: string;
};
const meta: Meta<ProgressCircleStory> = {
  component: "zeta-progress-circle",
  title: "Components/Progress",
  args: {
    progress: 75,
    size: 64,
    rounded: false,
    type: "default",
    oncancelupload: fn(),
    indeterminate: false,
    hideTrack: false
  },
  argTypes: {
    size: {
      options: [20, 24, 36, 40, 48, 64],
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
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4416-77&m=dev"
    },
    status: {
      type: "ready"
    }
  }
};

export const ProgressCircle: StoryObj<ProgressCircleStory> = {
  render: ({ oncancelupload, ...args }) => {
    return html`
      ${
        args["--progress-circle-color"] &&
        html`<style>
          zeta-progress-circle {
            --progress-circle-color: ${args["--progress-circle-color"]};
          }
        </style>`
      }
      <zeta-progress-circle @cancelUpload=${oncancelupload} ${spread(args)}></zeta-progress-circle>
    `;
  }
};

export default meta;
