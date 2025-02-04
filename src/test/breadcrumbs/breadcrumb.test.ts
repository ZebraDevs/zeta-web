import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaBreadcrumb } from "../../components/breadcrumbs/breadcrumb.js";
import "../../components/breadcrumbs/breadcrumb.js";
import { MouseActions } from "../utils.js";

describe("zeta-breadcrumb", () => {
  let subject: ZetaBreadcrumb;
  const maxItems = 4;
  const rounded = true;

  const createComponent = (
    template = `<zeta-breadcrumb maxItems=${maxItems} .rounded=${rounded}>
      <zeta-breadcrumb-item> Standard breadcrumb </zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 1</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 2</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 3</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 4</zeta-breadcrumb-item>
      <zeta-breadcrumb-item>
        <zeta-icon slot="icon">star</zeta-icon>
        Icon before with separator
      </zeta-breadcrumb-item>
    </zeta-breadcrumb>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBreadcrumb>(html`${unsafeStatic(template)}`);
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
    it("renders the correct number of breadcrumb items", async () => {
      const breadcrumbItems = subject.shadowRoot!.querySelectorAll("zeta-breadcrumb-item");

      await expect(breadcrumbItems.length).to.equal(4);
    });

    it("renders the truncated breadcrumb ", () => {
      const moreMenu = subject.shadowRoot!.querySelector(".more-menu");

      expect(moreMenu).to.not.be.null;
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it.skip("renders the correct number of breadcrumb items after the more menu has been clicked", async () => {
      const moreMenu = subject.shadowRoot!.querySelector(".more-menu > button") as HTMLButtonElement;
      await MouseActions.click(moreMenu);

      subject.requestUpdate();

      const breadcrumbItems = subject.shadowRoot!.querySelectorAll("zeta-breadcrumb-item");

      await expect(breadcrumbItems.length).to.equal(6);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
