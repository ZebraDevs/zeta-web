import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaTopAppbar } from "../../components/top-appbar/top-appbar";
import "../../components/top-appbar/top-appbar";
import { html } from "lit";
import "../../components/icon/icon";
import "../../components/avatar/avatar";
import { styleMap } from "lit/directives/style-map.js";
import "../../components/search/search";

type AppbarStory = ZetaTopAppbar & { leading: string; trailing: string };

const meta: Meta<ZetaTopAppbar> = {
  component: "zeta-top-appbar",
  title: "Components/Top Appbar",
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=24183-7801&t=8Ym0ztJUuB4iD83l-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Default: StoryObj<AppbarStory> = {
  argTypes: {
    centered: { table: { disable: true } },
    extended: { table: { disable: true } },
    slot: { table: { disable: true } },
    leading: { table: { disable: true } },
    trailing: { table: { disable: true } }
  },
  render: () =>
    html`<zeta-top-appbar>
      <zeta-icon slot="leading">hamburger_menu</zeta-icon>
      <div style=${styleMap({
        display: "flex",
        gap: "8px",
        alignItems: "center"
      })}>
        <zeta-avatar size="xxxs"><img src="https://tinyurl.com/yn89fmc4"></img></zeta-avatar>
        Title
      </div>
      <div slot="trailing" style=${styleMap({
        display: "flex",
        gap: "16px",
        alignItems: "center"
      })}>
        <zeta-icon>world</zeta-icon>
        <zeta-icon>love</zeta-icon>
        <zeta-icon>more_vertical</zeta-icon>
      </div>
    </zeta-top-appbar>`
};

export const Centered: StoryObj<AppbarStory> = {
  argTypes: {
    centered: { table: { disable: true } },
    extended: { table: { disable: true } },
    slot: { table: { disable: true } },
    leading: { table: { disable: true } },
    trailing: { table: { disable: true } }
  },
  render: () =>
    html`<zeta-top-appbar centered>
      <zeta-icon slot="leading">hamburger_menu</zeta-icon>
      Title
      <zeta-icon slot="trailing">user_circle</zeta-icon>
    </zeta-top-appbar>`
};

export const Contextual: StoryObj<AppbarStory> = {
  argTypes: {
    centered: { table: { disable: true } },
    extended: { table: { disable: true } },
    slot: { table: { disable: true } },
    leading: { table: { disable: true } },
    trailing: { table: { disable: true } }
  },
  render: () =>
    html`<zeta-top-appbar>
      <zeta-icon slot="leading">close</zeta-icon>
      2 Items
      <div
        slot="trailing"
        style=${styleMap({
          display: "flex",
          gap: "16px",
          alignItems: "center"
        })}
      >
        <zeta-icon>edit</zeta-icon>
        <zeta-icon>share</zeta-icon>
        <zeta-icon>delete</zeta-icon>
        <zeta-icon>more_vertical</zeta-icon>
      </div>
    </zeta-top-appbar>`
};

export const Search: StoryObj<AppbarStory> = {
  argTypes: {
    centered: { table: { disable: true } },
    extended: { table: { disable: true } },
    slot: { table: { disable: true } },
    leading: { table: { disable: true } },
    trailing: { table: { disable: true } }
  },
  render: () =>
    html`<zeta-top-appbar>
      <zeta-icon slot="leading">arrow_back</zeta-icon>
      <zeta-search hasIcon placeholder="Search"></zeta-search>
    </zeta-top-appbar>`
};

export const Extended: StoryObj<AppbarStory> = {
  argTypes: {
    centered: { table: { disable: true } },
    extended: { table: { disable: true } },
    slot: { table: { disable: true } },
    leading: { table: { disable: true } },
    trailing: { table: { disable: true } }
  },
  render: () =>
    html`<zeta-top-appbar extended>
      <zeta-icon slot="leading">hamburger_menu</zeta-icon>
      <div
        style=${styleMap({
          display: "flex",
          gap: "8px",
          alignItems: "center"
        })}
      >
        Large Title
      </div>
      <div
        slot="trailing"
        style=${styleMap({
          display: "flex",
          gap: "16px",
          alignItems: "center"
        })}
      >
        <zeta-icon>world</zeta-icon>
        <zeta-icon>love</zeta-icon>
        <zeta-icon>more_vertical</zeta-icon>
      </div>
    </zeta-top-appbar>`
};
