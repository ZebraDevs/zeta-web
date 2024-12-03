import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAvatar } from "../../components/avatar/avatar.js";
import { fn } from '@storybook/test';
import { spread } from "@open-wc/lit-helpers";
import { html } from "lit";

type AvatarStory = ZetaAvatar & { "show-ring": boolean; "show-close": boolean; status: string };

const meta: Meta<AvatarStory> = {
  title: "Avatar",
  component: "zeta-avatar",
  args: {
    size: "m",
    "show-ring": false,
    "show-close": false,
    onclose: fn()
  },
  argTypes: {
    size: {
      options: ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      control: {
        type: "select"
      }
    },
    showRing: { table: { disable: true } },
    showClose: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=229-2"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const AvatarWithInitials: StoryObj<AvatarStory> = {
  args: {
    slot: "WW",
    showRing: false,
    showClose: false
  },
  render: ({ slot, onclose, ...args }) => {
    return html`<zeta-avatar ${spread(args)} @close=${onclose}>${slot}</zeta-avatar> `;
  }

};

export const AvatarWithImage: StoryObj<AvatarStory> = {
  args: {
    slot: "<img src='https://tinyurl.com/ykw9za3h'></img>"
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  },
  render: AvatarWithInitials.render
};

export const AvatarWithIcon: StoryObj<AvatarStory> = {
  args: {
    slot: "<zeta-icon>groups</zeta-icon>"
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  },
  render: AvatarWithInitials.render
};

export const AvatarWithStatus: StoryObj<AvatarStory> = {
  args: {
    slot: "WW",
    status: "<zeta-icon-indicator icon='star' slot='status'></zeta-icon-indicator>"
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  },
  render: AvatarWithInitials.render
};

export const AvatarWithCloseIcon: StoryObj<AvatarStory> = {
  args: {
    slot: "WW",
    "show-close": true
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  },
  render: AvatarWithInitials.render
};
