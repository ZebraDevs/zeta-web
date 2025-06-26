import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaIndicator } from "../../../components/badges/badges";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import "../../../components/badges/indicators/indicators";
import "../../../css/styles.css";

describe("zeta-indicator", () => {
  let subject: ZetaIndicator;
  const createComponent = (template = `<zeta-indicator></zeta-indicator>`) => {
    // prettier-ignore
    return fixture<ZetaIndicator>(html`${unsafeStatic(template)}`);
  };
  beforeEach(async () => {
    subject = await createComponent();
  });
  describe("Accessibility", () => {
    ["medium", "large"].forEach(size => {
      ["icon", "notification"].forEach(type => {
        it(`meets contrast requirements for ${type}, ${size}`, async () => {
          subject.setAttribute("type", type);
          subject.setAttribute("size", size);
          if (type === "icon") {
            subject.setAttribute("icon", "star");
          } else {
            subject.setAttribute("text", "5");
          }
          await elementUpdated(subject);

          // Check color contrast between text and background
          const bg = subject.shadowRoot?.querySelector(".container");
          const fg = subject.shadowRoot?.querySelector(type === "icon" ? ".container" : "span");
          if (fg && bg && fg instanceof HTMLElement && bg instanceof HTMLElement) {
            await contrastTest(`Indicator ${type} ${size}`, fg, bg);
          }
        });
        it("meets aria requirements", async () => {
          await expect(subject).to.be.accessible();
          await expect(subject).shadowDom.to.be.accessible();
        });
      });
    });
  });
  describe("Content", () => {
    it("sets the default properties correctly", async () => {
      await expect(subject.type).to.equal("notification");
      await expect(subject.size).to.equal("medium");
      await expect(subject.icon).to.equal(undefined);
      await expect(subject.text).to.equal(undefined);
    });
  });
  describe("Dimensions", () => {
    it("icon, sets the small dimensions correctly", async () => {
      subject.setAttribute("size", "small");
      subject.setAttribute("type", "icon");
      subject.setAttribute("icon", "star");
      await elementUpdated(subject);

      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(12);
      await expect(renderedTotalHeight).to.equal(12);
    });
    it("icon, sets the medium dimensions correctly", async () => {
      subject.setAttribute("size", "medium");
      subject.setAttribute("type", "icon");
      subject.setAttribute("icon", "star");
      await elementUpdated(subject);

      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(16);
      await expect(renderedTotalHeight).to.equal(16);
    });
    it("icon, sets the large dimensions correctly", async () => {
      subject.setAttribute("size", "large");
      subject.setAttribute("type", "icon");
      subject.setAttribute("icon", "star");
      await elementUpdated(subject);

      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(24);
      await expect(renderedTotalHeight).to.equal(24);
    });

    it("notification, sets the small dimensions correctly", async () => {
      subject.setAttribute("size", "small");
      subject.setAttribute("type", "notification");
      subject.setAttribute("icon", "star");
      await elementUpdated(subject);

      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(12);
      await expect(renderedTotalHeight).to.equal(12);
    });
    it("notification, sets the medium dimensions correctly", async () => {
      subject.setAttribute("size", "medium");
      subject.setAttribute("type", "notification");

      await elementUpdated(subject);

      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(16);
      await expect(renderedTotalHeight).to.equal(16);
    });
    it("notification, sets the large dimensions correctly", async () => {
      subject.setAttribute("size", "large");
      subject.setAttribute("type", "notification");

      await elementUpdated(subject);

      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(23);
      await expect(renderedTotalHeight).to.equal(16);
    });
    it("notification, sets the xlarge dimensions correctly", async () => {
      subject.setAttribute("size", "large");
      subject.setAttribute("type", "notification");
      subject.setAttribute("text", "500");
      await elementUpdated(subject);

      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(30);
      await expect(renderedTotalHeight).to.equal(19);
    });
  });
  describe("Styling", () => {
    it("notification, applies the correct style based on 1 digit", async () => {
      subject.setAttribute("type", "notification");
      subject.setAttribute("size", "medium");
      subject.setAttribute("text", "5");
      await elementUpdated(subject);
      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(16);
      await expect(renderedTotalHeight).to.equal(16);
    });
    it("notification, applies the correct style based on 2 digit", async () => {
      subject.setAttribute("type", "notification");
      subject.setAttribute("size", "medium");
      subject.setAttribute("text", "55");
      await elementUpdated(subject);
      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(23);
      await expect(renderedTotalHeight).to.equal(16);
    });

    it("notification, applies the correct style based on 3 digit", async () => {
      subject.setAttribute("type", "notification");
      subject.setAttribute("size", "medium");
      subject.setAttribute("text", "555");
      await elementUpdated(subject);
      const renderedTotalWidth = subject.getBoundingClientRect().width;
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(30);
      await expect(renderedTotalHeight).to.equal(19);

      const span = subject.shadowRoot?.querySelector("span");
      await expect(span?.textContent).to.not.equal("555");
      await expect(span?.textContent).to.equal("99+");
    });
  });
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
