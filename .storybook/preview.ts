import type { Preview } from "@storybook/web-components";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
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

