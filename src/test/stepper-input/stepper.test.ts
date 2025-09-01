import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { ZetaStepper } from "../../components/stepper/stepper.js";
import { type StepperItemFlavor } from "../../components/stepper/stepper-item.js";
import "../../components/stepper/stepper.js";
import "../../components/stepper/stepper-item.styles.js";
import "../../components/stepper/stepper.styles.js";
import "../../index.css";
import sinon from "sinon";

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

  const createFlavoredStepperItems = async (subject: ZetaStepper, flavor: StepperItemFlavor = "default", progress: number = 0, overflowed: boolean = false) => {
    subject.remove();
    await elementUpdated(subject);
    return await createComponent(`<zeta-stepper progress=${progress} overflowed=${overflowed} variant="horizontal">
          <zeta-stepper-item flavor=${flavor} ?editing=false>Label</zeta-stepper-item>
          <zeta-stepper-item flavor=${flavor} ?editing=false>Label</zeta-stepper-item>
          <zeta-stepper-item flavor=${flavor} ?editing=false>Label</zeta-stepper-item>
        </zeta-stepper>`);
  };

  describe("Accessibility", () => {
    it(`renders stepper items as list items in the unordered list`, async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item"));
      expect(stepperItems.length).to.equal(3);
      stepperItems?.forEach(item => {
        expect(item).to.exist;
        const li = item.shadowRoot?.querySelector("li");
        expect(li).to.exist;
        expect(li?.tagName).to.equal("LI");
      });
    });
  });

  describe("Content", () => {
    it("renders the correct number of steps", async () => {
      const stepCount = subject.querySelectorAll("zeta-stepper-item").length;
      expect(stepCount).to.equal(3);
    });
    it("renders the correct step labels", async () => {
      const stepLabels = Array.from(subject.querySelectorAll("zeta-stepper-item")).map(item => item.textContent);
      expect(stepLabels).to.deep.equal(["Label", "Label", "Label"]);
    });
    it("renders a counter step in each stepper item when flavor is default", async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item") ?? []);
      expect(stepperItems.length).to.equal(3);
      stepperItems.forEach(item => {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;
        const stepNumberPseudoElement = window.getComputedStyle(stepNumber as HTMLElement, "::before");
        expect(stepNumberPseudoElement.content).to.equal("counter(step)");
      });
    });
    it("renders a check mark icon when flavor is set to success", async () => {
      const successFlavorStepper = await createFlavoredStepperItems(subject, "success");
      const stepperItems = Array.from(successFlavorStepper.querySelectorAll("zeta-stepper-item") ?? []);
      expect(stepperItems.length).to.equal(3);
      stepperItems.forEach(item => {
        expect(item).to.exist;
        const checkMarkIcon = item.shadowRoot?.querySelector('zeta-icon[name="check_mark"]');
        expect(checkMarkIcon).to.exist;
      });
    });
  });

  describe("Dimensions", () => {
    it("renders stepper number items as 40x40 circles", async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item"));
      expect(stepperItems.length).to.equal(3);
      stepperItems.forEach(item => {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;
        const itemWidth = window.getComputedStyle(stepNumber as HTMLElement).width;
        const itemHeight = window.getComputedStyle(stepNumber as HTMLElement).height;
        expect(itemWidth).to.equal("40px");
        expect(itemHeight).to.equal("40px");
        const borderRadius = window.getComputedStyle(stepNumber as HTMLElement).borderRadius;
        expect(borderRadius).to.equal("50%");
      });
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

      expect(updatedWidth).to.equal(initialWidth);
      expect(updatedHeight).to.equal(initialHeight);
    });
    it("bar pseudo-element between steps should be 200x3", async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item") ?? []);
      expect(stepperItems.length).to.equal(3);
      stepperItems.forEach((item, index) => {
        expect(item).to.exist;
        //Do not check last stepper item - it does not have a bar
        if (index != 2) {
          const barWidth = window.getComputedStyle(item as HTMLElement, "::after").width;
          const barHeight = window.getComputedStyle(item as HTMLElement, "::after").height;
          expect(barWidth).to.equal("200px");
          expect(barHeight).to.equal("3px");
        }
      });
    });
  });

  describe("Styling", () => {
    it("renders stepper number items with correct default background color", async () => {
      const stepperItems = Array.from(subject.querySelectorAll("zeta-stepper-item"));
      expect(stepperItems.length).to.equal(3);
      stepperItems.forEach(item => {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;
        const backgroundColor = window.getComputedStyle(stepNumber as HTMLElement).backgroundColor;
        expect(backgroundColor).to.equal("rgb(255, 255, 255)"); // default background color
      });
    });
    it("renders stepper number items with correct background colour when flavor is partial", async () => {
      const partialFlavorStepper = await createFlavoredStepperItems(subject, "partial");
      const stepperItems = Array.from(partialFlavorStepper.querySelectorAll("zeta-stepper-item"));
      expect(stepperItems.length).to.equal(3);
      stepperItems.forEach(item => {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;
        const backgroundColor = window.getComputedStyle(stepNumber as HTMLElement).backgroundColor;
        expect(backgroundColor).to.equal("rgb(236, 255, 247)"); // partial flavor background color
      });
    });
    it("renders stepper number items with correct background colour when flavor is success", async () => {
      const successFlavorStepper = await createFlavoredStepperItems(subject, "success");
      const stepperItems = Array.from(successFlavorStepper.querySelectorAll("zeta-stepper-item"));
      expect(stepperItems.length).to.equal(3);
      stepperItems.forEach(item => {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;
        const backgroundColor = window.getComputedStyle(stepNumber as HTMLElement).backgroundColor;
        expect(backgroundColor).to.equal("rgb(0, 134, 79)"); // success flavor background color
      });
    });
    it("renders stepper number items with correct background colour when flavor is active", async () => {
      const activeFlavorStepper = await createFlavoredStepperItems(subject, "active");
      const stepperItems = Array.from(activeFlavorStepper.querySelectorAll("zeta-stepper-item"));
      expect(stepperItems.length).to.equal(3);
      stepperItems.forEach(item => {
        const stepNumber = item.shadowRoot?.querySelector(".step-number");
        expect(stepNumber).to.exist;
        const backgroundColor = window.getComputedStyle(stepNumber as HTMLElement).backgroundColor;
        expect(backgroundColor).to.equal("rgb(0, 115, 230)"); // active flavor background color
      });
    });
    it("when progress is set to 100, progress bar and progress indicator should be same width", async () => {
      const progressStepper = await createFlavoredStepperItems(subject, "default", 100);
      const progressBarElement = progressStepper.shadowRoot?.querySelector("zeta-progress-bar");
      expect(progressBarElement).to.exist;
      const progressBar = progressBarElement!.shadowRoot?.querySelector(".progress-bar");
      const progressIndicator = progressBarElement!.shadowRoot?.querySelector(".bar");
      expect(progressBar).to.exist;
      expect(progressIndicator).to.exist;
      const barWidth = window.getComputedStyle(progressBar as HTMLElement).width;
      const indicatorWidth = window.getComputedStyle(progressIndicator as HTMLElement).width;
      expect(indicatorWidth).to.equal(barWidth);
    });
  });

  describe("Interaction", () => {
    it("overflow button should call onClick handler when pressed", async () => {
      const overflowedStepper = await createFlavoredStepperItems(subject, "success", 0, true);
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
