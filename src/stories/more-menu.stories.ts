import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaMoreMenu } from "../index.js";

const meta: Meta<ZetaMoreMenu> = {
  component: "zeta-more-menu",
  tags: ["autodocs"],
  title: "More Menu",
  args: {
    disabled: false,
    rounded: false
  }
};

export default meta;

export const MoreMenu: StoryObj<ZetaMoreMenu> = {};

