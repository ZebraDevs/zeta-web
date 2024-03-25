import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPagination } from "../index.js";

const meta: Meta<ZetaPagination> = {
  component: "zeta-pagination",
  tags: ["autodocs"],
  title: "Pagination",
  args: {
    rounded: false,
    totalPages: 10,
    currentPage: 1,
    siblingCount: 1
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1348-33899&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Pagination: StoryObj<ZetaPagination> = {};

