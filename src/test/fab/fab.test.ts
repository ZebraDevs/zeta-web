import { expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import type { ZetaFab } from "../../components/fab/fab.js";
// import { getCssVarValue } from "../utils.js";
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

  describe("Accessibility Tests", () => {
    it("meets accessability requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
