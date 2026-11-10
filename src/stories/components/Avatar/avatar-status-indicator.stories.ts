import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaAvatarStatusIndicator } from "../../../components/avatar/status-indicator/avatar-status-indicator.js";
import "../../../components/avatar/status-indicator/avatar-status-indicator.js";
import { html } from "lit";

const meta: Meta<ZetaAvatarStatusIndicator> = {
  title: "Components/Avatar/Status Indicator",
  component: "zeta-avatar-status-indicator",
  args: {
    status: "available"
  },
  argTypes: {
    status: {
      options: ["available", "away", "busy", "dnd", "on-shift", "offline", "close", "icon"],
      control: { type: "select" }
    },
    icon: { if: { arg: "status", eq: "icon" } },
    label: {}
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2699-17716&m=dev"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const StatusIndicator: StoryObj<ZetaAvatarStatusIndicator> = {};

export const AllStatuses: StoryObj<ZetaAvatarStatusIndicator> = {
  argTypes: {
    status: { table: { disable: true } },
    icon: { table: { disable: true } },
    label: { table: { disable: true } }
  },
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <zeta-avatar-status-indicator status="available"></zeta-avatar-status-indicator>
      <zeta-avatar-status-indicator status="away"></zeta-avatar-status-indicator>
      <zeta-avatar-status-indicator status="busy"></zeta-avatar-status-indicator>
      <zeta-avatar-status-indicator status="dnd"></zeta-avatar-status-indicator>
      <zeta-avatar-status-indicator status="on-shift"></zeta-avatar-status-indicator>
      <zeta-avatar-status-indicator status="offline"></zeta-avatar-status-indicator>
      <zeta-avatar-status-indicator status="close"></zeta-avatar-status-indicator>
      <zeta-avatar-status-indicator status="icon" icon="star" label="Featured"></zeta-avatar-status-indicator>
    </div>
  `
};
