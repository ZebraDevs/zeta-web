import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaListItem } from "../../index.js";

const meta: Meta<ZetaListItem> = {
  component: "zeta-list-item",
  title: "List",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=19858-18383&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
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

