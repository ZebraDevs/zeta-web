import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaFilterChip } from "../../../index.js";
import "../../../index.js";
import { disableShadowDOMTransitions, getCssVarColorValue } from "../../utils.js";

const labelText = "Label";

describe("zeta-filter-chip", () => {
  let subject: ZetaFilterChip;

  const createComponent = (template = `<zeta-filter-chip>${labelText}</zeta-filter-chip>`) => {
    // prettier-ignore
    return fixture<ZetaFilterChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("exposes the active state via aria-pressed", async () => {
      const button = subject.shadowRoot?.querySelector("button");
      expect(button?.getAttribute("aria-pressed")).to.equal("false");

      subject.active = true;
      await elementUpdated(subject);
      expect(button?.getAttribute("aria-pressed")).to.equal("true");
    });
  });

  describe("Content", () => {
    it("sets the correct text on the chip", () => {
      expect(subject.lastChild?.nodeValue).to.equal(labelText);
    });

    it("shows the check icon when active", async () => {
      subject.active = true;
      await elementUpdated(subject);

      const iconElement = subject.shadowRoot?.querySelector("zeta-icon");

      expect(iconElement).to.exist;
      expect(iconElement?.textContent).to.equal("check_mark");
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
      const el = await createComponent(`<zeta-filter-chip draggable>${labelText}</zeta-filter-chip>`);
      expect(el.draggable).to.be.true;
      expect(el.getAttribute("draggable")).to.equal("true");
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("uses the neutral palette when inactive", () => {
      const container = subject.shadowRoot!.querySelector(".container")!;
      const style = getComputedStyle(container);
      expect(style.backgroundColor).to.equal(getCssVarColorValue(container, "--interactive-neutral-background-default"));
      expect(style.color).to.equal(getCssVarColorValue(container, "--interactive-neutral-foreground-default"));
    });

    it("uses the inverse palette when active", async () => {
      disableShadowDOMTransitions(subject);
      subject.active = true;
      await elementUpdated(subject);

      const container = subject.shadowRoot!.querySelector(".container")!;
      const style = getComputedStyle(container);
      expect(style.backgroundColor).to.equal(getCssVarColorValue(container, "--interactive-inverse-background-selected"));
      expect(style.color).to.equal(getCssVarColorValue(container, "--interactive-inverse-foreground-default"));
    });

    it("uses the disabled palette when active and disabled", async () => {
      disableShadowDOMTransitions(subject);
      subject.active = true;
      subject.disabled = true;
      await elementUpdated(subject);

      const container = subject.shadowRoot!.querySelector(".container")!;
      const style = getComputedStyle(container);
      expect(style.backgroundColor).to.equal(getCssVarColorValue(container, "--interactive-neutral-background-disabled"));
      expect(style.color).to.equal(getCssVarColorValue(container, "--interactive-neutral-foreground-disabled"));
    });
    it("uses the pressed background while dragging", async () => {
      disableShadowDOMTransitions(subject);
      subject.draggable = true;
      subject.dispatchEvent(new DragEvent("dragstart", { dataTransfer: new DataTransfer() }));
      await elementUpdated(subject);
      const container = subject.shadowRoot!.querySelector(".container")!;
      expect(getComputedStyle(container).backgroundColor).to.equal(getCssVarColorValue(container, "--interactive-neutral-background-pressed"));
    });

    it("keeps the active background while dragging an active chip", async () => {
      disableShadowDOMTransitions(subject);
      subject.active = true;
      subject.draggable = true;
      subject.dispatchEvent(new DragEvent("dragstart", { dataTransfer: new DataTransfer() }));
      await elementUpdated(subject);
      const container = subject.shadowRoot!.querySelector(".container")!;
      expect(getComputedStyle(container).backgroundColor).to.equal(getCssVarColorValue(container, "--interactive-inverse-background-selected"));
    });
  });

  describe("Interaction", () => {
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
