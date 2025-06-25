import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaLabel } from "../../../components/badges/label/label.js";

const meta: Meta<ZetaLabel> = {
  title: "Components/Badges",
  component: "zeta-label",
  args: {
    label: "Label",
    rounded: true,
    status: "neutral"
  },
  argTypes: {
    status: {
      options: ["neutral", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21926-1007"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Label: StoryObj<ZetaLabel> = {};
