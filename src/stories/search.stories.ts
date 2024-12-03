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
    round: "false",
    // formAction: "https://google.com/search", // BK to @mikecoomber, I removed this to get the story working after search was changed to a FormField.
    hasIcon: true
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "inline-radio"
      }
    },
    round: {
      options: ["false", "true", "full"],
      control: {
        type: "inline-radio"
      }
    }
    // onSubmit: { table: { disable: true } } // BK to @mikecoomber, I removed this to get the story working after search was changed to a FormField.
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21286-35997&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export const Search: StoryObj = {};

export default meta;
