import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIcon } from "../../components/icon/icon.js";
import { spreadGenerator } from "../utils.js";
import { html } from "lit";
const spread = spreadGenerator(ZetaIcon);

const meta: Meta<ZetaIcon> = {
  component: "zeta-icon",
  title: "Assets",
  args: {
    slot: "alarm",
    rounded: true
  },
  argTypes: {
    slot: {
      options: ZetaIconNameList,
      control: { type: "select" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/VQ7Aa3rDYB7mgpToI3bZ4D/%F0%9F%A6%93-ZDS---Assets?type=design&node-id=240-6&mode=design"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const Icon: StoryObj = {
  render: ({ slot, ...args }) =>
    html` <style>
        :root {
          ${args["--icon-color"] && `--icon-color: ${args["--icon-color"]}`} ;
          ${args["--icon-size"] && `--icon-size: ${args["--icon-size"]}`} ;
        }
      </style>
      <zeta-icon ${spread(args)}>${slot}</zeta-icon>`
};
