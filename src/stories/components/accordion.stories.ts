import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAccordion } from "../../components/accordion/accordion.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import "../../components/accordion/accordion-item/accordion-item";

const spread = spreadGenerator(ZetaAccordion);

type AccordionStoryArgs = ZetaAccordion & { selectable: boolean; navigation: boolean };
const meta: Meta<AccordionStoryArgs> = {
  component: "zeta-accordion",
  title: "Components/Accordion",
  tags: ["autodocs"],
  args: {
    selectable: true,
    navigation: false,
    inCard: true
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
    html`<zeta-accordion .inCard=${args.inCard}>
      <zeta-accordion-item title="Accordion Item 1" .isSelectable=${args.selectable && !args.navigation} .isNavigation=${args.navigation}>
        ${!args.navigation && html`<div>content!</div>`}
      </zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 1" .isSelectable=${args.selectable && !args.navigation} .isNavigation=${args.navigation}>
        ${!args.navigation && html`<div>content!</div>`}
      </zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 1" .isSelectable=${args.selectable && !args.navigation} .isNavigation=${args.navigation}>
        ${!args.navigation && html`<div>content!</div>`}
      </zeta-accordion-item>
    </zeta-accordion>`
};
