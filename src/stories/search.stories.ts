import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSearch } from "../index.js";
import { html } from "lit";

const meta: Meta<
  | ZetaSearch
  | {
      "form-action": String;
      "has-icon": boolean;
      "on-submit": never;
    }
> = {
  tags: ["autodocs"],
  title: "Search",
  component: "zeta-search",
  args: {
    value: "Predefined search value",
    disabled: false,
    size: "medium",
    rounded: false,
    "form-action": "https://google.com/search",
    "has-icon": true
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "inline-radio"
      }
    },
    "on-submit": { table: { disable: true } }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21286-35997&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export const Search: StoryObj = {
  render: args =>
    html` <zeta-search .rounded=${args.rounded} .disabled=${args.disabled} ?has-icon=${args["has-icon"]} value=${args.value} size=${args.size}> </zeta-search>`
};

export default meta;
