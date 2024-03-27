import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTextInput } from "../index.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { html } from "lit";
import { spread } from "@open-wc/lit-helpers";

//TODO: These are seperate on Figma, should be split here too?
const meta: Meta<
  | ZetaTextInput
  | {
      "hint-text": string;
      "error-text": string;
      "prefix-text": string;
    }
> = {
  tags: ["autodocs"],
  title: "Text Input",
  component: "zeta-text-input",
  args: {
    value: "",
    placeholder: "Placeholder",
    "hint-text": "hint",
    error: false,
    disabled: false,
    "error-text": "Error!",
    label: "",
    rounded: true,
    required: false,
    "prefix-text": "",
    suffix: ""
  },
  argTypes: {
    type: { table: { disable: true } },
    leadingIcon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    trailingIcon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "inline-radio" }
    }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23116-92946&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export const TextInput: StoryObj = {
  name: "Default text input",

  render: args => html`
    <zeta-text-input ${spread(args)} .rounded=${args.rounded} .disabled=${args.disabled} .error=${args.error} ?required=${args.required}> </zeta-text-input>
  `
};

export const TimeInput: StoryObj = {
  name: "Time input",
  args: {
    type: "time"
  },
  argTypes: {
    "hint-text": { table: { disable: true } },
    "prefix-text": { table: { disable: true } },
    placeholder: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22751-9848&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  },
  render: args => html`
    <zeta-text-input ${spread(args)} .rounded=${args.rounded} .disabled=${args.disabled} .error=${args.error} ?required=${args.required}> </zeta-text-input>
  `
};

export const DateInput: StoryObj = {
  name: "Date input",
  args: {
    type: "date"
  },
  argTypes: {
    "hint-text": { table: { disable: true } },
    placeholder: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    prefix: { table: { disable: true } },
    "prefix-text": { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22667-52911&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  },
  render: args => html`
    <zeta-text-input ${spread(args)} .rounded=${args.rounded} .disabled=${args.disabled} .error=${args.error} ?required=${args.required}> </zeta-text-input>
  `
};

export const TextArea: StoryObj = {
  name: "Text area field",
  args: {
    type: "textarea"
  },
  argTypes: {
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    "prefix-text": { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  render: args => html`
    <zeta-text-input ${spread(args)} .rounded=${args.rounded} .disabled=${args.disabled} .error=${args.error} ?required=${args.required}> </zeta-text-input>
  `
};

export const PasswordField: StoryObj = {
  name: "Password field",
  args: {
    type: "password"
  },
  argTypes: {
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    "prefix-text": { table: { disable: true } },
    placeholder: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=948-13632&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html`
    <zeta-text-input ${spread(args)} .rounded=${args.rounded} .disabled=${args.disabled} .error=${args.error} ?required=${args.required}> </zeta-text-input>
  `
};

export default meta;
