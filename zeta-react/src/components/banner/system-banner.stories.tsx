import type { Meta, StoryObj } from "@storybook/react";
import "../../index.js";
import { ZetaSystemBanner } from "./system-banner.js";
import React from "react";
import { ifDefined } from "lit/directives/if-defined.js";
const meta: Meta<typeof ZetaSystemBanner> = {
  component: ZetaSystemBanner,
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
export const Banner: StoryObj<typeof ZetaSystemBanner> = {};
export const BannerSingleIcon: StoryObj<typeof ZetaSystemBanner> = {
  //TODO: This render method may need to change for react
  render: args => (
    <ZetaSystemBanner {...args}>
      <div slot="leading icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_1034_16007)">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z" />
          </g>
          <defs>
            <clipPath id="clip0_1034_16007">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </ZetaSystemBanner>
  )
};
export const BannerDualIcon: StoryObj<typeof ZetaSystemBanner> = {
  //TODO: This render method may need to change for react
  render: args => (
    <ZetaSystemBanner {...args}>
      <div slot="leading icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_1034_16007)">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z" />
          </g>
          <defs>
            <clipPath id="clip0_1034_16007">
              <rect width="24" height="24" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div slot="trailing icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g clip-path="url(#clip0_1111_28300)">
            <path d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z" />
          </g>
          <defs>
            <clipPath id="clip0_1111_28300">
              <rect width="24" height="24" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </ZetaSystemBanner>
  )
};

