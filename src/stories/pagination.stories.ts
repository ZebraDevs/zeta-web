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
  }
};

export default meta;

export const Pagination: StoryObj<ZetaPagination> = {};

