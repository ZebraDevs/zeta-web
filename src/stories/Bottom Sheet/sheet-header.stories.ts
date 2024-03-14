import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSheetHeader } from "../../index.js";

const meta: Meta<ZetaSheetHeader> = {
  component: "zeta-sheet-header",
  title: "Bottom Sheet",
  args: {
    text: "Title"
  },
  argTypes: {
    alignment: { options: ["left", "center", "end"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const SheetHeader: StoryObj<ZetaSheetHeader> = {};

