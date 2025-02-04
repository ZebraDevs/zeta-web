import { expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import type { ZetaFab } from "../../components/fab/fab.js";
import { getCssVarValue } from "../utils.js";
import "../../components/fab/fab.js";
import "../../index.css";

describe("zeta-fab", () => {
  const label = "Label";
  const iconInSlot = "star";

  let subject: ZetaFab;

  const createComponent = (
    template = `<zeta-fab label=${label}>
        ${iconInSlot}
    </zeta-fab>`
  ) => {
    // prettier-ignore
    return fixture<ZetaFab>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessability requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
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
      const fab: ZetaFab = await fixture(html`<zeta-fab size="large"></zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      const height = getComputedStyle(el!).height;
      const expectedHeight = parseInt(getCssVarValue(el!, "--spacing-xl")) * 2 + 36 + "px";
      await expect(height).to.equal(expectedHeight);
    });
  });

  describe("Styling", () => {
    it("renders a full rounded fab", async () => {
      const el = subject.shadowRoot?.querySelector("button");
      const borderRadius = getComputedStyle(el!).borderRadius;
      const expectedBorderRadius = getCssVarValue(el!, "--radius-full");
      await expect(subject.round).to.equal("full");
      await expect(borderRadius).to.equal(expectedBorderRadius);
    });

    it("renders a rounded small fab", async () => {
      const fab: ZetaFab = await fixture(html`<zeta-fab size="small"></zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      fab.round = true;
      await fab.updateComplete;
      const borderRadius = getComputedStyle(el!).borderRadius;
      const expectedBorderRadius = getCssVarValue(el!, "--radius-rounded");
      await expect(fab.round).to.equal(true);
      await expect(borderRadius).to.equal(expectedBorderRadius);
    });

    it("renders a rounded large fab", async () => {
      const fab: ZetaFab = await fixture(html`<zeta-fab size="large"></zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      fab.round = true;
      await fab.updateComplete;
      const borderRadius = getComputedStyle(el!).borderRadius;
      const expectedBorderRadius = getCssVarValue(el!, "--radius-large");
      await expect(fab.round).to.equal(true);
      await expect(fab.size).to.equal("large");
      await expect(borderRadius).to.equal(expectedBorderRadius);
    });

    it("renders a non-rounded fab", async () => {
      const fab: ZetaFab = await fixture(html`<zeta-fab size="large"></zeta-fab>`);

      const el = fab.shadowRoot?.querySelector("button");
      fab.round = false;
      await fab.updateComplete;
      const borderRadius = getComputedStyle(el!).borderRadius;
      const expectedBorderRadius = getCssVarValue(el!, "--radius-none");
      await expect(fab.round).to.equal(false);
      await expect(borderRadius).to.equal(expectedBorderRadius);
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
