import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIndicator } from "../../index.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { html } from "lit";

class _ZetaIndicator extends ZetaIndicator {
  value!: string;
}

const meta: Meta<ZetaIndicator> = {
  component: "zeta-indicator",
  title: "Badges",
  args: {
    size: "medium",
    inverse: false,
    rounded: true
  },
  argTypes: {
    size: { options: ["small", "medium", "large"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const Indicator: StoryObj<_ZetaIndicator> = {
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    type: {
      options: ["icon", "notification"],
      control: {
        type: "select"
      }
    }
  },
  args: {
    value: "1",
    type: "notification",
    icon: "alarm"
  },
  render: args =>
    html`<zeta-indicator size=${args.size} .inverse=${args.inverse} .rounded=${args.rounded} icon=${args.icon} type=${args.type}>
      ${args.value}
    </zeta-indicator>`
};

export const IconIndicator: StoryObj<_ZetaIndicator> = {
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  },
  args: {
    icon: "alarm"
  },
  render: args => html` <zeta-icon-indicator size=${args.size} .inverse=${args.inverse} .rounded=${args.rounded} icon=${args.icon}> </zeta-icon-indicator>`
};

export const NotificationIndicator: StoryObj<_ZetaIndicator> = {
  args: {
    value: "1"
  },
  render: args =>
    html` <zeta-notification-indicator size=${args.size} .inverse=${args.inverse} .rounded=${args.rounded}>
      <slot>${args.value}</slot>
    </zeta-notification-indicator>`
};

