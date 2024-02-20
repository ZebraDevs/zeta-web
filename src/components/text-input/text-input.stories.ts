import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTextInput } from "./text-input.js";
import "./text-input.js";

const meta: Meta<ZetaTextInput> = {
  component: "zeta-text-input",
  args: {
    value: "Typing",
    placeholder: "Placeholder",
    hintText: "hint",
    error: false,
    disabled: false,
    errorText: "Error!"
  },
  argTypes: {
    icon: {
      table: {
        disable: true
      }
    }
  }
};

export const TextInput: StoryObj<ZetaTextInput> = {
  name: "Default text input",
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "inline-radio" }
    }
  }
};

export const TimeInput: StoryObj<ZetaTextInput> = {
  name: "Time input",
  args: {
    type: "time",
    disabled: false,
    error: false,
    required: false,
    label: "",
    hintText: ""
  },
  argTypes: {
    type: {
      table: {
        disable: true
      }
    }
  }
};

export const DataInput: StoryObj<ZetaTextInput> = {
  name: "Date input",
  args: {
    type: "date",
    disabled: false,
    error: false,
    required: false,
    label: "",
    hintText: ""
  },
  argTypes: {
    type: {
      table: {
        disable: true
      }
    }
  }
};

export const TextInputWithAdornments: StoryObj<ZetaTextInput> = {
  name: "Text input with adornments (icons/affixes)",
  args: {
    icon: "star",
    prefixText: "$",
    suffix: "kg"
  },
  argTypes: {
    iconPosition: {
      options: ["left", "right"],
      control: { type: "select" }
    }
  }
};

export const TextInputWithLabelAndHinText: StoryObj<ZetaTextInput> = {
  name: "Text input with label and hint text",
  args: {
    label: "Label",
    hintText: "Default hint text"
  }
};

export const TextInputStates: StoryObj<ZetaTextInput> = {
  name: "Text input disabled and error state",
  args: {
    error: false,
    disabled: false,
    required: false,
    label: "Label",
    hintText: "Hint text"
  }
};

export const TextArea: StoryObj<ZetaTextInput> = {
  name: "Text area field",
  args: {
    error: false,
    disabled: false,
    required: false,
    label: "Label",
    hintText: "Hint text",
    type: "textarea"
  },
  argTypes: {
    type: {
      table: {
        disable: true
      }
    }
  }
};

export const PasswordField: StoryObj<ZetaTextInput> = {
  name: "Password field",
  args: {
    error: false,
    disabled: false,
    required: false,
    label: "Label",
    hintText: "Hint text",
    type: "password"
  },
  argTypes: {
    type: {
      table: {
        disable: true
      }
    }
  }
};

export default meta;
