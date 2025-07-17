import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaAccordionItem } from "../../../components/accordion/accordion-item/accordion-item";
import "../../../components/button/button";
import "../../../components/accordion/accordion-item/accordion-item";
import { spreadGenerator } from "../../utils";

const spread = spreadGenerator(ZetaAccordionItem);

type AccordionItemStoryArgs = ZetaAccordionItem & { header: boolean; "item-expanded": any; "item-selected": any };

const meta: Meta<AccordionItemStoryArgs> = {
  title: "Components/Accordion",
  component: "zeta-accordion-item",
  tags: ["autodocs"],
  args: {
    title: "Accordion Item",
    header: false
  },
  argTypes: {
    slot: { table: { disable: true } },
    "item-expanded": { table: { disable: true } },
    "item-selected": { table: { disable: true } },
    header: { type: "boolean", control: "boolean", description: "Show header with actions" }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=229-3"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const AccordionItem: StoryObj = {
  render: args => html`
    <zeta-accordion-item ${spread(args)}>
      ${!args.navigation && html`<div>content!</div>`}
      ${!args.navigation &&
      args.header &&
      html`<div slot="header" style="display: flex; gap: var(--spacing-medium);">
        <zeta-button flavor="outline-subtle">Action 1</zeta-button>
        <zeta-button flavor="outline-subtle">Action 2</zeta-button>
        <zeta-button flavor="outline-subtle">Action 3</zeta-button>
      </div>`}
    </zeta-accordion-item>
  `
};
