import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaFileUpload } from "./file-upload.js";
import "./file-upload.js";

const meta: Meta<ZetaFileUpload> = {
  component: "zeta-file-upload",
  args: {
    rounded: true,
    headline: "Drop files here to upload",
    caption: "Supports: JPG, JPEG2000, PNG. Max file size 100mb",
    multiple: true,
    accept: ""
  },
  argTypes: {}
};
export default meta;

export const FileUpload: StoryObj<ZetaFileUpload> = {};
