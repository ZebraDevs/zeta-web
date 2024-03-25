import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaWorkcloudIndicator } from "../../index.js";

const meta: Meta<ZetaWorkcloudIndicator> = {
  title: "Badges",
  component: "zeta-workcloud-indicator",
  args: {
    priority: "urgent",
    number: 1,
    size: "medium"
  },
  argTypes: {
    number: {
      control: "number"
    },
    priority: {
      options: ["urgent", "low", "medium", "high"],
      control: { type: "inline-radio" }
    },
    size: {
      options: ["medium", "small", "xs"],
      control: { type: "inline-radio" }
    }
  },
  parameters: {
    design: {
      type: "figma",
      url: "www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-13781"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const WorkcloudIndicator: StoryObj<ZetaWorkcloudIndicator> = {};
export const WorkcloudIndicatorValueHigherThan99: StoryObj<ZetaWorkcloudIndicator> = {
  args: {
    priority: "low",
    size: "medium",
    number: 101
  },
  argTypes: {
    number: {
      control: false
    }
  },
  render: args => html` <zeta-workcloud-indicator priority=${args.priority} size=${args.size} number=${args.number}></zeta-workcloud-indicator> `
};

