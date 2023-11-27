import type { Meta, StoryObj } from "@storybook/web-components";
import "../../index.js";
import { ZetaStatusLabel } from "./status-label.js";
import { IconNameList } from "../icon/icon-types.js";
const meta: Meta<ZetaStatusLabel> = {
  component: "zeta-status-label",
  args: {
    rounded: true,
    condensed: false,
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
      options: IconNameList,
      control: {
        type: "select"
      }
    }
  }
};
export default meta;

export const StatusLabel: StoryObj<ZetaStatusLabel> = {};

