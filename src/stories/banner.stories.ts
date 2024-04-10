import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSystemBanner } from "../index.js";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta<ZetaSystemBanner> = {
  title: "Banner",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=229-12"
    },
    status: {
      type: "ready"
    }
  },
  component: "zeta-system-banner",
  args: {
    text: "Banner title",
    align: "center",
    status: "default",
    rounded: true
  },
  argTypes: {
    status: {
      options: ["default", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    },
    align: {
      options: ["center", "start"],
      control: {
        type: "radio"
      }
    }
  }
};
export default meta;

export const Banner: StoryObj<ZetaSystemBanner> = {};

export const BannerSingleIcon: StoryObj<ZetaSystemBanner> = {
  render: args =>
    html`<zeta-system-banner align=${ifDefined(args.align)} status=${ifDefined(args.status)} text=${ifDefined(args.text)} .rounded=${args.rounded}>
      <svg slot="leading icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g clip-path="url(#clip0_1034_16007)">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_1034_16007">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs></svg
    ></zeta-system-banner>`
};

export const BannerDualIcon: StoryObj<ZetaSystemBanner> = {
  render: args => html`
    <zeta-system-banner align=${ifDefined(args.align)} status=${ifDefined(args.status)} text=${ifDefined(args.text)} .rounded=${args.rounded}>
      <svg slot="leading icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g clip-path="url(#clip0_1034_16007)">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_1034_16007">
            <rect width="24" height="24" />
          </clipPath>
        </defs>
      </svg>
      <svg slot="trailing icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g clip-path="url(#clip0_1111_28300)">
          <path d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z" />
        </g>
        <defs>
          <clipPath id="clip0_1111_28300">
            <rect width="24" height="24" />
          </clipPath>
        </defs>
      </svg>
    </zeta-system-banner>
  `
};
