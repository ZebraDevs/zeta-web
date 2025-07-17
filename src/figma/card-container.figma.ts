import figma, { html } from "@figma/code-connect/html";
import "../components/card/card-container/card-container";

// Card Container Collapsible
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=37677-16137", {
  props: {
    rounded: figma.enum("Style", { Rounded: true }),
    ai: figma.enum("Type", { AI: true }),
    expanded: figma.boolean("Open"),
    required: figma.boolean("Required"),
    title: figma.string("Title"),
    description: figma.string("Description"),
    slot: figma.instance("Slot Content")
  },
  example: props =>
    html`<zeta-card-container
      collapsible
      rounded=${props.rounded}
      ai=${props.ai}
      expanded=${props.expanded}
      required=${props.required}
      title=${props.title}
      description=${props.description}
    >
      ${props.slot}
    </zeta-card-container>`
});

// Card Container
figma.connect("https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=37677-16210", {
  props: {
    ai: figma.enum("Type", { AI: true }),
    title: figma.string("Title"),
    description: figma.string("Description"),
    slot: figma.instance("Slot Content")
  },
  example: props =>
    html`<zeta-card-container rounded ai=${props.ai} title=${props.title} description=${props.description}> ${props.slot} </zeta-card-container>`
});
