import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaOption } from "../../components/select-input/option";
import type { ZetaOptionClickEventDetail } from "../../events.js";
import "../../components/select-input/option";

import "../../index.css";

describe("zeta-option", () => {
  let subject: ZetaOption;

  const createComponent = (template = `<zeta-option value="1">Option 1</zeta-option>`) => {
    // prettier-ignore
    return fixture<ZetaOption>(html`${unsafeStatic(template)}`);
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
    it("renders the option text wrapped in option-text part", () => {
      const optionText = subject.shadowRoot?.querySelector("[part='option-text']");
      expect(optionText).to.exist;
    });

    it("renders the slot inside option-text part", () => {
      const optionText = subject.shadowRoot?.querySelector("[part='option-text']");
      const slot = optionText?.querySelector("slot");
      expect(slot).to.exist;
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("dispatches a zeta-option-click event on click", () => {
      let fired = false;
      subject.addEventListener("zeta-option-click", () => (fired = true));

      (subject.shadowRoot?.querySelector(".option") as HTMLElement).click();

      expect(fired).to.be.true;
    });

    it("dispatches a zeta-option-click event with the correct value", async () => {
      let detail: ZetaOptionClickEventDetail | undefined;
      subject.addEventListener("zeta-option-click", (e: Event) => (detail = (e as CustomEvent<ZetaOptionClickEventDetail>).detail));

      (subject.shadowRoot?.querySelector(".option") as HTMLElement).click();

      await expect(detail?.value).to.equal("1");
    });

    it("dispatches a zeta-option-click event on space key press", () => {
      let fired = false;
      subject.addEventListener("zeta-option-click", () => (fired = true));

      const event = new KeyboardEvent("keydown", { key: " ", bubbles: true, composed: true });
      (subject.shadowRoot?.querySelector(".option") as HTMLElement).dispatchEvent(event);

      expect(fired).to.be.true;
    });

    it("dispatches a zeta-option-click event on enter key press", () => {
      let fired = false;
      subject.addEventListener("zeta-option-click", () => (fired = true));

      const event = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, composed: true });
      (subject.shadowRoot?.querySelector(".option") as HTMLElement).dispatchEvent(event);

      expect(fired).to.be.true;
    });

    it("does not dispatch a zeta-option-click event when disabled", async () => {
      subject = await createComponent(`<zeta-option value="1" disabled>Option 1</zeta-option>`);

      let fired = false;
      subject.addEventListener("zeta-option-click", () => (fired = true));

      (subject.shadowRoot?.querySelector(".option") as HTMLElement).click();

      expect(fired).to.be.false;
    });

    it("does not dispatch a zeta-option-click event on key press when disabled", async () => {
      subject = await createComponent(`<zeta-option value="1" disabled>Option 1</zeta-option>`);

      let fired = false;
      subject.addEventListener("zeta-option-click", () => (fired = true));

      const event = new KeyboardEvent("keydown", { key: " ", bubbles: true, composed: true });
      (subject.shadowRoot?.querySelector(".option") as HTMLElement).dispatchEvent(event);

      expect(fired).to.be.false;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
