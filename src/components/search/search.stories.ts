import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSearch } from "./search.js";
import "./search.js";

const meta: Meta<ZetaSearch> = {
  component: "zeta-search",
  args: {
    value: "Predefined search value",
    disabled: false,
    size: "medium",
    condensed: false,
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

