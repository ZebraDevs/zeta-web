import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaCardContainer } from "../../components/card/card-container/card-container.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner";
import "../../components/card/card-container/card-container.js";
import { disableShadowDOMTransitions, getCssVarColorValue } from "../utils.js";
import "../../css/styles.css";
describe("zeta-card-container", () => {
  let subject: ZetaCardContainer;

  const createComponent = (
    template = `
    <div>
    <style>
      zeta-card-container {
        transition: none !important;
        width: 528px;
        max-width: 528px;
        display: block;
      }
      
    </style>
    <zeta-card-container ><div style='color: var(--main-default); width: 480px; height: 240px'>Placeholder</div></zeta-card-container>
    
    </div>`
  ) => {
    // prettier-ignore
    return fixture<ZetaCardContainer>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    const all = await createComponent();
    subject = all.querySelector("zeta-card-container") as ZetaCardContainer;

    // Disable transitions in the shadow DOM after component is created
    if (subject && subject.shadowRoot) {
      disableShadowDOMTransitions(subject);
    }
  });

  describe("Accessibility", () => {
    it("has proper contrast for title and description", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      await subject.updateComplete;

      await contrastTest(
        "Card Container title",
        subject.shadowRoot?.querySelector(".card-title") as HTMLElement,
        subject.shadowRoot?.querySelector(".card") as HTMLElement
      );
      await contrastTest(
        "Card Container description",
        subject.shadowRoot?.querySelector(".card-description") as HTMLElement,
        subject.shadowRoot?.querySelector(".card") as HTMLElement
      );
    });

    it("meets aria requirements", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders title and description", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      await subject.updateComplete;

      const title = subject.shadowRoot?.querySelector(".card-title");
      const description = subject.shadowRoot?.querySelector(".card-description");

      expect(title).to.exist;
      await expect(title?.textContent).to.equal("Title");
      expect(description).to.exist;
      await expect(description?.textContent).to.equal("Description");
    });

    it("defaults to collapsed, hides content", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      subject.setAttribute("collapsible", "true");

      await subject.updateComplete;

      const contentWrapper = subject.shadowRoot?.querySelector(".card-content");
      expect(contentWrapper).to.exist;
      await expect(getComputedStyle(contentWrapper as Element).height).to.equal("0px");
    });

    it("expanded shows content", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      subject.setAttribute("collapsible", "true");
      subject.setAttribute("expanded", "true");

      await subject.updateComplete;

      const contentWrapper = subject.shadowRoot?.querySelector(".card-content");
      expect(contentWrapper).to.exist;
      await expect(getComputedStyle(contentWrapper as Element).height).to.be.not.equal("0");
    });
  });

  describe("Dimensions", () => {
    it("sets dimensions correctly", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      subject.setAttribute("ai", "true");
      subject.setAttribute("collapsible", "true");

      await subject.updateComplete;

      const rect = subject.getBoundingClientRect();
      await expect(rect.width).equal(528);
      await expect(rect.height).to.equal(93);
    });

    it("sets dimensions correctly with content", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      subject.setAttribute("ai", "true");

      await subject.updateComplete;

      const rect = subject.getBoundingClientRect();
      await expect(rect.width).equal(528);
      await expect(rect.height).to.equal(349);
    });
  });

  describe("Styling", () => {
    it("shows a red asterisk when required is true", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      subject.setAttribute("required", "true");

      await subject.updateComplete;

      const asterisk = subject.shadowRoot?.querySelector(".required");
      expect(asterisk).to.exist;
      expect(asterisk?.textContent).to.contain("*");
      const style = getComputedStyle(asterisk as Element);

      await expect(style.color).to.equal(getCssVarColorValue(subject, "--main-negative"));
    });

    it("adds AI border when ai is true", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      await subject.updateComplete;

      const border = subject.shadowRoot?.querySelector(".border");
      expect(border).to.exist;
      const beforeAIStyle = getComputedStyle(border as Element);
      expect(beforeAIStyle.background).to.not.contain("linear-gradient");

      subject.setAttribute("ai", "true");
      await subject.updateComplete;
      const afterAIStyle = getComputedStyle(border as Element);
      expect(afterAIStyle.background).to.contain("linear-gradient");
    });

    it("shows the expand icon pointing right when collapsed", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      subject.setAttribute("collapsible", "true");

      await subject.updateComplete;

      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      expect(icon).to.exist;

      await expect(icon?.getAttribute("name")).to.equal("expand_more");
      const computedStyle = getComputedStyle(icon as Element);
      await expect(computedStyle?.rotate).to.equal("-90deg");
    });
    it("shows the expand icon pointing right when expanded", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      subject.setAttribute("collapsible", "true");
      subject.setAttribute("expanded", "true");

      await subject.updateComplete;

      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      expect(icon).to.exist;

      await expect(icon?.getAttribute("name")).to.equal("expand_more");
      const computedStyle = getComputedStyle(icon as Element);
      await expect(computedStyle?.rotate).to.not.equal("-90deg");
    });
  });

  describe("Interaction", () => {
    it("toggles expansion when header is clicked", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "Description");
      subject.setAttribute("collapsible", "true");

      await subject.updateComplete;

      // Initially collapsed: content should be hidden
      const contentWrapper = subject.shadowRoot?.querySelector(".card-content");
      expect(contentWrapper).to.exist;
      await expect(getComputedStyle(contentWrapper as Element).height).to.equal("0px");

      // Click header to expand
      const header = subject.shadowRoot?.querySelector(".card-header");
      expect(header).to.exist;
      (header as HTMLElement).click();
      await subject.updateComplete;

      // Content should now be visible
      await expect(getComputedStyle(contentWrapper as Element).height).to.not.equal("0px");
      await expect(getComputedStyle(contentWrapper as Element).height).to.equal("240px");

      // Click header to collapse again
      (header as HTMLElement).click();
      await subject.updateComplete;

      // Content should be hidden again
      await expect(getComputedStyle(contentWrapper as Element).height).to.equal("0px");
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
