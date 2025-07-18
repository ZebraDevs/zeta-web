import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaActionMenuButton } from "../../../components/action-menu/action-menu-button.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ShapeList } from "../../../mixins/contourable-three.js";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaActionMenuButton);

const meta: Meta<ZetaActionMenuButton> = {
  component: "zeta-action-menu-button",
  title: "Components/Action Menu",
  args: {
    open: false,
    icon: "more_vertical",
    alignment: "start",
    direction: undefined,
    flavor: "primary",
    items: [
      {
        label: "Item 1",
        icon: "star",
        onClick: () => {
          console.log("Item 1 clicked");
        }
      },
      {
        label: "Item 2",
        icon: "star",
        onClick: () => {
          console.log("Item 2 clicked");
        }
      },
      {
        label: "Item 3",
        icon: "star",
        onClick: () => {
          console.log("Item 3 clicked");
        }
      }
    ]
  },
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: { type: "select" }
    },
    alignment: {
      options: ["start", "end", "center"],
      control: { type: "inline-radio" }
    },
    flavor: {
      options: ["primary", "positive", "negative", "outline", "outline-subtle", "text"],
      control: { type: "select" }
    },
    direction: {
      options: ["left", "right", "bottom", "top", undefined],
      control: {
        type: "select"
      }
    },
    items: {
      table: { disable: true }
    },
    size: {
      table: { disable: true }
    },
    shape: {
      options: ShapeList,
      control: { type: "radio" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22391-10146&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "designPending"
    }
  }
};

export default meta;

export const ActionMenuButton: StoryObj = {
  render: args => html`
    <div style="display: flex; justify-content: center;">
      <div style="padding: 30px">
        <h4>Small</h4>
        <zeta-action-menu-button ${spread(args)} .size=${"small"} .items=${args.items}> </zeta-action-menu-button>
      </div>
      <div style="padding: 30px">
        <h4>Medium</h4>
        <zeta-action-menu-button ${spread(args)} .size=${"medium"} .items=${args.items}> </zeta-action-menu-button>
      </div>
      <div style="padding: 30px">
        <h4>Large</h4>
        <zeta-action-menu-button ${spread(args)} .size=${"large"} .items=${args.items}> </zeta-action-menu-button>
      </div>
    </div>
  `
};
