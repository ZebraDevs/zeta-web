import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPagination } from "../index.js";
import { html } from "lit";
import { spread } from "@open-wc/lit-helpers";

const meta: Meta<
  | ZetaPagination
  | {
      "total-pages": number;
      "current-page": number;
      "sibling-count": number;
    }
> = {
  component: "zeta-pagination",
  tags: ["autodocs"],
  title: "Pagination",
  args: {
    rounded: false,
    "total-pages": 10,
    "current-page": 1,
    "sibling-count": 1
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

export const Pagination: StoryObj = {
  render: args => html`<zeta-pagination ${spread(args)} .rounded=${args.rounded}></zeta-pagination>`
};
