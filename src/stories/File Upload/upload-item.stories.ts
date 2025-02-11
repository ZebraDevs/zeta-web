import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaUploadItem } from "../../components/upload-item/upload-item";
import { fn } from '@storybook/test';
import "../../components/upload-item/upload-item.js";
import { html } from "lit";
import { spreadGenerator } from "../utils";
const spread = spreadGenerator(ZetaUploadItem);

type UploadItemStory = ZetaUploadItem & { slot: string; subtitle: string; leading: string; oncancelupload: () => void };

const meta: Meta<UploadItemStory> = {
  component: "zeta-upload-item",
  title: "File Upload",
  args: {
    flavor: "default",
    rounded: true,
    slot: "filename.jpg",
    subtitle: "4.6MB of 5.7MB",
    leading: "<zeta-icon>image</zeta-icon>",
    progress: 75,
    oncancelupload: fn()
  },
  argTypes: {
    flavor: {
      options: ["default", "completed", "error"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23753-10089&t=8Ym0ztJUuB4iD83l-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const UploadItem: StoryObj<UploadItemStory> = {
  render: ({ oncancelupload, ...args }) => html`<zeta-upload-item ${spread(args)} @cancel-upload=${oncancelupload}></zeta-upload-item>`
};

export const Completed: StoryObj<UploadItemStory> = {
  args: {
    flavor: "completed",
    slot: "filename.jpg",
    subtitle: "Upload complete - 5.7MB"
  },
  argTypes: {
    progress: { table: { disable: true } },
    flavor: { table: { disable: true } },
    leading: { table: { disable: true } }
  },
  render: UploadItem.render
};

export const Error: StoryObj<UploadItemStory> = {
  args: {
    flavor: "error",
    slot: "filename.jpg",
    subtitle: "File exceeds limit."
  },
  argTypes: {
    progress: { table: { disable: true } },
    flavor: { table: { disable: true } },
    leading: { table: { disable: true } }
  },
  render: UploadItem.render
};
