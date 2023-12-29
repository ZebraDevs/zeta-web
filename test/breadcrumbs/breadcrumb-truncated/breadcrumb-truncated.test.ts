import { ZetaBreadcrumbTruncated } from "../../../src/components/breadcrumbs/breadcrumb-truncated/breadcrumb-truncated.js";
import "../../../src/components/breadcrumbs/breadcrumb-truncated/breadcrumb-truncated.js";
import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";

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

