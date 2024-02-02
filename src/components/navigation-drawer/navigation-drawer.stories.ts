import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationDrawer } from "./navigation-drawer.js";
import "./navigation-drawer.js";
import "./navigation-drawer-header/navigation-drawer-header.js";
import "./navigation-drawer-footer/navigation-drawer-footer.js";
import "./navigation-drawer-item/navigation-drawer-item.js";
import "./navigation-drawer-sub-item/navigation-drawer-sub-item.js";
import "../avatar/avatar.js";
import "../button/button.js";
import { html } from "lit";

const meta: Meta<ZetaNavigationDrawer> = {
  component: "zeta-navigation-drawer",
  args: {
    anchor: "left",
    showAnimation: true
  },
  argTypes: {
    anchor: {
      options: ["right", "left"],
      control: {
        type: "select"
      }
    }
  }
};
export default meta;

export const NavigationDrawer: StoryObj<ZetaNavigationDrawer> = {
  render: args =>
    html`<zeta-button
        @click=${() => {
          const drawer = document.querySelector("#drawer") as ZetaNavigationDrawer;
          drawer.show();
        }}
        >Open drawer</zeta-button
      ><zeta-navigation-drawer id="drawer" ?show-animation=${args.showAnimation} anchor=${args.anchor}>
        <zeta-navigation-drawer-header slot="header" headline="Title" sub-headline="Subtitle">
          <zeta-avatar slot="leading"></zeta-avatar>
          <zeta-icon slot="trailing" color="white">settings</zeta-icon>
        </zeta-navigation-drawer-header>
        <zeta-navigation-drawer-item active><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-sub-item>Navigation Sub Item</zeta-navigation-drawer-sub-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-item><zeta-icon slot="leading">star</zeta-icon> Navigation Item</zeta-navigation-drawer-item>
        <zeta-navigation-drawer-footer slot="footer" variant="logo">version 1.0.1</zeta-navigation-drawer-footer>
      </zeta-navigation-drawer>`
};
