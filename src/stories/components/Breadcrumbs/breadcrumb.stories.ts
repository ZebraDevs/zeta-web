import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaBreadcrumb } from "../../../components/breadcrumbs/breadcrumb.js";

import { html } from "lit";

const meta: Meta<ZetaBreadcrumb> = {
  component: "zeta-breadcrumb",
  title: "Components/Breadcrumb",
  args: {
    rounded: true
  },
  argTypes: {
    disabled: { table: { disable: true } },
    tabIndex: { table: { disable: true } }
  },
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

export const Breadcrumb2Items: StoryObj<ZetaBreadcrumb> = {
  render: args => html`
    <zeta-breadcrumb .rounded=${args.rounded}>
      <zeta-breadcrumb-item>Standard breadcrumb</zeta-breadcrumb-item>
      <zeta-breadcrumb-item>
        <zeta-icon slot="icon">star</zeta-icon>
        Icon before with separator
      </zeta-breadcrumb-item>
    </zeta-breadcrumb>
  `
};

export const Breadcrumb3Items: StoryObj<ZetaBreadcrumb> = {
  render: args => html`
    <zeta-breadcrumb .rounded=${args.rounded}>
      <zeta-breadcrumb-item> Standard breadcrumb </zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator </zeta-breadcrumb-item>
      <zeta-breadcrumb-item>
        <zeta-icon slot="icon">star</zeta-icon>
        Icon before with separator
      </zeta-breadcrumb-item>
    </zeta-breadcrumb>
  `
};

export const Breadcrumb4Items: StoryObj<ZetaBreadcrumb> = {
  render: args => html`
    <zeta-breadcrumb .rounded=${args.rounded}>
      <zeta-breadcrumb-item> Standard breadcrumb </zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator </zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator </zeta-breadcrumb-item>
      <zeta-breadcrumb-item>
        <zeta-icon .rounded=${args.rounded} slot="icon">star</zeta-icon>
        Icon before with separator
      </zeta-breadcrumb-item>
    </zeta-breadcrumb>
  `
};

export const BreadcrumbTruncated: StoryObj<ZetaBreadcrumb> = {
  render: args => html`
    <zeta-breadcrumb maxItems=${4} .rounded=${args.rounded}>
      <zeta-breadcrumb-item> Standard breadcrumb </zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 1</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 2</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 3</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 4</zeta-breadcrumb-item>
      <zeta-breadcrumb-item>
        <zeta-icon slot="icon">star</zeta-icon>
        Icon before with separator
      </zeta-breadcrumb-item>
    </zeta-breadcrumb>
  `
};
