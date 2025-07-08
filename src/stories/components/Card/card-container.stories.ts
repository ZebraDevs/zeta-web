import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaCardContainer } from "../../../components/card/card-container/card-container.js";
import "../../../components/card/card-container/card-container";
import { placeholder, spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaCardContainer);

const meta: Meta<ZetaCardContainer> = {
  title: "Components/Cards",
  component: "zeta-card-container",
  args: {
    title: "Title",
    description: "Description",
    collapsible: false,
    expanded: true,
    required: false,
    ai: false
  },
  argTypes: {
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=37677-16210"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Container: StoryObj = {
  args: {
    content: false
  },
  argTypes: {
    collapsible: { table: { disable: true } },
    expanded: { table: { disable: true } }
  },
  render: args => html` <zeta-card-container ${spread(args)}> ${args.content ? placeholder(4000, 240) : nothing} </zeta-card-container>`
};
export const ContainerCollapsible: StoryObj = {
  args: {
    collapsible: true,
    expanded: false,
    ai: true,
    required: true
  },
  argTypes: {
    collapsible: { table: { disable: true } },
    content: { table: { disable: true } }
  },
  render: args => html`<zeta-card-container ${spread(args)}> ${placeholder(4000, 240)}</zeta-card-container>`
};
