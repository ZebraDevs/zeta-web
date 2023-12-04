// indicators.stories.ts

import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNotificationIndicator } from "./notification-indicator.js";

const meta: Meta<ZetaNotificationIndicator> = {
  component: "zeta-notification-indicator",
  args: {
    size: "medium",
    inverse: false,
    condensed: false,
    count: "5"
  },
  argTypes: {
    size: { options: ["small", "medium", "large"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const NotificationIndicator: StoryObj<ZetaNotificationIndicator> = {};

