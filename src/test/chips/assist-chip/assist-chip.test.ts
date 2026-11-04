import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaAssistChip } from "../../../index.js";
import "../../../index.js";
import { disableShadowDOMTransitions, getCssVarColorValue } from "../../utils.js";

const labelText = "Label";
const icon = "star";

describe("zeta-assist-chip", () => {
  let subject: ZetaAssistChip;

  const createComponent = (template = `<zeta-assist-chip icon=${icon}>${labelText}</zeta-assist-chip>`) => {
    // prettier-ignore
    return fixture<ZetaAssistChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the correct text on the chip", () => {
      expect(subject.lastChild?.nodeValue).to.equal(labelText);
    });

    it("displays the correct icon", () => {
      const iconElement = subject.shadowRoot?.querySelector("zeta-icon");
      expect(iconElement?.textContent).to.equal(icon);
    });
    it("is not draggable by default", () => {
      expect(subject.draggable).to.be.false;
      expect(subject.hasAttribute("draggable")).to.be.false;
    });

    it("reflects draggable as draggable=\"true\"", async () => {
      subject.draggable = true;
      await elementUpdated(subject);
      expect(subject.getAttribute("draggable")).to.equal("true");
    });

    it("treats a bare draggable attribute as draggable", async () => {
      const el = await createComponent(`<zeta-assist-chip draggable>${labelText}</zeta-assist-chip>`);
      expect(el.draggable).to.be.true;
      expect(el.getAttribute("draggable")).to.equal("true");
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("defaults to the neutral color", () => {
      expect(subject.color).to.equal("neutral");
      const container = subject.shadowRoot!.querySelector(".container")!;
      expect(getComputedStyle(container).color).to.equal(getCssVarColorValue(container, "--interactive-neutral-foreground-default"));
    });

    it("uses the feedback colors for a color variant", async () => {
      subject.color = "red";
      await elementUpdated(subject);
      const container = subject.shadowRoot!.querySelector(".container")!;
      expect(getComputedStyle(container).color).to.equal(getCssVarColorValue(container, "--feedback-error-foreground"));
    });

    it("respects the foreground override custom property", async () => {
      subject.color = "red";
      subject.style.setProperty("--assist-chip-foreground-color", "rgb(1, 2, 3)");
      await elementUpdated(subject);
      const container = subject.shadowRoot!.querySelector(".container")!;
      expect(getComputedStyle(container).color).to.equal("rgb(1, 2, 3)");
    });
    it("uses the pressed background while dragging", async () => {
      disableShadowDOMTransitions(subject);
      subject.draggable = true;
      subject.dispatchEvent(new DragEvent("dragstart", { dataTransfer: new DataTransfer() }));
      await elementUpdated(subject);
      const container = subject.shadowRoot!.querySelector(".container")!;
      expect(getComputedStyle(container).backgroundColor).to.equal(getCssVarColorValue(container, "--interactive-neutral-background-pressed"));
    });
  });

  describe("Interaction", () => {
    it("disables the inner button when disabled", async () => {
      subject.disabled = true;
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector("button")?.disabled).to.be.true;
    });
    const dispatchDrag = (type: "dragstart" | "dragend") => {
      const event = new DragEvent(type, { bubbles: true, cancelable: true, composed: true, dataTransfer: new DataTransfer() });
      subject.dispatchEvent(event);
      return event;
    };

    it("marks the chip as dragging between dragstart and dragend", async () => {
      subject.draggable = true;
      dispatchDrag("dragstart");
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector(".container")?.classList.contains("dragging")).to.be.true;

      dispatchDrag("dragend");
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector(".container")?.classList.contains("dragging")).to.be.false;
    });

    it("sets the label as text/plain drag data", () => {
      subject.draggable = true;
      const event = dispatchDrag("dragstart");
      expect(event.dataTransfer?.getData("text/plain")).to.equal(labelText);
    });

    it("cancels dragging when disabled", async () => {
      subject.draggable = true;
      subject.disabled = true;
      const event = dispatchDrag("dragstart");
      await elementUpdated(subject);
      expect(event.defaultPrevented).to.be.true;
      expect(subject.shadowRoot?.querySelector(".container")?.classList.contains("dragging")).to.be.false;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
