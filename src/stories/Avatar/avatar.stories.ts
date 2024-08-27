import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAvatar } from "../../components/avatar/avatar.js";

type AvatarStory = ZetaAvatar & { "show-ring": boolean; "show-close": boolean; status: string };

const meta: Meta<AvatarStory> = {
  title: "Avatar",
  component: "zeta-avatar",
  args: {
    size: "m",
    "show-ring": false,
    "show-close": false
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
  }
};

export const AvatarWithImage: StoryObj<AvatarStory> = {
  args: {
    slot: "<img src='https://s3-alpha-sig.figma.com/img/7c9e/15bf/1cdf54aaa216aa8c95c3f6cd1aebffdf?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jeZ0xnld5wp6oqKCI30EILi3rn-cbyxvFblwA~QLphFSqWXobXPkp-dH~JZrNNNftDqCWi6JMMuR~HT1L5JcDARkBd0iIRIc~Z3GZGeYW-InJ8CMDQwzKepY~la~GPbEvKorgxJU5rh-Wc-xqLAh2GCjjaSDPvg9d8ZAnafFciGKTuJgXwD7QliB5ISUcC-11uLfgwa8zM1WMKcMh3Qwh9sl0y3f4o-sksu-JdVbLlkDcsBJmWGz1SkrKGV3qMNwh-7NvHNwnirmE0BXnUtogSXUbaS2cuGQ3Oh5V9tnWpF63xQz2cxa-buUAWCzD24XU1xhC6MgvdxwCP14fgCBjA__'></img>"
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  }
};

export const AvatarWithIcon: StoryObj<AvatarStory> = {
  args: {
    slot: "<zeta-icon>groups</zeta-icon>"
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  }
};

export const AvatarWithStatus: StoryObj<AvatarStory> = {
  args: {
    slot: "WW",
    status: "<zeta-icon-indicator icon='star' slot='status'></zeta-icon-indicator>"
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  }
};

export const AvatarWithCloseIcon: StoryObj<AvatarStory> = {
  args: {
    slot: "WW",
    "show-close": true
  },
  argTypes: {
    slot: { table: { disable: true } },
    status: { table: { disable: true } }
  }
};
