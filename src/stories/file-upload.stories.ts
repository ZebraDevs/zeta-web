import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaFileUpload } from "../index.js";

const meta: Meta<ZetaFileUpload> = {
  component: "zeta-file-upload",
  tags: ["autodocs"],
  title: "File Upload",
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

