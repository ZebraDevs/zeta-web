import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaAppbar } from "../../components/appbar/appbar";
import "../../components/appbar/appbar";
import { html } from "lit";
import "../../components/icon/icon";
import "../../components/avatar/avatar";
import { styleMap } from "lit/directives/style-map.js";
import "../../components/search/search";

type AppbarStory = ZetaAppbar & { leading: string; trailing: string };

const meta: Meta<ZetaAppbar> = {
  component: "zeta-appbar",
  title: "Appbar"
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
    html`<zeta-appbar>
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
    </zeta-appbar>`
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
    html`<zeta-appbar centered>
      <zeta-icon slot="leading">hamburger_menu</zeta-icon>
      Title
      <zeta-icon slot="trailing">user_circle</zeta-icon>
    </zeta-appbar>`
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
    html`<zeta-appbar>
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
    </zeta-appbar>`
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
    html`<zeta-appbar>
      <zeta-icon slot="leading">arrow_back</zeta-icon>
      <zeta-search hasIcon placeholder="Search"></zeta-search>
    </zeta-appbar>`
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
    html`<zeta-appbar extended>
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
    </zeta-appbar>`
};
