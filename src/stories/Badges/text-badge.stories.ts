import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaLabel } from "../../index.js";

const meta: Meta<ZetaLabel> = {
  title: "Badges",
  component: "zeta-label",
  args: {
    text: "label",
    rounded: true
  },
  argTypes: {
    status: {
      options: ["neutral", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const TextBadge: StoryObj<ZetaLabel> = {};

