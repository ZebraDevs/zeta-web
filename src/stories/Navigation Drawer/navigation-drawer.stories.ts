import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationDrawer } from "../../index.js";

const meta: Meta<ZetaNavigationDrawer | { "show-animation": boolean }> = {
  component: "zeta-navigation-drawer",
  title: "Navigation Drawer",
  args: {
    anchor: "left",
    "show-animation": true
  },
  argTypes: {
    anchor: {
      options: ["right", "left"],
      control: {
        type: "select"
      }
    },
    open: { table: { disable: true } },
    initialOpen: { table: { disable: true } }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1788-53238&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const NavigationDrawer: StoryObj<ZetaNavigationDrawer> = {
  render: args => html`
    <div style="min-height: 600px">
      <zeta-navigation-drawer id="drawer" ?show-animation=${args.showAnimation} anchor=${args.anchor} .initialOpen="${true}">
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
      </zeta-navigation-drawer>
    </div>
  `
};
export const ShowNavigationDrawer: StoryObj<ZetaNavigationDrawer> = {
  render: args =>
    html`<zeta-button
        @click=${() => {
          const drawer = document.querySelector("#drawer") as ZetaNavigationDrawer;
          void drawer.show();
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
