import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationBar } from "../../index.js";

const meta: Meta<ZetaNavigationBar> = {
  component: "zeta-navigation-bar",
  title: "Navigation Bar",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21186-40498&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const BarIconAndLabel: StoryObj<ZetaNavigationBar> = {
  render: () => {
    var selected = 0;
    return html`<zeta-navigation-bar>
      <zeta-navigation-bar-item
        icon="star"
        @click="${() => {
          selected = 0;
          console.log(selected);
        }}"
        label="Label"
        .active=${selected === 0}
      ></zeta-navigation-bar-item>
      <zeta-navigation-bar-item
        icon="star"
        @click="${() => {
          selected = 1;
          console.log(selected);
        }}"
        label="Label"
        .active=${selected === 1}
      ></zeta-navigation-bar-item>
      <zeta-navigation-bar-item
        icon="star"
        @click="${() => {
          selected = 2;
          console.log(selected);
        }}"
        label="Label"
        .active=${selected === 2}
      ></zeta-navigation-bar-item>
    </zeta-navigation-bar>`;
  }
};

export const BarIconsOnly: StoryObj<ZetaNavigationBar> = {
  render: () =>
    html`<zeta-navigation-bar>
      <zeta-navigation-bar-item icon="star" active></zeta-navigation-bar-item>
      <zeta-navigation-bar-item icon="star"></zeta-navigation-bar-item>
      <zeta-navigation-bar-item icon="star"></zeta-navigation-bar-item>
    </zeta-navigation-bar>`
};
