import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSearch } from "../../components/search/search.js";
import "../../components/search/search.js";
import { fn } from "@storybook/test";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import { ShapeList } from "../../mixins/contourable-three.js";
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
    // formAction: "https://google.com/search", // BK to @mikecoomber, I removed this to get the story working after search was changed to a FormField.
    hasIcon: true,
    flavor: "default",
    hideFocusOutline: false,
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
    flavor: {
      options: ["default", "gradient", "ghost"],
      control: {
        type: "inline-radio"
      }
    },
    hideFocusOutline: {
      if: { arg: "flavor", eq: "ghost" }
    },
    shape: {
      options: ShapeList,
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
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2152-8811&m=dev"
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
