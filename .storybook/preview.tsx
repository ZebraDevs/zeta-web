import type { Preview } from "@storybook/web-components";
import { themes } from "@storybook/theming";
import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import "../src";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories } from "@storybook/addon-docs";
import React from "react";
setCustomElementsManifest(customElements);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? themes.dark : themes.light,

      page: () => {
        return (
          <>
            <Title />
            <Description />
            <Primary />
            <ArgsTable />
            <Stories includePrimary={false} />
          </>
        );
      }
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", "Docs"],
        locales: ""
      }
    },
    viewport: {
      viewports: {
        android: {
          name: "Android",
          styles: {
            width: "360px",
            height: "640px"
          }
        },
        iPhone: {
          name: "iPhone 11 Pro",
          styles: {
            width: "375px",
            height: "812px"
          }
        }
      }
    }
  }
};

export default preview;

