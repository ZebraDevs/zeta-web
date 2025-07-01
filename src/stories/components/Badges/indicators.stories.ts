import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIndicator } from "../../../components/badges/indicators/indicators.js";
import "../../../components/badges/indicators/indicators.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { html } from "lit";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaIndicator);

const meta: Meta<ZetaIndicator> = {
  component: "zeta-indicator",
  title: "Components/Badges",
  args: {
    size: "medium",
    rounded: true
  },
  argTypes: {
    size: { options: ["small", "medium", "large"], control: { type: "inline-radio" } },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21931-2105"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const IconIndicator: StoryObj = {
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    type: { table: { disable: true } },
    text: { table: { disable: true } }
  },
  args: {
    icon: "alarm"
  },
  render: args => html` <zeta-icon-indicator ${spread(args)}> </zeta-icon-indicator>`
};

export const NotificationIndicator: StoryObj = {
  args: { value: 1 },
  argTypes: {
    icon: { table: { disable: true } },
    type: { table: { disable: true } },
    value: { control: { type: "number" } }
  },
  render: args => html`<zeta-notification-indicator ${spread(args)}> </zeta-notification-indicator>`
};
