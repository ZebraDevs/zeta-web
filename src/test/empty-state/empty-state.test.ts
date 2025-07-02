import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import "../../index.css";
import { ZetaEmptyState } from "../../components/empty-state/empty-state";
import "../../components/empty-state/empty-state";

describe("zeta-empty-state", () => {
  let subject: ZetaEmptyState;

  const createComponent = (template = `<zeta-empty-state></zeta-empty-state>`) => {
    // prettier-ignore
    return fixture<ZetaEmptyState>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    subject.setAttribute("heading", "No Data Available");
    subject.setAttribute("description", "There is no data to display at this time.");
    subject.setHTMLUnsafe(`<zeta-illustration name="serverDisconnect" slot='illustration'></zeta-illustration>`);
    it("meets contrast requirements", async () => {});
    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
