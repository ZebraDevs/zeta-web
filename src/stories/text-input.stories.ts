import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTextInput } from "../components/text-input/text-input.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { html } from "lit";
import { spreadGenerator } from "./utils.js";
const spread = spreadGenerator(ZetaTextInput);

//TODO: These are seperate on Figma, should be split here too?
const meta: Meta<ZetaTextInput> = {
  tags: ["autodocs"],
  title: "Text Input",
  component: "zeta-text-input",
  args: {
    value: "",
    label: "Label",
    hintText: "hint",
    error: false,
    disabled: false,
    errorText: "Error!",
    rounded: true,
    required: false,
    prefix: "",
    suffix: ""
  },
  argTypes: {
    type: {
      options: ["text", "textarea", "password", "time", "date"],
      control: {
        type: "select"
      }
    },
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
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23116-92946&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};
// console.log('Text-Input attributes:', ZetaTextInput.elementProperties);

export const TextInput: StoryObj<ZetaTextInput> = {
  name: "Default text input"
};

export const EmptyTextInput: StoryObj<ZetaTextInput> = {
  name: "Empty",
  render: _args => html` <zeta-text-input> </zeta-text-input> `
};

export const TimeInput: StoryObj = {
  name: "Time input",
  args: {
    type: "time"
  },
  argTypes: {
    hintText: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22751-9848&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  },
  render: args => html` <zeta-text-input ${spread(args)}> </zeta-text-input> `
};

export const DateInput: StoryObj = {
  name: "Date input",
  args: {
    type: "date"
  },
  argTypes: {
    hintText: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22667-52911&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  },
  render: args => html` <zeta-text-input ${spread(args)}> </zeta-text-input> `
};

export const TextArea: StoryObj = {
  name: "Text area field",
  args: {
    type: "textarea"
  },
  argTypes: {
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  render: args => html` <zeta-text-input ${spread(args)}> </zeta-text-input> `
};

export const PasswordField: StoryObj = {
  name: "Password field",
  args: {
    type: "password"
  },
  argTypes: {
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=948-13632&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html` <zeta-text-input ${spread(args)}> </zeta-text-input> `
};

export default meta;
