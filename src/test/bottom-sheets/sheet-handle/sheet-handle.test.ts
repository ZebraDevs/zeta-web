import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaSheetHandle } from "../../../index.js";
import "../../../index.js";

describe("ZetaSheetHandle", () => {
  let subject: ZetaSheetHandle;

  const createComponent = (template = "<zeta-sheet-handle></zeta-sheet-handle>") => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return fixture<ZetaSheetHandle>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});

