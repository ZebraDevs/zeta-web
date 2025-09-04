import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaGlobalHeader } from "../../components/global-header/global-header.js";
import { html } from "lit";
import "../../components/global-header/global-header";

const meta: Meta<ZetaGlobalHeader> = {
  component: "zeta-global-header",
  tags: ["autodocs"],
  title: "Components/Global Header",
  args: {
    platformName: "Platform Name",
    menuItems: [
      { label: "Nav Item", isDropDown: true },
      { label: "Nav Item" },
      { label: "Nav Item" },
      { label: "Nav Item" },
      { label: "Nav Item" },
      { label: "Nav Item" }
    ],
    //prettier-ignore
    actionItems: [
      { icon: "star", isDropDown: true },
      { icon: "star" },
      { icon: "star" },
      { icon: "star" },
      { icon: "star" },
      { icon: "star" }
    ],
    name: "Name",
    initials: "RK",
    appSwitcher: true,
    searchbar: true,
    isDropDown: true,
    rounded: false
  },
  argTypes: {
    platformName: { control: "text" },
    menuItems: { control: "object" },
    actionItems: { control: "object" },
    name: { control: "text" },
    initials: { control: "text" },
    appSwitcher: { control: "boolean" },
    searchbar: { control: "boolean" },
    isDropDown: { control: "boolean" },
    rounded: { control: "boolean" }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23144-118110&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const GlobalHeader: StoryObj = {
  argTypes: {
    menuPosition: {
      table: {
        disable: true
      }
    }
  },
  render: args => {
    return html`<zeta-global-header
      .platformName=${args.platformName}
      .menuItems=${args.menuItems}
      .actionItems=${args.actionItems}
      .name=${args.name}
      .initials=${args.initials}
      .appSwitcher=${args.appSwitcher}
      .searchbar=${args.searchbar}
      .isDropDown=${args.isDropDown}
      .rounded=${args.rounded}
    ></zeta-global-header>`;
  }
};

// export const WithMenuItems: StoryObj = {
//   render: args =>
//     html`<zeta-global-header menuPosition=${args.menuPosition} headline=${args.headline}>
//       <zeta-icon-button slot="leading" flavor="text">apps</zeta-icon-button>
//       <zeta-tab-bar slot="navigation-menu">
//         <zeta-tab-item active>Menu Item</zeta-tab-item>
//         <zeta-tab-item>Menu Item</zeta-tab-item>
//         <zeta-tab-item>Menu Item</zeta-tab-item>
//         <zeta-tab-item>Menu Item</zeta-tab-item>
//       </zeta-tab-bar>
//       <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
//       <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
//       <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
//       <zeta-navigation-profile slot="trailing" rounded>
//         <zeta-avatar slot="leading" size="s"></zeta-avatar>
//         My account
//       </zeta-navigation-profile>
//     </zeta-global-header>`
// };
