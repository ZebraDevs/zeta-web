import { html } from "lit";
import { fixture, expect, oneEvent } from "@open-wc/testing";
import type { ZetaUploadItem } from "../../components/upload-item/upload-item.js";
import type { ZetaProgressCircle } from "../../components/progress-indicators/progress-indicators.js";
import { ZetaCloseEvent } from "../../events";
import "../../components/upload-item/upload-item.js";

describe("zeta-upload-item", () => {
  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("renders default flavor correctly", async () => {
      const element: ZetaUploadItem = await fixture(html` <zeta-upload-item></zeta-upload-item> `);

      await expect(element.flavor).to.equal("default");
    });

    it("renders completed flavor correctly", async () => {
      const element: ZetaUploadItem = await fixture(html` <zeta-upload-item flavor="completed"></zeta-upload-item> `);

      await expect(element.flavor).to.equal("completed");

      const progressCircle = element.shadowRoot?.querySelector("zeta-progress-circle");
      expect(progressCircle).to.not.exist;
    });

    it("renders error flavor correctly", async () => {
      const element: ZetaUploadItem = await fixture(html` <zeta-upload-item flavor="error"></zeta-upload-item> `);

      await expect(element.flavor).to.equal("error");

      const progressCircle = element.shadowRoot?.querySelector("zeta-progress-circle");
      expect(progressCircle).to.not.exist;
    });

    it("updates progress correctly", async () => {
      const element: ZetaUploadItem = await fixture(html` <zeta-upload-item progress="50"></zeta-upload-item> `);

      await expect(element.progress).to.equal(50);

      const progressCircle: ZetaProgressCircle | null | undefined = element.shadowRoot?.querySelector("zeta-progress-circle");

      await expect(progressCircle?.progress).to.equal(50);
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("fires ZetaCancelUploadEventDetail when close icon is clicked", async () => {
      const element: ZetaUploadItem = await fixture(html` <zeta-upload-item flavor="completed"></zeta-upload-item> `);
      const eventListener = oneEvent(element, "cancelUpload");

      const btn = element.shadowRoot?.querySelector("#cancel") as HTMLElement;
      btn.click();
      await element.updateComplete;

      const event = await eventListener;
      await expect(event.type).to.equal(new ZetaCloseEvent().name);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
