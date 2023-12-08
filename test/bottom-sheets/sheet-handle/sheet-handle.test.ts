import "../../../src/components/bottom-sheets/sheet-handle/sheet-handle.ts";
import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaSheetHandle } from "../../../src/components/bottom-sheets/sheet-handle/sheet-handle.ts";

describe("ZetaSheetHandle", () => {
  let subject: ZetaSheetHandle;

  const createComponent = (template = "<zeta-sheet-handle></zeta-sheet-handle>") => {
    return fixture<ZetaSheetHandle>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});

