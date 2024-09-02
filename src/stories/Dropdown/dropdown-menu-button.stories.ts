import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDropdownMenuButton } from "../../components/dropdown/dropdown-menu/dropdown-menu-button.js";

const items1 = [
  { label: "Item 1", icon: "star" },
  { label: "Item 2", icon: "star" },
  { label: "Item 3", icon: "star" }
];

const items2 = [
  { label: "Item 1", icon: "star" },
  { label: "Item 2", icon: "star" },
  { label: "Item 3", icon: "star" }
];

const items3 = [
  { label: "Item 1", icon: "star", checked: true },
  { label: "Item 2", icon: "star" },
  { label: "Item 3", icon: "star" }
];

const staticArgTypes = {
  items: { table: { disable: true } },
  type: { table: { disable: true } },
  name: { table: { disable: true } },
  autoComplete: { table: { disable: true } },
  autoCapitalize: { table: { disable: true } },
  id: { table: { disable: true } },
  required: { table: { disable: true } },
  value: { table: { disable: true } },
  checked: { table: { disable: true } },
  indeterminate: { table: { disable: true } },
  placeholder: { table: { disable: true } },
  readOnly: { table: { disable: true } },
  spellCheck: { table: { disable: true } },
  disabled: { table: { disable: true } },
  size: { table: { disable: true } },
  checkValidity: { table: { disable: true } },
  reportValidity: { table: { disable: true } },
  validity: { table: { disable: true } },
  validationMessage: { table: { disable: true } }
};

const meta: Meta<ZetaDropdownMenuButton> = {
  component: "zeta-dropdown-menu-button",
  title: "Dropdown",
  args: {
    rounded: true,
    flavor: "primary",
    open: false,
    direction: undefined,
    slot: "Dropdown Menu"
  },
  argTypes: {
    flavor: {
      options: ["primary", "secondary", "positive", "negative", "outline", "outline-subtle", "text"],
      control: {
        type: "select"
      }
    },
    direction: {
      options: ["left", "right", "bottom", "top", undefined],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22391-10146&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const DropdownMenuButton: StoryObj<ZetaDropdownMenuButton> = {
  argTypes: staticArgTypes,
  render: args => html`
    <div style="display: flex;">
      <div style="padding: 30px">
        <h4>Small - Default</h4>
        <form
          id="form"
          @submit=${(ev: Event) => {
            ev.preventDefault();
            console.log("Submit", ev);
            const data = new FormData(ev.target as HTMLFormElement);
            console.log(Object.fromEntries(data));
          }}
          @reset=${(e: Event) => {
            console.error("Form reset", e);
          }}
        >
          <zeta-dropdown-menu-button
            name="dropdown-menu1"
            .size=${"small"}
            ?rounded=${args.rounded}
            .flavor=${args.flavor}
            .type=${"text-dropdown"}
            .items=${items1}
            ?open=${args.open}
            .direction=${args.direction}
          >
            ${args.slot}
          </zeta-dropdown-menu-button>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div style="padding: 30px">
        <h4>Medium - Checkboxes</h4>
        <form
          id="form"
          @submit=${(ev: Event) => {
            ev.preventDefault();
            console.log("Submit", ev);
            const data = new FormData(ev.target as HTMLFormElement);
            console.log(Object.fromEntries(data));
          }}
          @reset=${(e: Event) => {
            console.error("Form reset", e);
          }}
        >
          <zeta-dropdown-menu-button
            name="dropdown-menu2"
            .size=${"medium"}
            ?rounded=${args.rounded}
            .flavor=${args.flavor}
            .type=${"checkbox-dropdown"}
            .items=${items2}
            ?open=${args.open}
            .direction=${args.direction}
          >
            ${args.slot}
          </zeta-dropdown-menu-button>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div style="padding: 30px">
        <h4>Large - Radios</h4>
        <form
          id="form"
          @submit=${(ev: Event) => {
            ev.preventDefault();
            console.log("Submit", ev);
            const data = new FormData(ev.target as HTMLFormElement);
            console.log(Object.fromEntries(data));
          }}
          @reset=${(e: Event) => {
            console.error("Form reset", e);
          }}
        >
          <zeta-dropdown-menu-button
            name="dropdown-menu3"
            .size=${"large"}
            ?rounded=${args.rounded}
            .flavor=${args.flavor}
            .type=${"radio-dropdown"}
            .items=${items3}
            ?open=${args.open}
            .direction=${args.direction}
          >
            ${args.slot}
          </zeta-dropdown-menu-button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  `
};
