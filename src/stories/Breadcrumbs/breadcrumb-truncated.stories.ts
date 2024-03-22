import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaBreadcrumbTruncated } from "../../index.js";

const meta: Meta<ZetaBreadcrumbTruncated> = {
  component: "zeta-breadcrumb-truncated",
  title: "Breadcrumb",

  args: {
    rounded: true
  }
};

export default meta;

export const BreadcrumbTruncated: StoryObj<ZetaBreadcrumbTruncated> = {};

