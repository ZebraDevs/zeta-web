import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { ZetaListItem } from "../../../components/list/list";

const meta: Meta<ZetaListItem> = {
  component: "zeta-list-item",
  title: "Components/List",
  args: {
    headline: "Headline"
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=19858-18383&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const ListItem: StoryObj<ZetaListItem> = {};

export const ListItemWithIconLeft: StoryObj<ZetaListItem> = {
  render: args => html`<zeta-list-item headline=${ifDefined(args.headline)}><zeta-icon slot="leading">star</zeta-icon></zeta-list-item>`
};

export const ListItemWithIconRight: StoryObj<ZetaListItem> = {
  render: args => html`<zeta-list-item headline=${ifDefined(args.headline)}><zeta-icon slot="trailing">star</zeta-icon></zeta-list-item>`
};

export const ListItemWithAction: StoryObj<ZetaListItem> = {
  render: args => html`<zeta-list-item headline=${ifDefined(args.headline)}><zeta-checkbox slot="trailing"></zeta-checkbox></zeta-list-item>`
};

export const ListItemWithAvatarAndAction: StoryObj<ZetaListItem> = {
  render: args =>
    html`<zeta-list-item headline=${ifDefined(args.headline)}>
      <zeta-avatar slot="leading" size="s"></zeta-avatar>
      <zeta-checkbox slot="trailing"></zeta-checkbox>
    </zeta-list-item>`
};
