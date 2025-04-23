import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaButtonGroupItem } from "../../components/button-group/button-group-item/button-group-item.js";

const testFunc = () => console.log("Click");

const options = { testFunc, undefined };

const meta: Meta<ZetaButtonGroupItem> = {
  component: "zeta-button-group-item",
  title: "Components/Button Group",
  args: {
    slot: "Label",
    size: "medium",
    rounded: true,
    disabled: false,
    flavor: "default",
    name: "",
    onclick: testFunc,
    showDropdown: false
  },
  argTypes: {
    flavor: {
      options: ["default", "inverse"],
      control: {
        type: "select"
      }
    },
    size: {
      options: ["medium", "large"],
      control: {
        type: "select"
      }
    },
    icon: {
      options: [null, ...ZetaIconNameList],
      control: {
        type: "select"
      }
    },
    onclick: {
      options: Object.keys(options),
      mapping: options,
      control: {
        type: "select",
        labels: {
          testFunc: "Dropdown on",
          undefined: "Dropdown off"
        }
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/zzzpriTQpJKlW4gB5Fn3bF/Design-System-Sprint-3?type=design&node-id=23116-95148&mode=design&t=C1QjqPlEoal6a5PI-4"
    },
    status: {
      type: "inProgress"
    }
  }
};

export default meta;

export const GroupItem: StoryObj = {
  render: args => {
    return html`
      <zeta-button-group-item
        size=${args.size}
        @click=${args.onclick}
        .disabled=${args.disabled}
        .rounded=${args.rounded}
        ?showDropdown=${args.showDropdown}
        flavor=${args.flavor}
        name=${args.name}
      >
        ${args.slot} ${args.icon && html`<zeta-icon slot="icon">${args.icon}</zeta-icon>`}
      </zeta-button-group-item>
    `;
  }
};

export const GroupItemWithDropdown: StoryObj = {
  args: {
    showDropdown: true
  },
  render: GroupItem.render
};
