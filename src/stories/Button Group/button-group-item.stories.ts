import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaButtonGroupItem } from "../../index.js";
import { html } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const testFunc = () => console.log("Click");

const options = { testFunc, undefined };

const meta: Meta<ZetaButtonGroupItem> = {
  component: "zeta-group-item",
  title: "Button Group",
  args: {
    slot: "Label",
    size: "medium",
    rounded: true,
    disabled: false,
    name: "",
    onclick: testFunc
  },
  argTypes: {
    size: {
      options: ["medium", "large"],
      control: {
        type: "select"
      }
    },
    iconName: {
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
      <zeta-group-item iconName=${args.iconName} size=${args.size} .onclick=${args.onclick} .disabled=${args.disabled} .rounded=${args.rounded}>
        ${args.slot}
      </zeta-group-item>
    `;
  }
};
