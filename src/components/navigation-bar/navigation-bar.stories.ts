import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationBar } from "./navigation-bar.js";
import { html } from "lit";
import "./navigation-bar.js";
import "./navigation-bar-item/navigation-bar-item.js";

const meta: Meta<ZetaNavigationBar> = {
  component: "zeta-navigation-bar"
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
  render: () =>
    html`<zeta-navigation-bar>
      <zeta-navigation-bar-item icon="star" label="Label" active></zeta-navigation-bar-item>
      <zeta-navigation-bar-item icon="star" label="Label"></zeta-navigation-bar-item>
      <zeta-navigation-bar-item icon="star" label="Label"></zeta-navigation-bar-item>
    </zeta-navigation-bar>`
};
