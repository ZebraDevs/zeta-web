import figma, { html } from "@figma/code-connect/html";
import "../components/accordion/accordion-item/accordion-item";

figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=38065-1079", {
  props: {
    rounded: figma.enum("Style", { Rounded: true }),
    expanded: figma.boolean("Open"),
    selectable: figma.boolean("Selectable"),
    slot: figma.instance("Slot Content")
  },
  example: props =>
    html`<zeta-accordion-item selectable=${props.selectable} expanded=${props.expanded} rounded=${props.rounded}>${props.slot}</zeta-accordion-item>`
});
