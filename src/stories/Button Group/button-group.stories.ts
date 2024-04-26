import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaButtonGroup } from "../../index.js";
import { html } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const testFunc = () => console.log("Click");

const options = { testFunc, undefined };

const meta: Meta<ZetaButtonGroup> = {
  component: "zeta-button-group",
  title: "Button Group",
  args: {
    rounded: true,
    size: "medium"
  },
  argTypes: {
    size: {
      options: ["medium", "large"],
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
    },
    slot: { table: { disable: true } }
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

export const ButtonGroup: StoryObj<ZetaButtonGroup | any> = {
  args: {
    iconName: "star",
    length: 4
  },
  argTypes: {
    iconName: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  },
  render: args => {
    const array = Array(args.length).fill(0);
    const mappedArray = array.map((_, index) => {
      return html`<zeta-group-item iconName=${args.iconName} .onclick=${args.onclick}>Label ${index}</zeta-group-item>`;
    });

    return html` <zeta-button-group .rounded=${args.rounded} size=${args.size}> ${mappedArray.flat()} </zeta-button-group> `;
  }
};
