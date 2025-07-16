import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAccordion } from "../../components/accordion/accordion.js";
import { html } from "lit";
import "../../components/accordion/accordion-item/accordion-item";
import "../../components/button/button";

type AccordionStoryArgs = ZetaAccordion & { selectable: boolean; navigation: boolean };
const meta: Meta<AccordionStoryArgs> = {
  component: "zeta-accordion",
  title: "Components/Accordion",
  tags: ["autodocs"],
  args: {
    selectable: true,
    navigation: false,
    inCard: true,
    expandMultiple: false,
    selectMultiple: false,
    rounded: true
  },
  argTypes: {
    slot: { table: { disable: true } }
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

export const Accordion: StoryObj<AccordionStoryArgs> = {
  render: args =>
    html`<zeta-accordion .inCard=${args.inCard} .expandMultiple=${args.expandMultiple} .selectMultiple=${args.selectMultiple} .rounded=${args.rounded}>
      <zeta-accordion-item title="Accordion Item 1" .selectable=${args.selectable && !args.navigation} .navigation=${args.navigation}>
        ${!args.navigation && html`<div>content!</div>`}
        ${!args.navigation &&
        html`<div slot="header" style="display: flex; gap: var(--spacing-medium);">
          <zeta-button flavor="outline-subtle">Action 1</zeta-button>
          <zeta-button flavor="outline-subtle">Action 2</zeta-button>
          <zeta-button flavor="outline-subtle">Action 3</zeta-button>
        </div>`}
      </zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 1" .selectable=${args.selectable && !args.navigation} .navigation=${args.navigation}>
        ${!args.navigation && html`<div>content!</div>`}
      </zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 1" .selectable=${args.selectable && !args.navigation} .navigation=${args.navigation}>
        ${!args.navigation && html`<div>content!</div>`}
      </zeta-accordion-item>
    </zeta-accordion>`
};
