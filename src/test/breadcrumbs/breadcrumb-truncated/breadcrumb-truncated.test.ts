/* eslint-disable @typescript-eslint/no-unsafe-call */
import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaBreadcrumbTruncated } from "../../../index.js";
import "../../../index.js";

describe("ZetaBreadcrumbTruncated", () => {
  let subject: ZetaBreadcrumbTruncated;

  const createComponent = (template = "<zeta-breadcrumb-truncatetd></zeta-breadcrumb-truncated>") => {
    return fixture<ZetaBreadcrumbTruncated>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
