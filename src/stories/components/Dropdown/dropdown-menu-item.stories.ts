import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDropdownMenuItem } from "../../../components/dropdown/menu-item/dropdown-menu-item.js";
import "../../../components/dropdown/droppable.js";
import { ZetaIconNameList, type ZetaIconName } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaDropdownMenuItem & { icon: ZetaIconName }> = {
  component: "zeta-dropdown-menu-item",
  title: "Components/Dropdown",
  args: {
    rounded: true,
    disabled: false,
    checked: false,
    type: "default",
    icon: "star",
    slot: "Menu Item"
  },
  argTypes: {
    size: { table: { disable: true } },
    type: {
      options: ["default", "checkbox", "radio"],
      control: { type: "select" }
    },
    icon: {
      options: ZetaIconNameList,
      control: { type: "select" }
    },
    tabIndex: {
      table: { disable: true }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2402-6508"
    },
    status: { type: "ready" }
  }
};

export default meta;

export const DropdownMenuItem: StoryObj<ZetaDropdownMenuItem & { icon: ZetaIconName }> = {
  render: args =>
    html`<div role="menu" aria-label="Menu">
      <zeta-dropdown-menu-item .rounded=${args.rounded} .disabled=${args.disabled} .checked=${args.checked} type=${args.type}>
        <zeta-icon .rounded=${args.rounded} slot="icon">${args.icon}</zeta-icon>
        ${args.slot}
      </zeta-dropdown-menu-item>
    </div>`
};

export const DropdownMenuItemTypes: StoryObj<ZetaDropdownMenuItem> = {
  render: () =>
    html`<zeta-droppable open compact role="menu" aria-label="Filter" style="position: static">
      <zeta-dropdown-menu-item><zeta-icon slot="icon">edit</zeta-icon>Edit<zeta-icon slot="trailing">chevron_right</zeta-icon></zeta-dropdown-menu-item>
      <zeta-dropdown-menu-item checked><zeta-icon slot="icon">star</zeta-icon>Selected</zeta-dropdown-menu-item>
      <zeta-dropdown-menu-item disabled><zeta-icon slot="icon">delete</zeta-icon>Disabled</zeta-dropdown-menu-item>
      <zeta-dropdown-menu-item type="checkbox" checked>Checkbox</zeta-dropdown-menu-item>
      <zeta-dropdown-menu-item type="checkbox">Checkbox</zeta-dropdown-menu-item>
      <zeta-dropdown-menu-item type="radio" checked>Radio</zeta-dropdown-menu-item>
      <zeta-dropdown-menu-item type="radio">Radio</zeta-dropdown-menu-item>
    </zeta-droppable>`
};
