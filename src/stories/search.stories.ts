import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSearch } from "../components/search/search.js";
import "../components/search/search.js";

const meta: Meta<ZetaSearch> = {
  tags: ["autodocs"],
  title: "Search",
  component: "zeta-search",
  args: {
    value: "Predefined search value",
    disabled: false,
    size: "medium",
    rounded: false,
    formAction: "https://google.com/search",
    hasIcon: true
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "inline-radio"
      }
    },
    onSubmit: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21286-35997&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export const Search: StoryObj = {};

export default meta;
