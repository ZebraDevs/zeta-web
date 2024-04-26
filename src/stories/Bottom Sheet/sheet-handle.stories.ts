import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSheetHandle } from "../../index.js";

const meta: Meta<ZetaSheetHandle> = {
  component: "zeta-sheet-handle",
  args: {},
  title: "Bottom Sheet",
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21541-2258&mode=design&t=xLGLqCoG43B0vRUv-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const SheetHandle: StoryObj<ZetaSheetHandle> = {};
