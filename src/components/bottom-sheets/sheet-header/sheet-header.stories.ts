// indicators.stories.ts

import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSheetHeader } from "./sheet-header.js";

const meta: Meta<ZetaSheetHeader> = {
  component: "zeta-sheet-header",
  args: {
    text: "Title",
    condensed: false
  },
  argTypes: {
    alignment: { options: ["left", "center", "end"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const NotificationIndicator: StoryObj<ZetaSheetHeader> = {};

