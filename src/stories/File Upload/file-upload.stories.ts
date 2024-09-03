import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaFileUpload } from "../../components/file-upload/file-upload.js";

const meta: Meta<ZetaFileUpload> = {
  component: "zeta-file-upload",
  title: "File Upload",
  args: {
    rounded: true,
    headline: "Drop files here to upload",
    caption: "Supports: JPG, JPEG2000, PNG. Max file size 100mb",
    multiple: true,
    accept: "",
    name: "",
    active: false,
    error: false
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=898-10794&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const FileUpload: StoryObj<ZetaFileUpload> = {};
