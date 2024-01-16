import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaListItem } from "./list-item.js";
import { html } from "lit-html";
import "./list-item.js";
import "../../icon/icon.js";
import "../../checkbox/checkbox.js";
import "../../avatar/avatar.js";

const meta: Meta<ZetaListItem> = {
  component: "zeta-list-item"
};

export default meta;

export const ListItem: StoryObj<ZetaListItem> = {
  render: () => html`<zeta-list-item headline="List Item"></zeta-list-item>`
};

export const ListItemWithIconLeft: StoryObj<ZetaListItem> = {
  render: () => html`<zeta-list-item headline="List Item"><zeta-icon slot="leading">star</zeta-icon></zeta-list-item>`
};

export const ListItemWithIconRight: StoryObj<ZetaListItem> = {
  render: () => html`<zeta-list-item headline="List Item"><zeta-icon slot="trailing">star</zeta-icon></zeta-list-item>`
};

export const ListItemWithAction: StoryObj<ZetaListItem> = {
  render: () => html`<zeta-list-item headline="List Item"><zeta-checkbox slot="trailing"></zeta-checkbox></zeta-list-item>`
};

export const ListItemWithAvatarAndAction: StoryObj<ZetaListItem> = {
  render: () =>
    html`<zeta-list-item headline="List Item">
      <zeta-avatar slot="leading" size="sm"></zeta-avatar>
      <zeta-checkbox slot="trailing"></zeta-checkbox>
    </zeta-list-item>`
};
