import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDroppable } from "../../../components/dropdown/droppable.js";
import "../../../components/dropdown/menu-item/dropdown-menu-item.js";

const meta: Meta<ZetaDroppable> = {
  component: "zeta-droppable",
  title: "Components/Dropdown",
  args: {
    rounded: true,
    open: true,
    compact: false
  },
  argTypes: {
    matchParentWidth: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2666-6863"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Droppable: StoryObj<ZetaDroppable> = {
  render: args =>
    html`<div style="display: flex; align-items: center; gap: 100px; flex-wrap: wrap; ">
      <div>
        <h4>No Items</h4>
        <zeta-droppable ?rounded=${args.rounded} ?open=${args.open} ?compact=${args.compact}> </zeta-droppable>
      </div>
      <div>
        <h4>With Dropdown Menu Items</h4>
        <zeta-droppable ?rounded=${args.rounded} ?open=${args.open} ?compact=${args.compact} role="menu" aria-label="Menu">
          <zeta-dropdown-menu-item ?rounded=${args.rounded}><zeta-icon slot="icon">star</zeta-icon> Menu Item </zeta-dropdown-menu-item>
          <zeta-dropdown-menu-item ?rounded=${args.rounded}><zeta-icon slot="icon">star</zeta-icon> Menu Item </zeta-dropdown-menu-item>
          <zeta-dropdown-menu-item ?rounded=${args.rounded}><zeta-icon slot="icon">star</zeta-icon> Menu Item </zeta-dropdown-menu-item>
        </zeta-droppable>
      </div>
    </div>`
};
