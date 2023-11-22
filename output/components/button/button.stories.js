import "../../index.js";
import { html } from "lit";
const meta = {
    component: "zeta-button",
    args: {
        condensed: false,
        disabled: false,
        rounded: true
    },
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: {
                type: "select"
            }
        },
        flavor: {
            options: ["primary", "negative", "outline", "primary-variant", "outline-subtle", "text", "text-inverse"],
            control: {
                type: "select"
            }
        }
    }
};
export default meta;
export const ButtonWithText = {
    render: args => html `
    <zeta-button size=${args.size} .disabled=${args.disabled} .condensed=${args.condensed} .rounded=${args.rounded} flavor=${args.flavor}>Button</zeta-button>
  `
};
export const ButtonWithTextAndIcon = {
    args: {
        trailingIcon: false
    },
    render: args => {
        return html `<zeta-button
      text=${args.text}
      type=${args.type}
      shape=${args.shape}
      size=${args.size}
      .condensed=${args.condensed}
      .disabled=${args.disabled}
      .trailingIcon=${args.trailingIcon}
      .onClick=${args.onClick}
      name=${args.name}
      text=${args.text}
    >
      <svg slot="icon" viewBox="0 0 48 48">
        <path
          d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"
        />
      </svg>
    </zeta-button>`;
    }
};
//# sourceMappingURL=button.stories.js.map