import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaNavigationRail } from "../../../components/navigation-rail/navigation-rail";
import { html } from "lit";
import "../../../components/navigation-rail/navigation-rail";
import "../../../components/navigation-rail/navigation-rail-item";
import "../../../components/icon/icon";

const meta: Meta<ZetaNavigationRail> = {
  title: "Components/Navigation Rail",
  component: "zeta-navigation-rail",
  args: {
    rounded: true
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-43"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const NavigationRail: StoryObj<ZetaNavigationRail> = {
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: args => html`
    <zeta-navigation-rail .rounded=${args.rounded}>
      <zeta-navigation-rail-item selected tabIndex="1"><zeta-icon slot="icon">star</zeta-icon>Item</zeta-navigation-rail-item>
      <zeta-navigation-rail-item tabIndex="1"><zeta-icon slot="icon">star</zeta-icon>Item</zeta-navigation-rail-item>
      <zeta-navigation-rail-item tabIndex="1"><zeta-icon slot="icon">star</zeta-icon>Item</zeta-navigation-rail-item>
    </zeta-navigation-rail>
  `
};

export const NavigationRailWithNavigation: StoryObj<ZetaNavigationRail> = {
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: args => {
    const items = [];
    const baseUrl = `${document.location.origin}?path=/story/navigation-rail--navigation-rail-with-navigation`;
    const searchParams = new URLSearchParams(document.location.search);
    for (let i = 0; i < 3; i++) {
      items.push(
        html`<zeta-navigation-rail-item href="${baseUrl}&index=${i}" tabIndex="1" ?selected=${i.toString() === searchParams.get("index")}
          ><zeta-icon slot="icon">star</zeta-icon>Item</zeta-navigation-rail-item
        >`
      );
    }
    return html` <zeta-navigation-rail .rounded=${args.rounded}> ${items} </zeta-navigation-rail> `;
  }
};
