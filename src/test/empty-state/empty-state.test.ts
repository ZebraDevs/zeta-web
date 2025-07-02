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

  describe("Accessibility", () => {});

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
