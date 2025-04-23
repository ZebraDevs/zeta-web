import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaBreadcrumbItem } from "../../../components/breadcrumbs/breadcrumb-item/breadcrumb-item.js";
import { html } from "lit";
import "../../../components/breadcrumbs/breadcrumb-item/breadcrumb-item.js";

const meta: Meta<ZetaBreadcrumbItem> = {
  component: "zeta-breadcrumb-item",
  title: "Components/Breadcrumb",

  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-26581&mode=design&t=xLGLqCoG43B0vRUv-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const BreadcrumbItem: StoryObj<ZetaBreadcrumbItem> = {
  render: args => html`
    <zeta-breadcrumb-item .href=${args.href}>
      <zeta-icon slot="icon">star</zeta-icon>
      Icon before with separator
    </zeta-breadcrumb-item>
  `
};
