import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTextInput } from "../../components/text-input/text-input.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { html, nothing } from "lit";
import { spreadGenerator } from "../utils.js";
import { fn } from "@storybook/test";

// Omitting label, hintText and errorText from spread as they are handled as slots, and not attributes/properties. This is because of the complexity of handling them as both attributes and slots, and the fact that they are not commonly used as attributes in the codebase, but rather as slots.
const spread = spreadGenerator(ZetaTextInput, ["label", "hintText", "errorText"]);

type InputStory = ZetaTextInput;
//TODO: These are seperate on Figma, should be split here too?
const meta: Meta<InputStory> = {
  tags: ["autodocs"],
  title: "Components/Text Input",
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
    suffix: "",
    onchange: fn(),
    oninput: fn(),
    onfocus: fn(),
    onblur: fn()
  },
  argTypes: {
    type: {
      options: ["text", "textarea", "password", "time", "date", "number", "integer"],
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

export const TextInput: StoryObj<InputStory> = {
  name: "Default text input",
  render: ({ oninput, onchange, onblur, onfocus, ...args }) =>
    html`<div style="width: 200px; height: 400px;">
      <zeta-text-input @change=${onchange} @input=${oninput} @blur=${onblur} @focus=${onfocus} ${spread(args)}>
        ${args.label ? html`<span slot="label">${args.label}</span>` : nothing} ${args.hintText ? html`<span slot="hint">${args.hintText}</span>` : nothing}
        ${args.errorText ? html`<span slot="error">${args.errorText}</span>` : nothing}
      </zeta-text-input>
    </div>`
};

export const EmptyTextInput: StoryObj<InputStory> = {
  name: "Empty",
  render: _args => html` <zeta-text-input> </zeta-text-input> `
};

export const TimeInput: StoryObj<InputStory> = {
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
      type: "designPending"
    }
  },
  render: TextInput.render
};

export const DateInput: StoryObj<InputStory> = {
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
      type: "designPending"
    }
  },
  render: TextInput.render
};

export const TextArea: StoryObj<InputStory> = {
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
  render: TextInput.render
};

export const PasswordField: StoryObj<InputStory> = {
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
      type: "designPending"
    }
  },
  render: TextInput.render
};

export default meta;
