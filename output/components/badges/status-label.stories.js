import "./status-label.js";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
const meta = {
    component: "zeta-status-label",
    args: {
        rounded: true,
        condensed: false,
        status: "neutral",
        text: "Label"
    },
    argTypes: {
        status: {
            options: ["neutral", "info", "positive", "warning", "negative"],
            control: {
                type: "select"
            }
        }
    }
};
export default meta;
export const StatusLabel = {};
export const StatusLabelWithIcon = {
    render: args => html `
    <zeta-status-label .rounded=${args.rounded} .condensed=${args.condensed} status=${ifDefined(args.status)} text=${ifDefined(args.text)}>
      <div slot="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <g clip-path="url(#clip0_783_6851)">
            <path
              d="M10 14.3917L13.4583 16.4833C14.0917 16.8667 14.8667 16.3 14.7 15.5833L13.7833 11.65L16.8417 9C17.4 8.51666 17.1 7.6 16.3667 7.54167L12.3417 7.2L10.7667 3.48333C10.4833 2.80833 9.51667 2.80833 9.23333 3.48333L7.65833 7.19166L3.63333 7.53333C2.9 7.59166 2.6 8.50833 3.15833 8.99166L6.21667 11.6417L5.3 15.575C5.13333 16.2917 5.90833 16.8583 6.54167 16.475L10 14.3917Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_783_6851">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </zeta-status-label>
  `
};
//# sourceMappingURL=status-label.stories.js.map