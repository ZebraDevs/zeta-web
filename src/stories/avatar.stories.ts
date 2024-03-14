import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAvatar } from "../index.js";

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
  }
};

export default meta;

export const Avatar: StoryObj<ZetaAvatar> = {};

