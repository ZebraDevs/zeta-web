import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNotificationIndicator } from "./notification-indicator.js";
import "./notification-indicator.js";
import { html } from "lit";

const meta: Meta<ZetaNotificationIndicator> = {
  component: "zeta-notification-indicator",
  args: {
    size: "medium",
    inverse: false,
    condensed: false
  },
  argTypes: {
    size: { options: ["small", "medium", "large"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const NotificationIndicator: StoryObj<ZetaNotificationIndicator> = {
  render: args => html`<zeta-notification-indicator size=${args.size} .inverse=${args.inverse} .condensed=${args.condensed}>5</zeta-notification-indicator>`
};
