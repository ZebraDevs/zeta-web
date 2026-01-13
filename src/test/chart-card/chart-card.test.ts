import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaChartCard } from "../../components/chart-card/chart-card.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner";
import "../../components/chart-card/chart-card.js";
import { disableShadowDOMTransitions } from "../utils.js";
import "../../css/styles.css";

describe("zeta-chart-card", () => {
  let subject: ZetaChartCard;

  const createComponent = (
    template = `
    <div>
    <style>
      zeta-chart-card {
        transition: none !important;
        width: 400px;
        max-width: 400px;
        display: block;
      }
    </style>
    <zeta-chart-card title="Test Title" subtitle="Test Subtitle">
      <div style='color: var(--main-default); width: 360px; height: 200px'>Chart Content</div>
    </zeta-chart-card>
    </div>`
  ) => {
    // prettier-ignore
    return fixture<ZetaChartCard>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    const all = await createComponent();
    subject = all.querySelector("zeta-chart-card") as ZetaChartCard;

    // Disable transitions in the shadow DOM after component is created
    if (subject && subject.shadowRoot) {
      disableShadowDOMTransitions(subject);
    }
  });

  describe("Accessibility", () => {
    it("has proper contrast for title and subtitle", async () => {
      await subject.updateComplete;

      const title = subject.shadowRoot?.querySelector(".title");
      const subtitle = subject.shadowRoot?.querySelector(".subtitle");

      if (title) {
        await contrastTest("Chart Card title", title as HTMLElement, subject.shadowRoot?.querySelector(".card") as HTMLElement);
      }

      if (subtitle) {
        await contrastTest("Chart Card subtitle", subtitle as HTMLElement, subject.shadowRoot?.querySelector(".card") as HTMLElement);
      }
    });

    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("has proper role when clickable", async () => {
      subject.setAttribute("clickable", "true");
      await elementUpdated(subject);

      const card = subject.shadowRoot?.querySelector(".card");
      expect(card?.getAttribute("role")).to.equal("button");
      expect(card?.getAttribute("tabindex")).to.equal("0");
    });

    it("has proper role when not clickable", async () => {
      subject.removeAttribute("clickable");
      await elementUpdated(subject);

      const card = subject.shadowRoot?.querySelector(".card");
      expect(card?.getAttribute("role")).to.equal("article");
      expect(card?.hasAttribute("tabindex")).to.be.false;
    });
  });

  describe("Content", () => {
    it("renders title and subtitle from props", async () => {
      await subject.updateComplete;

      const title = subject.shadowRoot?.querySelector(".title");
      const subtitle = subject.shadowRoot?.querySelector(".subtitle");

      expect(title).to.exist;
      expect(subtitle).to.exist;
      expect(title?.textContent).to.contain("Test Title");
      expect(subtitle?.textContent).to.contain("Test Subtitle");
    });

    it("renders content slot", async () => {
      await subject.updateComplete;

      const content = subject.shadowRoot?.querySelector(".content");
      expect(content).to.exist;
    });

    it("renders footer slot when provided", async () => {
      const template = `
        <zeta-chart-card title="Test">
          <div>Content</div>
          <div slot="footer">Footer</div>
        </zeta-chart-card>
      `;
      const card = await fixture<ZetaChartCard>(html`${unsafeStatic(template)}`);
      await elementUpdated(card);

      const footer = card.shadowRoot?.querySelector(".footer");
      expect(footer).to.exist;
    });

    it("hides header when no title, subtitle, or header slot", async () => {
      const template = `
        <zeta-chart-card>
          <div>Content only</div>
        </zeta-chart-card>
      `;
      const card = await fixture<ZetaChartCard>(html`${unsafeStatic(template)}`);
      await elementUpdated(card);

      const header = card.shadowRoot?.querySelector(".header");
      expect(header).to.not.exist;
    });

    it("renders header slot when provided", async () => {
      const template = `
        <zeta-chart-card>
          <div slot="header">Custom Header</div>
          <div>Content</div>
        </zeta-chart-card>
      `;
      const card = await fixture<ZetaChartCard>(html`${unsafeStatic(template)}`);
      await elementUpdated(card);

      const header = card.shadowRoot?.querySelector(".header");
      expect(header).to.exist;
      expect(header?.textContent).to.contain("Custom Header");
    });

    it("displays error message when error property is set", async () => {
      subject.setAttribute("error", "Test error message");
      await subject.updateComplete;

      const error = subject.shadowRoot?.querySelector(".error");
      expect(error).to.exist;
      expect(error?.textContent).to.contain("Test error message");
    });
  });

  describe("Interaction", () => {
    it("dispatches click event when card is clicked and clickable", async () => {
      subject.setAttribute("clickable", "true");
      await subject.updateComplete;

      let clickEventFired = false;
      subject.addEventListener("click", () => {
        clickEventFired = true;
      });

      const card = subject.shadowRoot?.querySelector(".card") as HTMLElement;
      card?.click();
      await subject.updateComplete;

      expect(clickEventFired).to.be.true;
    });

    it("handles Enter key press when clickable", async () => {
      subject.setAttribute("clickable", "true");
      await subject.updateComplete;

      let clickEventFired = false;
      subject.addEventListener("click", () => {
        clickEventFired = true;
      });

      const card = subject.shadowRoot?.querySelector(".card") as HTMLElement;
      const enterEvent = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });
      card?.dispatchEvent(enterEvent);
      await subject.updateComplete;

      expect(clickEventFired).to.be.true;
    });

    it("handles Space key press when clickable", async () => {
      subject.setAttribute("clickable", "true");
      await subject.updateComplete;

      let clickEventFired = false;
      subject.addEventListener("click", () => {
        clickEventFired = true;
      });

      const card = subject.shadowRoot?.querySelector(".card") as HTMLElement;
      const spaceEvent = new KeyboardEvent("keydown", { key: " ", bubbles: true });
      card?.dispatchEvent(spaceEvent);
      await subject.updateComplete;

      expect(clickEventFired).to.be.true;
    });
  });
});
