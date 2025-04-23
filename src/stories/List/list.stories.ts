import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaList } from "../../components/list/list.js";
import "../../components/list/list-item/list-item.js";

const meta: Meta<ZetaList> = {
  component: "zeta-list",
  title: "Components/List",
  args: {
    divide: true
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

export const List: StoryObj<ZetaList> = {
  render: args =>
    html`<zeta-list .divide=${args.divide}>
      <zeta-list-item headline="List Item"></zeta-list-item>
      <zeta-list-item headline="List Item"></zeta-list-item>
      <zeta-list-item headline="List Item"></zeta-list-item>
    </zeta-list>`
};
