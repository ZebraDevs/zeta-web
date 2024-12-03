import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIndicator } from "../../components/badges/indicators/indicators.js";
import "../../components/badges/indicators/indicators.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

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
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21931-2105"
    },
    status: {
      type: "needsAttention"
    }
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
    html`<zeta-indicator size=${args.size} .inverse=${args.inverse} .rounded=${args.rounded} icon=${args.icon} type=${args.type} value=${args.value}>
    </zeta-indicator>`
};

export const IconIndicator: StoryObj<_ZetaIndicator> = {
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    type: { table: { disable: true } }
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
  argTypes: {
    icon: { table: { disable: true } },
    type: { table: { disable: true } },
    value: {
      control: {
        type: "text"
      }
    }
  },
  render: args =>
    html` <zeta-notification-indicator size=${args.size} .inverse=${args.inverse} .rounded=${args.rounded} value=${ifDefined(args.value)}>
    </zeta-notification-indicator>`
};
