import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAvatar } from "../../../components/avatar/avatar.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { fn } from "@storybook/test";
import { spread } from "@open-wc/lit-helpers";
import { html, nothing } from "lit";

type PlaygroundStory = ZetaAvatar & {
  showRing: boolean;
  showClose: boolean;
  contentType: "initials" | "image" | "icon";
  initials: string;
  icon: string;
  swatch: "default" | "blue" | "green" | "yellow" | "orange" | "purple" | "pink" | "teal";
  statusIcon?: string;
};

const meta: Meta<PlaygroundStory> = {
  title: "Components/Avatar",
  component: "zeta-avatar",
  args: {
    size: "m",
    showRing: false,
    showClose: false,
    onclose: fn()
  },
  argTypes: {
    size: {
      options: [
        "xxxs",
        "xxs",
        "xs",
        "s",
        "m",
        "l",
        "xl",
        "xxl",
        "xxxl",
        "xxxsmall",
        "xxsmall",
        "xsmall",
        "small",
        "medium",
        "large",
        "xlarge",
        "xxlarge",
        "xxxlarge"
      ],
      control: {
        type: "select"
      }
    },
    status: {
      options: [undefined, "available", "away", "busy", "dnd", "on-shift", "offline", "icon"],
      control: {
        type: "select"
      }
    },
    statusIcon: {
      control: { type: "text" }
    },
    showRing: { control: { type: "boolean" } },
    showClose: { control: { type: "boolean" } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-6017&m=dev"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Playground: StoryObj<PlaygroundStory> = {
  args: {
    contentType: "initials",
    initials: "WW",
    icon: "groups",
    swatch: "default",
    status: "available",
    statusIcon: "star"
  },
  argTypes: {
    contentType: {
      options: ["initials", "image", "icon"],
      control: { type: "select" }
    },
    initials: { control: { type: "text" }, if: { arg: "contentType", eq: "initials" } },
    swatch: {
      options: ["default", "purple", "yellow", "blue", "orange", "sea", "burgundy", "green"],
      control: { type: "select" }
    },
    icon: {
      options: ZetaIconNameList,
      control: { type: "select" },
      if: { arg: "contentType", eq: "icon" }
    },
    statusIcon: {
      options: ZetaIconNameList,
      control: { type: "select" },
      if: { arg: "status", eq: "icon" }
    }
  },
  render: ({ onclose, contentType, initials, icon, swatch, showRing, showClose, statusIcon, ...args }) => {
    const swatchStyle = swatch === "default" ? nothing : `--avatar-color: var(--avatar-${swatch})`;
    return html`
      <zeta-avatar ${spread(args)} ?show-ring=${showRing} ?show-close=${showClose} status-icon=${statusIcon || nothing} style=${swatchStyle} @close=${onclose}>
        ${contentType === "initials" ? initials : nothing} ${contentType === "icon" ? html`<zeta-icon>${icon}</zeta-icon>` : nothing}
        ${contentType === "image" ? html`<img style="filter: invert(1); width: 80%; height: 80%;" src="https://design.zebra.com/img/logo.svg" />` : nothing}
      </zeta-avatar>
    `;
  }
};
