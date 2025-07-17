import figma, { html } from "@figma/code-connect/html";
import "../components/badges/status-label/status-label";
import "../components/badges/label/label";
import "../components/badges/tag/tag";
import "../components/badges/priority-pill/priority-pill";
import "../components/badges/indicators/indicators";

// Status Label
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21836-37274", {
  props: {
    status: figma.enum("Status", {
      Info: "info",
      Positive: "positive",
      Warning: "warning",
      Negative: "negative",
      Neutral: "neutral"
    }),
    slot: figma.string("Label"),
    rounded: figma.enum("Style", { Rounded: true }),
    showIcon: figma.enum("Type", { Default: false, Icon: true })
  },
  example: props => html`<zeta-status-label status=${props.status} showIcon=${props.showIcon} rounded=${props.rounded}>${props.slot}</zeta-status-label>`
});

// Label``
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21926-2099&m", {
  props: {
    status: figma.enum("Status", {
      Info: "info",
      Positive: "positive",
      Warning: "warning",
      Negative: "negative",
      Neutral: "neutral"
    }),
    slot: figma.string("Label"),
    rounded: figma.enum("Style", { Rounded: true })
  },
  example: props => html`<zeta-label status=${props.status} rounded=${props.rounded}>${props.slot}</zeta-label>`
});

// Tag
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22000-13170&m", {
  props: {
    slot: figma.string("Label"),
    rounded: figma.enum("Style", { Rounded: true }),
    direction: figma.enum("Direction", { Right: "right", Left: "left" })
  },
  example: props => html`<zeta-tag direction=${props.direction} rounded=${props.rounded}>${props.slot}</zeta-tag>`
});

// Priority Pill
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=24183-10423&", {
  props: {
    slot: figma.string("Label"),
    index: figma.string("Value"),
    status: figma.enum("Status", {
      Urgent: "urgent",
      High: "high",
      Medium: "medium",
      Low: "low"
    }),
    size: figma.enum("Size", { Small: "small", Large: "large" }),
    type: figma.enum("Type", { Badge: "badge", Lozenge: "lozenge" }),
    rounded: figma.enum("Style", { Rounded: true })
  },
  example: props =>
    html`<zeta-priority-pill index=${props.index} status=${props.status} size=${props.size} type=${props.type}>${props.slot}</zeta-priority-pill>`
});

// Icon Indicator
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=24183-9865", {
  props: {
    size: figma.enum("Size", { Small: "small", Medium: "medium", Large: "large" }),
    rounded: figma.enum("Style", { Rounded: true })
  },
  example: props => html`<zeta-icon-indicator size=${props.size} rounded=${props.rounded}>star</zeta-icon-indicator>`
});

// Notification Indicator
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=24183-9734&m", {
  props: {
    size: figma.enum("Size", { Small: "small", Medium: "medium", Large: "large" }),

    slot: figma.string("Value")
  },
  example: props => html`<zeta-notification-indicator size=${props.size}>${props.slot}</zeta-notification-indicator>`
});
