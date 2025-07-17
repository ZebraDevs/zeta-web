import figma, { html } from "@figma/code-connect/html";
import "../components/accordion/accordion";

figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=38101-167213", {
  props: {
    rounded: figma.enum("Style", { Rounded: true }),
    inCard: figma.boolean("In Card")
  },
  example: props => html`<zeta-accordion rounded=${props.rounded} inCard=${props.inCard}></zeta-accordion>`
});
