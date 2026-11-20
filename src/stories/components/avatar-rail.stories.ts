import type { Meta, StoryObj } from "@storybook/web-components";
import { fn } from "@storybook/test";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../components/avatar/avatar.js";

type AvatarRailArgs = {
  "show-close": boolean;
  size?: string;
  onclose: (e: Event) => void;
};

// Avatars fire a bubbling `close` event; log it and remove the avatar so the toggle has a visible effect.
const handleClose = (args: AvatarRailArgs) => (e: Event) => {
  args.onclose(e);
  (e.target as HTMLElement).remove();
};

const meta: Meta<AvatarRailArgs> = {
  component: "zeta-avatar-rail",
  title: "Components/Avatar Rail",
  tags: ["autodocs"],
  args: {
    "show-close": true,
    size: "m",
    onclose: fn()
  },
  argTypes: {
    "show-close": { control: { type: "boolean" } },
    size: {
      options: ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      control: {
        type: "select"
      }
    },
    onclose: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6494-1953"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const AvatarRail: StoryObj<AvatarRailArgs> = {
  render: args => {
    return html`
      <zeta-avatar-rail ?show-close=${args["show-close"]} size=${ifDefined(args.size)} @close=${handleClose(args)}>
        <zeta-avatar>AD</zeta-avatar>
        <zeta-avatar>AB</zeta-avatar>
        <zeta-avatar>AC</zeta-avatar>
        <zeta-avatar>AE</zeta-avatar>
      </zeta-avatar-rail>
    `;
  }
};

/** An avatar's own `show-close` attribute wins over the rail's, so one avatar can show its close icon while the rest don't. */
export const PerAvatarShowClose: StoryObj<AvatarRailArgs> = {
  args: { "show-close": false },
  render: args => {
    return html`
      <zeta-avatar-rail ?show-close=${args["show-close"]} size=${ifDefined(args.size)} @close=${handleClose(args)}>
        <zeta-avatar>AD</zeta-avatar>
        <zeta-avatar show-close>AB</zeta-avatar>
        <zeta-avatar>AC</zeta-avatar>
      </zeta-avatar-rail>
    `;
  }
};
