import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaStatusLabel } from "../index.js";

const meta: Meta<ZetaStatusLabel> = {
  component: "zeta-status-label",
  args: {
    rounded: true,

    status: "neutral",
    icon: undefined,
    text: "Label"
  },
  argTypes: {
    status: {
      options: ["neutral", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    },
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  }
};
export default meta;

export const StatusLabel: StoryObj<ZetaStatusLabel> = {};

