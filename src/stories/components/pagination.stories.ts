import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPagination } from "../../components/pagination/pagination.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import { fn } from "@storybook/test";
const spread = spreadGenerator(ZetaPagination);

type PaginationStory = ZetaPagination & { onpagechange: () => void };
const meta: Meta<PaginationStory> = {
  component: "zeta-pagination",
  tags: ["autodocs"],
  title: "Components/Pagination",
  args: {
    rounded: false,
    totalPages: 10,
    currentPage: 1,
    siblingCount: 1,
    onpagechange: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1348-33899&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Pagination: StoryObj<PaginationStory> = {
  render: ({ onpagechange, ...args }) => html`<zeta-pagination @page-change=${onpagechange} ${spread(args)}></zeta-pagination>`
};
