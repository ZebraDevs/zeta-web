import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationBar } from "../../index.js";

const meta: Meta<ZetaNavigationBar> = {
  component: "zeta-navigation-bar",

  title: "Navigation Bar"
};

export default meta;

export const Icon: StoryObj<ZetaNavigationBar> = {
  render: () =>
    html`<zeta-navigation-bar>
      <zeta-navigation-bar-item icon="star" active></zeta-navigation-bar-item>
      <zeta-navigation-bar-item icon="star"></zeta-navigation-bar-item>
      <zeta-navigation-bar-item icon="star"></zeta-navigation-bar-item>
    </zeta-navigation-bar>`
};

export const IconWithLabel: StoryObj<ZetaNavigationBar> = {
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

