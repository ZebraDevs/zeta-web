import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTextInput } from "../index.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

//TODO: These are seperate on Figma, should be split here too?
const meta: Meta<ZetaTextInput> = {
  tags: ["autodocs"],
  title: "Text Input",
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
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22751-9848&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export const DateInput: StoryObj<ZetaTextInput> = {
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
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22667-52911&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};
export const TextInputWithAdornments: StoryObj<ZetaTextInput> = {
  name: "Text input with adornments (icons/affixes)",
  args: {
    prefixText: "$",
    suffix: "kg"
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
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=948-13632&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

