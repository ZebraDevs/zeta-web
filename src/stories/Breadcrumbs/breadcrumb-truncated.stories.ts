import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaBreadcrumbTruncated } from "../../index.js";

const meta: Meta<ZetaBreadcrumbTruncated> = {
  component: "zeta-breadcrumb-truncated",
  title: "Breadcrumb",
  args: {
    rounded: true
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-26581&mode=design&t=xLGLqCoG43B0vRUv-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const BreadcrumbTruncated: StoryObj<ZetaBreadcrumbTruncated> = {};
