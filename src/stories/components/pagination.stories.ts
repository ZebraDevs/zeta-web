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
    rounded: true,
    outline: false,
    showControls: true,
    showMore: true,
    totalPages: 10,
    currentPage: 1,
    siblingCount: 1,
    onpagechange: fn()
  },
  argTypes: {
    rounded: { control: "boolean", description: "Rounded corners (4px) on every button. Off gives sharp corners." },
    outline: { control: "boolean", description: "Gives every button a 1px border." },
    showControls: {
      control: "boolean",
      description: 'Shows the first, previous, next and last buttons. On by default; `showcontrols="false"` turns it off from markup.'
    },
    showMore: {
      control: "boolean",
      description: 'Shows the overflow marker and the page paired with it. On by default; `showmore="false"` turns it off from markup.'
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3853-1209&m=dev"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

// showControls and showMore are on by default, so they are bound as properties instead of attributes
export const Pagination: StoryObj<PaginationStory> = {
  render: ({ onpagechange, showControls, showMore, ...args }) =>
    html`<zeta-pagination @pageChange=${onpagechange} .showControls=${showControls ?? true} .showMore=${showMore ?? true} ${spread(args)}></zeta-pagination>`
};

export const Outline: StoryObj<PaginationStory> = {
  args: { outline: true },
  render: ({ onpagechange, showControls, showMore, ...args }) =>
    html`<zeta-pagination @pageChange=${onpagechange} .showControls=${showControls ?? true} .showMore=${showMore ?? true} ${spread(args)}></zeta-pagination>`
};
