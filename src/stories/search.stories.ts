import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSearch } from "../index.js";

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
    }
  }
};

export const Search: StoryObj<ZetaSearch> = {};

export default meta;

