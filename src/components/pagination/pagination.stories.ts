import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPagination } from "./pagination.js";

const meta: Meta<ZetaPagination> = {
  component: "zeta-pagination",
  args: {
    condensed: false,
    rounded: false,
    totalPages: 10,
    currentPage: 1,
    siblingCount: 1
  }
};

export default meta;

export const Pagination: StoryObj<ZetaPagination> = {};

