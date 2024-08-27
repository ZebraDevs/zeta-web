import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAvatarRail } from "../components/avatar-rail/avatar-rail.js";

const meta: Meta<ZetaAvatarRail & { "show-close": boolean }> = {
  component: "zeta-avatar-rail",
  title: "Avatar Rail",
  tags: ["autodocs"],
  args: {
    "show-close": false,
    size: "m"
  },
  argTypes: {
    size: {
      options: ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const AvatarRail: StoryObj<ZetaAvatarRail> = {
  args: {
    slot: "<zeta-avatar>AD</zeta-avatar><zeta-avatar>AB</zeta-avatar><zeta-avatar>AC</zeta-avatar>"
  },
  argTypes: {
    slot: { table: { disable: true } }
  }
};
