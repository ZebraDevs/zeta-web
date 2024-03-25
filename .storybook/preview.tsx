import type { Preview } from "@storybook/web-components";
import { themes } from "@storybook/theming";
import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import "../src";
import { Title, Description, Primary, Stories, ArgTypes } from "@storybook/addon-docs";
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
            <ArgTypes />
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
    status: {
      statuses: {
        needsAttention: {
          background: "#FEF0F1",
          color: "#F36070",
          description: "Component requires updates"
        },
        inProgress: {
          background: "#FEF2E2",
          color: "#F5A230",
          description: "In progress"
        },
        ready: {
          background: "#ECFFF7",
          color: "#67B796",
          description: "Web Component ready to use"
        }
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

