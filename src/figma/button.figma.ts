import figma, { html } from "@figma/code-connect/html";
import "../components/button/button";
import "../components/button/icon-button/icon-button";

// Button
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23132-166632&", {
  props: {
    slot: figma.string("Label"),
    flavor: figma.enum("Type", {
      Primary: "primary",
      Positive: "positive",
      Negative: "negative",
      Outline: "outline",
      "Outline Subtle": "outline-subtle",
      Text: "text",
      Subtle: "subtle"
    }),
    size: figma.enum("Size", { Small: "small", Medium: "medium", Large: "large" }),
    shape: figma.enum("Shape", { "Full Rounded": "full", Rounded: "rounded", Sharp: "sharp" }),
    leadingIcon: figma.instance("Icon Left"),
    trailingIcon: figma.instance("Icon Right"),
    disabled: figma.enum("Status", { Disabled: true })
  },
  example: props => html`<zeta-button flavor=${props.flavor} size=${props.size} shape=${props.shape} disabled=${props.disabled}>${props.slot}</zeta-button>`
});

// Icon Button
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23132-166001", {
  props: {
    flavor: figma.enum("Type", {
      Primary: "primary",
      Positive: "positive",
      Negative: "negative",
      Outline: "outline",
      "Outline Subtle": "outline-subtle",
      Text: "text",
      Subtle: "subtle"
    }),
    size: figma.enum("Size", { Small: "small", Medium: "medium", Large: "large" }),
    shape: figma.enum("Shape", { "Full Rounded": "full", Rounded: "rounded", Sharp: "sharp" }),
    disabled: figma.enum("Status", { Disabled: true })
  },
  example: props => html`<zeta-icon-button flavor=${props.flavor} size=${props.size} shape=${props.shape} disabled=${props.disabled}></zeta-icon-button>`
});
