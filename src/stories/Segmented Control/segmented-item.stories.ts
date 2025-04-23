import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSegmentedItem } from "../../components/segmented-control/segmented-item.js";
import "../../components/icon/icon.js";
import { html } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaSegmentedItem> = {
  component: "zeta-segmented-item",
  title: "Components/Segmented Control",
  args: {
    rounded: true,
    active: true
  }
};

export default meta;

export const SegmentedItemText: StoryObj<ZetaSegmentedItem> = {
  args: {
    slot: "Item 1"
  },
  render: props => {
    return html`<zeta-segmented-item .active=${props.active} .rounded=${props.rounded}>${props.slot}</zeta-segmented-item>`;
  }
};

export const SegmentedItemIcon: StoryObj<ZetaSegmentedItem> = {
  args: {
    slot: "star"
  },
  argTypes: {
    slot: {
      name: "Icon",
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  },
  render: props => {
    return html`<zeta-segmented-item .active=${props.active} .rounded=${props.rounded}><zeta-icon>${props.slot}</zeta-icon></zeta-segmented-item>`;
  }
};
