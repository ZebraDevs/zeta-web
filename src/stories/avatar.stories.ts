import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAvatar } from "../components/avatar.js";

const meta: Meta<ZetaAvatar> = {
  title: "Avatar",
  tags: ["autodocs"],
  component: "zeta-avatar",
  args: {
    imageUrl: "",
    initials: "",
    showStatus: false,
    size: "md",
    notificationText: "",
    statusIcon: ""
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=229-2"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Avatar: StoryObj<ZetaAvatar> = {};
