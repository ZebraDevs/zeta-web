import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaMoreMenu } from "./more-menu.js";
import "./more-menu.js";

const meta: Meta<ZetaMoreMenu> = {
  component: "zeta-more-menu",
  args: {
    condensed: false,
    disabled: false,
    rounded: false
  }
};

export default meta;

export const MoreMenu: StoryObj<ZetaMoreMenu> = {};
