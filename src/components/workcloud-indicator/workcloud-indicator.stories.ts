import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaWorkcloudIndicator } from "./workcloud-indicator.js";
import { html } from "lit";

const meta: Meta<ZetaWorkcloudIndicator> = {
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

