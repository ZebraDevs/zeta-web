import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaStatusLabel } from "../../../components/badges/status-label/status-label.js";

const meta: Meta<ZetaStatusLabel> = {
  title: "Components/Badges",
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
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21836-34789&mode=design&t=j9Cv98TDx5BKLbgS-4"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const StatusLabel: StoryObj<ZetaStatusLabel> = {};
