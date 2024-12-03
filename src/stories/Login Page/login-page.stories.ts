import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaLoginPage } from "../../components/login-page/login-page.js";

const meta: Meta<ZetaLoginPage> = {
  title: 'Templates/Login Page',
  component: "zeta-login-page",
  args: {
    url: "https://www.example.com",
    name: "Zeta"
  },
  // argTypes: {
  // url: {}
  // },
  parameters: {
    // design: {
    //   url: "https://www.figma.com/file/"
    // },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const LoginPage: StoryObj<ZetaLoginPage> = {
  render: ({ slot, ...args }) =>
    html`<zeta-login-page url=${args.url} name=${args.name}></zeta-login-page>`
};
