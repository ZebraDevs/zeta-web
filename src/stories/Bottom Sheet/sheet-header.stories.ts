import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSheetHeader } from "../../index.js";

const meta: Meta<ZetaSheetHeader> = {
  component: "zeta-sheet-header",
  title: "Bottom Sheet",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21541-2225&mode=design&t=xLGLqCoG43B0vRUv-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  args: {
    text: "Title"
  },
  argTypes: {
    alignment: { options: ["left", "center"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const SheetHeader: StoryObj<ZetaSheetHeader> = {};

