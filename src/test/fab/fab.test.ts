import { elementUpdated, expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import type { ZetaFab } from "../../components/fab/fab.js";
import { getCssVarValue } from "../utils.js";
import "../../components/fab/fab.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

describe("zeta-fab", () => {
  const label = "Label";
  const iconInSlot = "star";
  // Not including secondary flavor as it will be removed in the future (and it fails accessibility tests)
  const flavors = ["primary", "inverse"];

  let subject: ZetaFab;

  const createComponent = (
    template = `
    
    <zeta-fab label=${label} style="background-color: var(--surface-default);">
        ${iconInSlot}
    </zeta-fab>
    `
  ) => {
    // prettier-ignore
    return fixture<ZetaFab>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    flavors.map(flavor => {
      it(`meets contrast requirements for the ${flavor} flavor`, async () => {
        subject.setAttribute("flavor", flavor);
        await elementUpdated(subject);

        // Check color contrast between text and background
        const buttonEl = subject.shadowRoot?.querySelector("button");
        if (buttonEl) {
          await contrastTest(`Button ${flavor} `, buttonEl, buttonEl);
        }
      });
      it("meets aria requirements", async () => {
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });

  describe("Content", () => {
    it("renders a button with a label", () => {
      expect(subject.shadowRoot?.querySelector("button")).to.exist;
      expect(subject.shadowRoot?.querySelector(".label")).to.exist;
    });

    it("renders a button with an icon", () => {
      expect(subject.shadowRoot?.querySelector("zeta-icon")).to.exist;
    });

    it("renders no label when label is empty", async () => {
      subject.label = "";
      await subject.updateComplete;
      expect(subject.shadowRoot?.querySelector(".label")).to.not.exist;
    });

    it("renders an extended fab", async () => {
      subject.extended = true;
      await subject.updateComplete;
      const labelExtentedFab = subject.shadowRoot?.querySelector("button .label");
      const labelDefault = subject.shadowRoot?.querySelector(":host > .label");
      await expect(subject.extended).to.equal(true);
      expect(labelExtentedFab).to.exist;
      expect(labelDefault).to.not.exist;
    });

    it("renders a default fab", async () => {
      const labelExtentedFab = subject.shadowRoot?.querySelector("button .label");
      const labelDefault = subject.shadowRoot?.querySelector(":host > .label");
      await expect(subject.extended).to.equal(false);
      expect(labelExtentedFab).to.not.exist;
      expect(labelDefault).to.exist;
    });
  });

  describe("Dimensions", () => {
    it("renders a small fab", async () => {
      const el = subject.shadowRoot?.querySelector("button");
      const height = getComputedStyle(el!).height;
      const expectedHeight = parseInt(getCssVarValue(el!, "--spacing-medium")) * 2 + 24 + "px";
      await expect(subject.size).to.equal("small");
      await expect(height).to.equal(expectedHeight);
    });

    it("renders a large fab", async () => {
      const fab: ZetaFab = await fixture(html`<zeta-fab size="large">barcode</zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      const height = getComputedStyle(el!).height;
      const expectedHeight = parseInt(getCssVarValue(el!, "--spacing-xl")) * 2 + 36 + "px";
      await expect(height).to.equal(expectedHeight);
    });
  });

  describe("Styling", () => {
    it("renders a full rounded fab", async () => {
      const fab: ZetaFab = await fixture(html`<zeta-fab shape="full">barcode</zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      const borderRadius = getComputedStyle(el!).borderRadius;
      const expectedBorderRadius = getCssVarValue(el!, "--radius-full");
      await expect(fab.shape).to.equal("full");
      await expect(borderRadius).to.equal(expectedBorderRadius);
    });

    it("renders a rounded small fab", async () => {
      const fab: ZetaFab = await fixture(html`<zeta-fab size="small"></zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      fab.shape = "rounded";
      await fab.updateComplete;
      const borderRadius = getComputedStyle(el!).borderRadius;
      const expectedBorderRadius = getCssVarValue(el!, "--radius-rounded");
      await expect(fab.shape).to.equal("rounded");
      await expect(borderRadius).to.equal(expectedBorderRadius);
    });

    it("renders a rounded large fab", async () => {
      const fab: ZetaFab = await fixture(html`<zeta-fab size="large"></zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      fab.shape = "rounded";
      await fab.updateComplete;
      const borderRadius = getComputedStyle(el!).borderRadius;
      const expectedBorderRadius = getCssVarValue(el!, "--radius-large");
      await expect(fab.shape).to.equal("rounded");
      await expect(fab.size).to.equal("large");
      await expect(borderRadius).to.equal(expectedBorderRadius);
    });

    it("renders a non-rounded fab", async () => {
      const fab: ZetaFab = await fixture(html`<zeta-fab size="large"></zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      fab.shape = "sharp";
      await fab.updateComplete;
      const borderRadius = getComputedStyle(el!).borderRadius;
      const expectedBorderRadius = getCssVarValue(el!, "--radius-none");
      await expect(fab.shape).to.equal("sharp");
      await expect(borderRadius).to.equal(expectedBorderRadius);
    });

    it("renders small and large rounded fabs with difererent border radii", async () => {
      const smallFab: ZetaFab = await fixture(html`<zeta-fab size="small" shape="rounded"></zeta-fab>`);
      const largeFab: ZetaFab = await fixture(html`<zeta-fab size="large" shape="rounded"></zeta-fab>`);

      const smallEl = smallFab.shadowRoot?.querySelector("button");
      const largeEl = largeFab.shadowRoot?.querySelector("button");

      const smallBorderRadius = getComputedStyle(smallEl!).borderRadius;
      const largeBorderRadius = getComputedStyle(largeEl!).borderRadius;

      const expectedSmallBorderRadius = getCssVarValue(smallEl!, "--radius-rounded");
      const expectedLargeBorderRadius = getCssVarValue(largeEl!, "--radius-large");

      await expect(smallFab.shape).to.equal("rounded");
      await expect(largeFab.shape).to.equal("rounded");
      await expect(smallBorderRadius).to.equal(expectedSmallBorderRadius);
      await expect(largeBorderRadius).to.equal(expectedLargeBorderRadius);
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
