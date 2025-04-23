import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIcon } from "../../components/icon/icon.js";
import { spreadGenerator } from "../utils.js";
import { html } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import DOMPurify from "dompurify";
const spread = spreadGenerator(ZetaIcon);

const meta: Meta<ZetaIcon> = {
  component: "zeta-icon",
  title: "Assets/Icon",
  args: { rounded: true },
  argTypes: {
    name: {
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
  argTypes: { slot: { table: { disable: true } } },
  args: { name: "alarm" },
  render: ({ slot, ...args }) =>
    html` <style>
        :root {
          ${args["--icon-color"] && `--icon-color: ${args["--icon-color"]}`} ;
          ${args["--icon-size"] && `--icon-size: ${args["--icon-size"]}`} ;
        }
      </style>
      <zeta-icon ${spread(args)}> </zeta-icon>`
};

export const SVGIcon: StoryObj = {
  args: {
    slot: `<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1107_3277)">
            <path
              fill-rule="evenodd"
              d="M250 450H325V750H250V450ZM612.5 525C622.405 524.87 631.87 520.88 638.875 513.875C645.88 506.87 649.87 497.405 650 487.5C649.87 477.595 645.88 468.131 638.875 461.127C631.87 454.122 622.405 450.13 612.5 450H475C455.109 450 436.032 457.902 421.967 471.967C407.902 486.032 400 505.11 400 525V562.5C400 582.39 407.902 601.47 421.967 615.535C436.032 629.6 455.109 637.5 475 637.5H575V675H437.5C427.555 675 418.016 678.95 410.984 685.985C403.951 693.015 400 702.555 400 712.5C400 722.445 403.951 731.985 410.984 739.015C418.016 746.05 427.555 750 437.5 750H575C594.89 750 613.97 742.1 628.035 728.035C642.1 713.97 650 694.89 650 675V637.5C650 617.61 642.1 598.53 628.035 584.465C613.97 570.4 594.89 562.5 575 562.5H475V525H612.5ZM900 450H800C780.27 450.506 761.485 458.57 747.525 472.527C733.57 486.484 725.505 505.27 725 525V675C725.505 694.73 733.57 713.515 747.525 727.475C761.485 741.43 780.27 749.495 800 750H900C919.73 749.495 938.515 741.43 952.475 727.475C966.43 713.515 974.495 694.73 975 675V525C974.495 505.27 966.43 486.484 952.475 472.527C938.515 458.57 919.73 450.506 900 450ZM900 675H800V525H900V675Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_1107_3277"><path width="24" fill="white" d="M0 0H1200V1200H0V0z" /></clipPath>
          </defs>
        </svg>`
  },
  argTypes: {
    name: { table: { disable: true } },
    slot: { control: { type: "text" } }
  },
  render: ({ slot, ...args }) => {
    const clean = DOMPurify.sanitize(slot, { USE_PROFILES: { svg: true } });
    console.log(clean);
    return html` <style>
        :root {
          ${args["--icon-color"] && `--icon-color: ${args["--icon-color"]}`} ;
          ${args["--icon-size"] && `--icon-size: ${args["--icon-size"]}`} ;
        }
      </style>
      <zeta-icon ${spread(args)}>${unsafeSVG(clean)}</zeta-icon>`;
  }
};
