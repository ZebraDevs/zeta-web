import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaButtonGroup } from "../../../components/button-group/button-group.js";
import "../../../components/button-group/button-group-item/button-group-item.js";
import { html } from "lit";
import { ZetaIconNameList, type ZetaIconName } from "@zebra-fed/zeta-icons";

const testFunc = () => console.log("Click");
const options = { testFunc, undefined };

const meta: Meta<ZetaButtonGroup> = {
  component: "zeta-button-group",
  title: "Components/Button Group",
  args: {
    rounded: true,
    size: "medium"
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" }
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
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=5833-912"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const ButtonGroup: StoryObj<ZetaButtonGroup & { count: number; showDropdown: boolean; icon?: ZetaIconName }> = {
  args: {
    icon: "star",
    count: 4,
    showDropdown: false
  },
  argTypes: {
    icon: {
      options: [null, ...ZetaIconNameList],
      control: {
        type: "select"
      }
    }
  },
  render: args => {
    const array = Array(args.count).fill(0);
    const mappedArray = array.map((_, index) => {
      return html`<zeta-button-group-item .onclick=${args.onclick} ?showDropdown=${args.showDropdown}>
        Label ${index} ${args.icon && html`<zeta-icon slot="icon">${args.icon}</zeta-icon>`}
      </zeta-button-group-item> `;
    });

    return html` <zeta-button-group aria-label="Button group" .rounded=${args.rounded} size=${args.size}> ${mappedArray.flat()} </zeta-button-group> `;
  }
};
