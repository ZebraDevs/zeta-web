import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaList } from "./list.js";
import { html } from "lit-html";
import "./list.js";
import "./list-item/list-item.js";

const meta: Meta<ZetaList> = {
  component: "zeta-list",
  args: {
    divide: true
  }
};

export default meta;

export const List: StoryObj<ZetaList> = {
  render: args =>
    html`<zeta-list .divide=${args.divide}
      ><zeta-list-item headline="List Item"></zeta-list-item><zeta-list-item headline="List Item"></zeta-list-item
      ><zeta-list-item headline="List Item"></zeta-list-item
    ></zeta-list>`
};
