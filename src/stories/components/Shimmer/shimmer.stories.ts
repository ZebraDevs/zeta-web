import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaShimmer } from "../../../components/shimmer/shimmer.js";
import "../../../components/shimmer/shimmer.js";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaShimmer);

type ShimmerArgs = ZetaShimmer & {
  "--shimmer-height": string;
  "--shimmer-width": string;
  "--shimmer-animation-duration": string;
  "--shimmer-border-radius": string;
};

const meta: Meta<ShimmerArgs> = {
  component: "zeta-shimmer",
  title: "Components/Shimmer",
  args: {
    "--shimmer-height": "20px",
    "--shimmer-width": "100%",
    "--shimmer-animation-duration": "1.5s",
    "--shimmer-border-radius": "0px"
  },
  argTypes: {
    "--shimmer-height": {
      control: { type: "text" },
      description: "The height of the shimmer element"
    },
    "--shimmer-width": {
      control: { type: "text" },
      description: "The width of the shimmer element"
    },
    "--shimmer-animation-duration": {
      control: { type: "text" },
      description: "The duration of the shimmer animation (e.g., '1s', '2s', '0.5s')"
    },
    "--shimmer-border-radius": {
      control: { type: "text" },
      description: "The border radius of the shimmer element (e.g., '4px', '8px', '50%')"
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Shimmer: StoryObj<ShimmerArgs> = {
  render: ({
    "--shimmer-height": height,
    "--shimmer-width": width,
    "--shimmer-animation-duration": duration,
    "--shimmer-border-radius": borderRadius,
    ...args
  }) => {
    return html`
      ${(height || width || duration || borderRadius) &&
      html`<style>
        zeta-shimmer {
          ${height ? `--shimmer-height: ${height};` : ""}
          ${width ? `--shimmer-width: ${width};` : ""}
          ${duration ? `--shimmer-animation-duration: ${duration};` : ""}
          ${borderRadius ? `--shimmer-border-radius: ${borderRadius};` : ""}
        }
      </style>`}
      <div style="display: flex; flex-direction: column; gap: 20px; padding: 30px; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 10px;">Interactive Shimmer (Use Controls)</h4>
          <zeta-shimmer ${spread(args)}></zeta-shimmer>
        </div>
        <div>
          <h4 style="margin-bottom: 10px;">Custom Height (30px)</h4>
          <zeta-shimmer ${spread(args)} style="--shimmer-height: 30px;"></zeta-shimmer>
        </div>
        <div>
          <h4 style="margin-bottom: 10px;">Custom Height (40px)</h4>
          <zeta-shimmer ${spread(args)} style="--shimmer-height: 40px;"></zeta-shimmer>
        </div>
        <div>
          <h4 style="margin-bottom: 10px;">Custom Width (200px)</h4>
          <zeta-shimmer ${spread(args)} style="--shimmer-width: 200px;"></zeta-shimmer>
        </div>
        <div>
          <h4 style="margin-bottom: 10px;">Multiple Shimmers (Table Row Example)</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <zeta-shimmer ${spread(args)}></zeta-shimmer>
            <zeta-shimmer ${spread(args)}></zeta-shimmer>
            <zeta-shimmer ${spread(args)}></zeta-shimmer>
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 10px;">Flex Layout Example</h4>
          <div style="display: flex; gap: 10px;">
            <zeta-shimmer ${spread(args)} style="flex: 1;"></zeta-shimmer>
            <zeta-shimmer ${spread(args)} style="flex: 2;"></zeta-shimmer>
            <zeta-shimmer ${spread(args)} style="flex: 1;"></zeta-shimmer>
          </div>
        </div>
      </div>
    `;
  }
};

