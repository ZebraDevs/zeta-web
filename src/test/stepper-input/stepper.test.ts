import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaStepper } from "../../components/stepper/stepper.js";
import { type StepperItemFlavor } from "../../components/stepper/stepper-item.js";
import "../../components/stepper/stepper.js";
import "../../components/stepper/stepper-item.styles.js";
import "../../components/stepper/stepper.styles.js";
import "../../index.css";
import sinon from "sinon";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

const flavors = ["partial", "success", "active", "default"];

describe("zeta-stepper", () => {
  let subject: ZetaStepper;
  const createComponent = (
    template = `<zeta-stepper progress=0 overflowed=false variant="horizontal">
        <zeta-stepper-item flavor=default ?editing=false>Label</zeta-stepper-item>
        <zeta-stepper-item flavor=default ?editing=false>Label</zeta-stepper-item>
        <zeta-stepper-item flavor=default ?editing=false>Label</zeta-stepper-item>
      </zeta-stepper>`
  ) => {
    // prettier-ignore
    return fixture<ZetaStepper>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  const createFlavoredStepper = async (
    subject: ZetaStepper,
    flavor: StepperItemFlavor = "default",
    progress: number = 0,
    showOverflowButton: boolean = false,
    progressBar: boolean = false
  ) => {
    subject.remove();
    await elementUpdated(subject);
    return await createComponent(`<zeta-stepper progress=${progress} showOverflowButton=${showOverflowButton} progressBar=${progressBar} variant="horizontal">
          <zeta-stepper-item flavor=${flavor} ?editing=false>Label</zeta-stepper-item>
          <zeta-stepper-item flavor=${flavor} ?editing=false>Label</zeta-stepper-item>
          <zeta-stepper-item flavor=${flavor} ?editing=false>Label</zeta-stepper-item>
        </zeta-stepper>`);
  };

  const createFlavoredStepperItem = async (flavor: StepperItemFlavor = "default") => {
    return await fixture(
      html`<ul>
        <zeta-stepper-item flavor=${flavor} ?editing=${false}>Label</zeta-stepper-item>
      </ul>`
    );
  };

  describe("Accessibility", () => {
    //Remove the theme and contrast stylesheets after each test
    afterEach(() => {
      document.getElementById("theme-mode")?.remove();
      document.getElementById("contrast-mode")?.remove();
    });

    flavors.map(flavor => {
      it(`meets contrast requirements for the ${flavor} flavor`, async () => {
        subject = await createFlavoredStepper(subject, flavor as StepperItemFlavor);
        await elementUpdated(subject);

        const stepperEl = subject.shadowRoot?.querySelector("zeta-stepper");
        if (stepperEl) {
          await contrastTest(`Stepper ${flavor} `, stepperEl, stepperEl);
        }
      });
      it(`Stepper meets aria requirements for the ${flavor} flavor`, async () => {
        subject = await createFlavoredStepper(subject, flavor as StepperItemFlavor);
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
      it(`Each stepper item meets aria requirements for the ${flavor} flavor`, async () => {
        const stepperItem = await createFlavoredStepperItem(flavor as StepperItemFlavor);
        await expect(stepperItem).to.be.accessible();
        await expect(stepperItem).shadowDom.to.be.accessible();
      });
    });
  });

  describe("Content", () => {
    it("renders the correct number of steps", async () => {
      const stepCount = subject.querySelectorAll("zeta-stepper-item").length;
      await expect(stepCount).to.equal(3);
    });
    it("renders the correct step labels", async () => {
      const stepLabels = Array.from(subject.querySelectorAll("zeta-stepper-item")).map(item => item.textContent);
      await expect(stepLabels).to.deep.equal(["Label", "Label", "Label"]);
    });
    it("renders a counter step in each stepper item when flavor is default", async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item") ?? []);
      await expect(stepperItems.length).to.equal(3);

      for (const [index, item] of stepperItems.entries()) {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;
        await expect(stepNumber?.textContent?.trim()).to.equal((index + 1).toString());
      }
    });
    it("renders a check mark icon when flavor is set to success", async () => {
      const successFlavorStepper = await createFlavoredStepper(subject, "success");
      const stepperItems = Array.from(successFlavorStepper.querySelectorAll("zeta-stepper-item") ?? []);
      await expect(stepperItems.length).to.equal(3);

      for (const item of stepperItems) {
        expect(item).to.exist;
        const checkMarkIcon = item.shadowRoot?.querySelector('zeta-icon[name="check_mark"]');
        expect(checkMarkIcon).to.exist;
      }
    });
  });

  describe("Dimensions", () => {
    it("renders stepper number items as 40x40 circles", async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item"));
      await expect(stepperItems.length).to.equal(3);

      for (const item of stepperItems) {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;

        const itemWidth = window.getComputedStyle(stepNumber as HTMLElement).width;
        const itemHeight = window.getComputedStyle(stepNumber as HTMLElement).height;

        await expect(itemWidth).to.equal("40px");
        await expect(itemHeight).to.equal("40px");

        const borderRadius = window.getComputedStyle(stepNumber as HTMLElement).borderRadius;
        await expect(borderRadius).to.equal("50%");
      }
    });
    it("stepper container remains the same size when stepper label text is very long", async () => {
      const stepperContainer = subject.shadowRoot?.querySelector(".stepper-container");
      expect(stepperContainer).to.exist;

      const initialWidth = window.getComputedStyle(stepperContainer!).width;
      const initialHeight = window.getComputedStyle(stepperContainer!).height;

      const longLabel = "This is a very long step label that should not affect the container size";
      const stepperItem = subject.querySelector("zeta-stepper-item");
      if (stepperItem) {
        stepperItem.textContent = longLabel;
      }

      await elementUpdated(subject);

      const updatedWidth = window.getComputedStyle(stepperContainer!).width;
      const updatedHeight = window.getComputedStyle(stepperContainer!).height;

      await expect(updatedWidth).to.equal(initialWidth);
      await expect(updatedHeight).to.equal(initialHeight);
    });
    it("bar pseudo-element between steps should be 200x3", async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item") ?? []);
      await expect(stepperItems.length).to.equal(3);

      for (const [index, item] of stepperItems.entries()) {
        expect(item).to.exist;

        //Do not check last stepper item - it does not have a bar
        if (index != 2) {
          const barWidth = window.getComputedStyle(item as HTMLElement, "::after").width;
          const barHeight = window.getComputedStyle(item as HTMLElement, "::after").height;

          await expect(barWidth).to.equal("200px");
          await expect(barHeight).to.equal("3px");
        }
      }
    });
  });

  describe("Styling", () => {
    it("renders stepper number items with correct default background color", async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item"));
      await expect(stepperItems.length).to.equal(3);

      for (const item of stepperItems) {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;

        const backgroundColor = window.getComputedStyle(stepNumber as HTMLElement).backgroundColor;
        await expect(backgroundColor).to.equal("rgb(255, 255, 255)"); // default background color
      }
    });
    it("renders stepper number items with correct background colour when flavor is partial", async () => {
      const partialFlavorStepper = await createFlavoredStepper(subject, "partial");
      const stepperItems = Array.from(partialFlavorStepper.querySelectorAll("zeta-stepper-item"));
      await expect(stepperItems.length).to.equal(3);

      for (const item of stepperItems) {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;

        const backgroundColor = window.getComputedStyle(stepNumber as HTMLElement).backgroundColor;
        await expect(backgroundColor).to.equal("rgb(236, 255, 247)"); // partial flavor background color
      }
    });
    it("renders stepper number items with correct background colour when flavor is success", async () => {
      const successFlavorStepper = await createFlavoredStepper(subject, "success");
      const stepperItems = Array.from(successFlavorStepper.querySelectorAll("zeta-stepper-item"));
      await expect(stepperItems.length).to.equal(3);

      for (const item of stepperItems) {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;

        const backgroundColor = window.getComputedStyle(stepNumber as HTMLElement).backgroundColor;
        await expect(backgroundColor).to.equal("rgb(0, 134, 79)"); // success flavor background color
      }
    });
    it("renders stepper number items with correct background colour when flavor is active", async () => {
      const activeFlavorStepper = await createFlavoredStepper(subject, "active");
      const stepperItems = Array.from(activeFlavorStepper.querySelectorAll("zeta-stepper-item"));
      await expect(stepperItems.length).to.equal(3);

      for (const item of stepperItems) {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;

        const backgroundColor = window.getComputedStyle(stepNumber as HTMLElement).backgroundColor;
        await expect(backgroundColor).to.equal("rgb(0, 115, 230)"); // active flavor background color
      }
    });
    it("when progress is set to 1.0, progress bar and progress indicator should be same width", async () => {
      const progressStepper = await createFlavoredStepper(subject, "default", 1.0);
      const progressBarElement = progressStepper.shadowRoot?.querySelector("zeta-progress-bar");
      expect(progressBarElement).to.exist;

      const progressBar = progressBarElement!.shadowRoot?.querySelector(".progress-bar");
      const progressIndicator = progressBarElement!.shadowRoot?.querySelector(".bar");
      expect(progressBar).to.exist;
      expect(progressIndicator).to.exist;

      const barWidth = window.getComputedStyle(progressBar as HTMLElement).width;
      const indicatorWidth = window.getComputedStyle(progressIndicator as HTMLElement).width;
      await expect(indicatorWidth).to.equal(barWidth);
    });
  });

  describe("Interaction", () => {
    it("overflow button should call onClick handler when pressed", async () => {
      const overflowedStepper = await createFlavoredStepper(subject, "success", 0, true, true);
      const overflowButtonElement = overflowedStepper.shadowRoot?.querySelector("zeta-button");
      expect(overflowButtonElement).to.exist;

      const onClickSpy = sinon.spy();
      overflowButtonElement?.addEventListener("click", onClickSpy);
      overflowButtonElement?.click();
      expect(onClickSpy).to.have.been.calledOnce;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
