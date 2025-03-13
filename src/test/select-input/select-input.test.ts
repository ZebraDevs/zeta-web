import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaSelectInput } from "../../components/select-input/select-input";
import { type ZetaIcon } from "../../components/icon/icon";
import type { ZetaOption } from "../../components/select-input/option";
import "../../components/icon/icon";
import "../../components/select-input/select-input";
import "../../components/select-input/option";

import "../../index.css";

describe("zeta-select-input", () => {
  let subject: ZetaSelectInput;

  const createComponent = (
    template = `<zeta-select-input label="Label" required hintText="Hint Text" icon="star">
    <zeta-option value="1">Option 1</zeta-option>
    <zeta-option value="2">Option 2</zeta-option>
    <zeta-option value="3">Option 3</zeta-option>
    <zeta-option value="4">Option 4</zeta-option>
    <zeta-option value="5">Option 5</zeta-option>
    <zeta-option value="6">Option 6</zeta-option>
    </zeta-select-input>`
  ) => {
    // prettier-ignore
    return fixture<ZetaSelectInput>(html`${unsafeStatic(template)}`);
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
    it("renders a label", async () => {
      const label = subject.shadowRoot?.querySelector(".label label");
      expect(label).to.exist;
      await expect(label?.textContent).to.equal("Label");
    });

    it("renders required", async () => {
      const required = subject.shadowRoot?.querySelector(".label .required");
      expect(required).to.exist;
      await expect(required?.textContent).to.equal("*");
    });

    it("renders a hint", async () => {
      const hintText = subject.shadowRoot?.querySelector(".hint .hint-text");
      expect(hintText).to.exist;
      await expect(hintText?.textContent).to.equal("Hint Text");

      const hintIcon = subject.shadowRoot?.querySelector(".hint .hint-icon") as ZetaIcon;
      expect(hintIcon).to.exist;
      await expect(hintIcon?.textContent).to.equal("info");
    });

    it("renders a select input", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      expect(input).to.exist;

      const inputChildren = Array.from(input?.children || []);

      await expect((inputChildren[0] as ZetaIcon).textContent).to.equal("star");
      await expect((inputChildren[1] as ZetaIcon).textContent).to.equal("expand_more");
      expect(input?.textContent).to.include("Select an option");
    });

    it("renders a hidden options div", async () => {
      const options = subject.shadowRoot?.querySelector(".options");
      expect(options).to.exist;
      expect(options?.classList.contains("open")).to.be.false;
      const style = window.getComputedStyle(options as HTMLElement);
      await expect(style.display).to.equal("none");
    });
  });

  describe("Dimensions", () => {
    it("renders the options box with the same width as the input", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const options = subject.shadowRoot?.querySelector(".options");

      expect(input).to.exist;
      expect(options).to.exist;

      (input as HTMLElement).click();
      await subject.updateComplete;

      const inputWidth = input?.getBoundingClientRect().width;
      const optionsWidth = options?.getBoundingClientRect().width;

      const optionsMargin = 2;
      await expect(inputWidth).to.equal((optionsWidth ?? 0) + optionsMargin);
    });

    it("renders the options box with the correct height", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const options = subject.shadowRoot?.querySelector(".options");

      expect(input).to.exist;
      expect(options).to.exist;

      (input as HTMLElement).click();
      await subject.updateComplete;

      const optionsHeight = options?.getBoundingClientRect().height;
      await expect(optionsHeight).to.equal(200);
    });
  });

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("renders the options box on input click", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const options = subject.shadowRoot?.querySelector(".options");

      expect(input).to.exist;
      expect(options).to.exist;

      (input as HTMLElement).click();
      await subject.updateComplete;

      expect(subject.open).to.be.true;
      const style = window.getComputedStyle(options as HTMLElement);
      await expect(style.display).to.equal("block");
    });

    it("renders the options box on input space key press", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const options = subject.shadowRoot?.querySelector(".options");

      expect(input).to.exist;
      expect(options).to.exist;

      const event = new KeyboardEvent("keydown", { key: " ", bubbles: true, composed: true });
      (input as HTMLElement).dispatchEvent(event);
      await subject.updateComplete;

      expect(subject.open).to.be.true;
      const style = window.getComputedStyle(options as HTMLElement);
      await expect(style.display).to.equal("block");
    });

    it("closes the options box on outside click", () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const options = subject.shadowRoot?.querySelector(".options");

      expect(input).to.exist;
      expect(options).to.exist;

      (input as HTMLElement).click();
      expect(subject.open).to.be.true;

      document.body.click();
      expect(subject.open).to.be.false;
    });

    it("closes the options box on input click", () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const options = subject.shadowRoot?.querySelector(".options");

      expect(input).to.exist;
      expect(options).to.exist;

      (input as HTMLElement).click();
      expect(subject.open).to.be.true;

      (input as HTMLElement).click();
      expect(subject.open).to.be.false;
    });

    it("closes the options box on input space key press", () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const options = subject.shadowRoot?.querySelector(".options");

      expect(input).to.exist;
      expect(options).to.exist;

      const event = new KeyboardEvent("keydown", { key: " ", bubbles: true, composed: true });
      (input as HTMLElement).dispatchEvent(event);
      expect(subject.open).to.be.true;

      (input as HTMLElement).dispatchEvent(event);
      expect(subject.open).to.be.false;
    });

    it("sets the selected option on option click", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const optionsContainer = subject.shadowRoot?.querySelector(".options") as HTMLSlotElement;
      const options = optionsContainer.assignedElements({ flatten: true }) as ZetaOption[];

      expect(input).to.exist;
      expect(optionsContainer).to.exist;

      (input as HTMLElement).click();
      expect(subject.open).to.be.true;

      (options[0].shadowRoot?.querySelector(".option") as HTMLElement).click();

      expect(subject.open).to.be.false;
      await expect(subject.value).to.equal("1");
    });

    it("sets the selected option on option space key press", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const optionsContainer = subject.shadowRoot?.querySelector(".options") as HTMLSlotElement;
      const options = optionsContainer.assignedElements({ flatten: true }) as ZetaOption[];

      expect(input).to.exist;
      expect(optionsContainer).to.exist;

      const event = new KeyboardEvent("keydown", { key: " ", bubbles: true, composed: true });
      (input as HTMLElement).dispatchEvent(event);
      expect(subject.open).to.be.true;

      (options[0].shadowRoot?.querySelector(".option") as HTMLElement).dispatchEvent(event);

      expect(subject.open).to.be.false;
      await expect(subject.value).to.equal("1");
    });

    it("doesn't deselect the selected option on option click", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const optionsContainer = subject.shadowRoot?.querySelector(".options") as HTMLSlotElement;
      const options = optionsContainer.assignedElements({ flatten: true }) as ZetaOption[];

      expect(input).to.exist;
      expect(optionsContainer).to.exist;

      (input as HTMLElement).click();
      expect(subject.open).to.be.true;

      (options[0].shadowRoot?.querySelector(".option") as HTMLElement).click();

      expect(subject.open).to.be.false;
      await expect(subject.value).to.equal("1");

      (input as HTMLElement).click();
      expect(subject.open).to.be.true;

      (options[0].shadowRoot?.querySelector(".option") as HTMLElement).click();

      expect(subject.open).to.be.false;
      await expect(subject.value).to.equal("1");
    });

    it("doesn't deselect the selected option on option space key press", async () => {
      const input = subject.shadowRoot?.querySelector(".input");
      const optionsContainer = subject.shadowRoot?.querySelector(".options") as HTMLSlotElement;
      const options = optionsContainer.assignedElements({ flatten: true }) as ZetaOption[];

      expect(input).to.exist;
      expect(optionsContainer).to.exist;

      const event = new KeyboardEvent("keydown", { key: " ", bubbles: true, composed: true });
      (input as HTMLElement).dispatchEvent(event);
      expect(subject.open).to.be.true;

      (options[0].shadowRoot?.querySelector(".option") as HTMLElement).dispatchEvent(event);

      expect(subject.open).to.be.false;
      await expect(subject.value).to.equal("1");

      (input as HTMLElement).dispatchEvent(event);
      expect(subject.open).to.be.true;

      (options[0].shadowRoot?.querySelector(".option") as HTMLElement).dispatchEvent(event);

      expect(subject.open).to.be.true;
      await expect(subject.value).to.equal("1");
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
