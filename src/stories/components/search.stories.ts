import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSearch } from "../../components/search/search.js";
import "../../components/search/search.js";
import { fn } from "@storybook/test";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
const spread = spreadGenerator(ZetaSearch);

type SearchStory = ZetaSearch & { oninput: () => void; onchange: () => void; onfocus: () => void; onblur: () => void };

const meta: Meta<SearchStory> = {
  tags: ["autodocs"],
  title: "Components/Search",
  component: "zeta-search",
  args: {
    value: "Predefined search value",
    disabled: false,
    size: "medium",
    round: "false",
    // formAction: "https://google.com/search", // BK to @mikecoomber, I removed this to get the story working after search was changed to a FormField.
    hasIcon: true,
    oninput: fn(),
    onchange: fn(),
    onfocus: fn(),
    onblur: fn()
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
    },
    oninput: { table: { disable: true } },
    onchange: { table: { disable: true } },
    onfocus: { table: { disable: true } },
    onblur: { table: { disable: true } }
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

export const Search: StoryObj<SearchStory> = {
  render: ({ oninput, onchange, onfocus, onblur, ...args }) =>
    html`<zeta-search @input=${oninput} @change=${onchange} @focus=${onfocus} @blur=${onblur} ${spread(args)}></zeta-search>`
};

export default meta;
