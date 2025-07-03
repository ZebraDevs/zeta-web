import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import "../../index.css";
import type { ZetaEmptyState } from "../../components/empty-state/empty-state";
import "../../components/empty-state/empty-state";
import "../../components/illustration/illustration";
import "../../components/button/button";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner";
import { getSlot } from "../utils";

describe("zeta-empty-state", () => {
  let div: HTMLElement;
  let subject: ZetaEmptyState;

  const createComponent = (template = `<div style="background: var(--surface-default)"><zeta-empty-state></zeta-empty-state></div>`) => {
    // prettier-ignore
    return fixture<ZetaEmptyState>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    div = await createComponent();
    subject = div.querySelector("zeta-empty-state") as ZetaEmptyState;
  });

  describe("Accessibility", () => {
    it("meets contrast requirements", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "This is a placeholder description. It explains what this view is for and what to do next.");
      subject.setHTMLUnsafe(`<zeta-illustration name="serverDisconnect" basePath="" slot="illustration"></zeta-illustration>
        <zeta-button slot="primaryAction">Button</zeta-button>
        <zeta-button slot="secondaryAction" flavor="outline-subtle">Button</zeta-button>
        `);
      await subject.updateComplete;

      const title = subject.shadowRoot?.querySelector(".title");
      const description = subject.shadowRoot?.querySelector("p.description");
      if (description && title && div) {
        await contrastTest(`Empty State title`, title, div);
        await contrastTest(`Empty State description`, description, div);
      }
    });

    it("meets aria requirements", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "This is a placeholder description. It explains what this view is for and what to do next.");
      subject.setHTMLUnsafe(`<zeta-illustration name="serverDisconnect" basePath="" slot="illustration"></zeta-illustration>
        <zeta-button slot="primaryAction">Button</zeta-button>
        <zeta-button slot="secondaryAction" flavor="outline-subtle">Button</zeta-button>
        `);
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders with illustration, title, description, and actions", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "This is a placeholder description. It explains what this view is for and what to do next.");
      subject.setHTMLUnsafe(`<zeta-illustration name="serverDisconnect" basePath="" slot="illustration"></zeta-illustration>
        <zeta-button slot="primaryAction">Button</zeta-button>
        <zeta-button slot="secondaryAction" flavor="outline-subtle">Button</zeta-button>
        `);
      await subject.updateComplete;

      const illustration = getSlot(subject, "illustration");
      const primaryAction = getSlot(subject, "primaryAction");
      const secondaryAction = getSlot(subject, "secondaryAction");
      const title = subject.shadowRoot?.querySelector("h4.title");
      const description = subject.shadowRoot?.querySelector("p.description");

      expect(illustration).to.exist;
      expect(title).to.exist;
      expect(description).to.exist;
      expect(primaryAction).to.exist;
      expect(secondaryAction).to.exist;
    });

    it("renders correctly with a very long title and description", async () => {
      subject.setAttribute("title", "This is a very long title that should be truncated or wrapped in the empty state component");
      subject.setAttribute(
        "description",
        "This is a very long description that should be truncated or wrapped in the empty state component. It explains what this view is for and what to do next. It should not overflow or cause layout issues."
      );
      subject.setHTMLUnsafe(`<zeta-illustration name="serverDisconnect" basePath="" slot="illustration"></zeta-illustration>
        <zeta-button slot="primaryAction">Button</zeta-button>
        <zeta-button slot="secondaryAction" flavor="outline-subtle">Button</zeta-button>
        `);
      await subject.updateComplete;
      const illustration = getSlot(subject, "illustration");
      const primaryAction = getSlot(subject, "primaryAction");
      const secondaryAction = getSlot(subject, "secondaryAction");
      const title = subject.shadowRoot?.querySelector("h4.title");
      const description = subject.shadowRoot?.querySelector("p.description");
      expect(illustration).to.exist;
      expect(title).to.exist;
      expect(description).to.exist;
      expect(primaryAction).to.exist;
      expect(secondaryAction).to.exist;
      expect(title?.textContent).to.include("This is a very long title that should be truncated or wrapped in the empty state component");
      expect(description?.textContent).to.include(
        "This is a very long description that should be truncated or wrapped in the empty state component. It explains what this view is for and what to do next. It should not overflow or cause layout issues."
      );
    });
  });

  describe("Dimensions", () => {
    it("renders with correct dimensions", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "This is a placeholder description. It explains what this view is for and what to do next.");
      subject.setHTMLUnsafe(`<zeta-illustration name="serverDisconnect" basePath="" slot="illustration"></zeta-illustration>
        <zeta-button slot="primaryAction">Button</zeta-button>
        <zeta-button slot="secondaryAction" flavor="outline-subtle">Button</zeta-button>
        `);
      await subject.updateComplete;

      const rect = subject.getBoundingClientRect();
      await expect(rect.width).to.equal(375);
      await expect(rect.height).to.equal(284);
    });
  });

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("should handle primary action click", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "This is a placeholder description. It explains what this view is for and what to do next.");
      subject.setHTMLUnsafe(`<zeta-illustration name="serverDisconnect" basePath="" slot="illustration"></zeta-illustration>
        <zeta-button slot="primaryAction">Button</zeta-button>
        <zeta-button slot="secondaryAction" flavor="outline-subtle">Button</zeta-button>
        `);
      await subject.updateComplete;

      const primaryAction = getSlot(subject, "primaryAction");
      let clicked = false;
      primaryAction.addEventListener("click", () => {
        clicked = true;
      });
      primaryAction.click();
      expect(clicked).to.be.true;
    });
    it("should handle secondary action click", async () => {
      subject.setAttribute("title", "Title");
      subject.setAttribute("description", "This is a placeholder description. It explains what this view is for and what to do next.");
      subject.setHTMLUnsafe(`<zeta-illustration name="serverDisconnect" basePath="" slot="illustration"></zeta-illustration>
        <zeta-button slot="primaryAction">Button</zeta-button>
        <zeta-button slot="secondaryAction" flavor="outline-subtle">Button</zeta-button>
        `);
      await subject.updateComplete;

      const secondaryAction = getSlot(subject, "secondaryAction");
      let clicked = false;
      secondaryAction.addEventListener("click", () => {
        clicked = true;
      });
      secondaryAction.click();
      expect(clicked).to.be.true;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
