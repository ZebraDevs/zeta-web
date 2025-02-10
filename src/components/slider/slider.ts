import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./slider.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import { styleMap } from "lit/directives/style-map.js";
import { ZetaRangeSliderEvent, ZetaSliderEvent } from "../../events.js";

export * from "./slider-input-field/slider-input-field.js";

/**
 * Sliders allow users to make selections from a range of values.
 *
 * @event {CustomEvent<ZetaSliderEventDetail>} change - Fired whenever value of slider is changed. Contains a single entry in details: `value:number`.
 * @event {CustomEvent<ZetaRangeSliderEventDetail>} change - Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=875-11860&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/slider--docs
 */
@customElement("zeta-slider")
export class ZetaSlider extends Contourable(LitElement) {
  /** Disables the slider. */
  @property({ type: Boolean, reflect: true }) disabled?: boolean;

  /** If set, will put steps on the slider at the given increments and the slider will snap to the nearest step. */
  @property({ type: Number }) stepIncrement?: number;
  /** The type of the slider. Can either be 'default' or 'range'. */
  @property({ type: String }) type: "default" | "range" = "default";

  /**
   * The value of the slider.
   *
   * Will have no effect if type is not 'default'.
   */
  @property({ type: Number, reflect: true }) value: number = 50;
  /**
   * The initial value of the lower end of the slider.
   *
   * Will have no effect if type is not 'ranged'.
   */
  @property({ type: Number, reflect: true }) lowerValue: number = 10;

  /**
   * The initial value of the maximum end of the slider.
   *
   * Will have no effect if type is not 'ranged'.
   */
  @property({ type: Number, reflect: true }) upperValue: number = 90;

  /** The minimum value of the slider. */
  @property({ type: Number }) min: number = 0;

  /** The maximum value of the slider. */
  @property({ type: Number }) max: number = 100;

  @query("#handle-l") leftHandle!: HTMLDivElement;
  @query("#handle-r") rightHandle!: HTMLDivElement;
  @query("#track") track!: HTMLDivElement;
  @query("#selected-area") selectedArea!: HTMLDivElement;

  // Converts a pixel value to a percentage value based on the size of the track
  private convertPxToPercent(val: number) {
    return (val / this.track.getBoundingClientRect().width) * 100;
  }

  // Takes a given value and converts it to a value between 0-100 based on the given range
  private convertValueToProgress(val: number) {
    const range = this.max - this.min;
    const convertedVal = 100 / (range / (val - this.min));

    return Math.max(0, Math.min(100, convertedVal));
  }

  // Gets the progress of a given handle along the track between 0-100
  private getHandleProgress(handle: HTMLDivElement) {
    const trackDimensions = this.track.getBoundingClientRect();
    const handleDimensions = handle.getBoundingClientRect();

    const handlePos = handleDimensions.x - trackDimensions.x + handleDimensions.width / 2;

    return this.convertPxToPercent(handlePos);
  }

  // Returns an adjusted percentage value accounting for the width of the handle.
  // Should be used to apply the styling to the 'left' attribute on the handle.
  private getHandlePosition(progress: number, handle: HTMLDivElement) {
    return progress - this.convertPxToPercent(handle.getBoundingClientRect().width / 2);
  }

  // Gets the value of a handle relative to the minimum and maximum values
  private getHandleValue(handle: HTMLDivElement) {
    const progress = this.getHandleProgress(handle);
    const value = this.convertProgressToValue(progress);

    return Math.round(value);
  }

  // Convert a progress value (between 1-100) to a value between the given minimum and maximum values
  private convertProgressToValue(progress: number) {
    const range = this.max - this.min;

    return range * (progress / 100) + this.min;
  }

  // Rounds a given progress value to it's nearest step
  private roundToStepValue(val: number) {
    // Need to convert the progress to a value in order to find it's nearest step value
    val = this.convertProgressToValue(val);
    const roundedVal = Math.round(val / this.stepIncrement!) * this.stepIncrement!;

    return this.convertValueToProgress(roundedVal);
  }

  private setStyles() {
    // TODO I don't like this but also can't move it to CSS
    const selectedColor = "var(--main-primary)";

    this.leftHandle.style.backgroundColor = selectedColor;
    this.selectedArea.style.backgroundColor = selectedColor;
    if (this.type == "range") {
      this.rightHandle.style.backgroundColor = selectedColor;
    }
  }

  private removeStyles() {
    this.leftHandle.style.removeProperty("background-color");
    this.selectedArea.style.removeProperty("background-color");
    if (this.type == "range") {
      this.rightHandle.style.removeProperty("background-color");
    }
  }
  /**
   * @fires ZetaSliderEvent:change when the Slider value changes.
   * @fires ZetaRangeSliderEvent:change when the Range Slider value changes.
   */
  private onHandleMoved = (handle: HTMLDivElement) => {
    if (this.stepIncrement) this.snapHandle(handle);

    if (this.type == "default") {
      this.dispatchEvent(new ZetaSliderEvent({ value: this.getHandleValue(this.leftHandle) }).toEvent());
    } else {
      this.dispatchEvent(
        new ZetaRangeSliderEvent({
          min: this.getHandleValue(this.leftHandle),
          max: this.getHandleValue(this.rightHandle)
        }).toEvent()
      );
    }
  };

  private moveHandle = (handle: HTMLDivElement, position: number) => {
    handle.style.left = `${position}%`;
    this.updateSelectedArea();
  };

  private mouseDownHandler = (e: Event, handle: HTMLDivElement) => {
    if (!this.disabled) {
      e.preventDefault();
      this.setStyles();

      const dragHandler = (e: MouseEvent) => this.dragHandler(e, handle);

      const onMouseUp = () => {
        this.removeStyles();

        this.onHandleMoved(handle);

        window.removeEventListener("mousemove", dragHandler);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", dragHandler);
      window.addEventListener("mouseup", onMouseUp);
    }
  };

  private dragHandler = (e: MouseEvent, handle: HTMLDivElement) => {
    e.preventDefault();
    const handleDimensions = handle.getBoundingClientRect();
    const trackDimensions = this.track.getBoundingClientRect();

    let lowerLimit = 0 - handleDimensions.width / 2;
    let upperLimit = lowerLimit + trackDimensions.width;

    // Set the limits depending which handle is being dragged
    if (this.type == "range") {
      if (handle == this.leftHandle) {
        const rightHandleDimensions = this.rightHandle?.getBoundingClientRect();
        upperLimit = rightHandleDimensions.x - handleDimensions.width * 2.5;
      } else if (handle == this.rightHandle) {
        lowerLimit = this.leftHandle?.getBoundingClientRect().x - handleDimensions.width * 0.5;
      }
    }

    // Set the new position to be the new position of the mouse and subtract the starting position of the track and account for the handle width.
    let newPos = e.clientX - trackDimensions.x - handleDimensions.width / 2;
    newPos = Math.min(Math.max(lowerLimit, newPos), upperLimit);

    newPos = this.convertPxToPercent(newPos);
    if (!this.stepIncrement) {
      newPos = Math.round(newPos);
    }
    this.moveHandle(handle, newPos);
  };

  private trackClickHandler = (e: MouseEvent) => {
    if (this.type == "default") {
      const val = this.convertPxToPercent(e.clientX - this.leftHandle.getBoundingClientRect().width * 2);

      this.moveHandle(this.leftHandle, val);
      this.onHandleMoved(this.leftHandle);
    }
  };

  // Move the given handle to the nearest step
  private snapHandle = (handle: HTMLDivElement) => {
    // Get handle position, round to nearest step
    let handleProgress = Math.round(this.getHandleProgress(handle));
    handleProgress = this.roundToStepValue(handleProgress);

    if (this.type == "range") {
      // Stop one handle from going past or on top of the other

      const upperLimit = this.roundToStepValue(this.getHandleProgress(this.rightHandle));
      const lowerLimit = this.roundToStepValue(this.getHandleProgress(this.leftHandle));
      // The offset to move the handle to the nearest step
      const stepAdjustment = this.convertValueToProgress(this.stepIncrement! + this.min);

      if (handle == this.leftHandle && upperLimit <= handleProgress) {
        handleProgress = handleProgress - stepAdjustment;
      } else if (handle == this.rightHandle && handleProgress <= lowerLimit) {
        handleProgress = handleProgress + stepAdjustment;
      }
    }
    // Adjust the handle position to account for the width of the handle
    const adjustedHandlePos = this.getHandlePosition(handleProgress, handle);

    this.moveHandle(handle, adjustedHandlePos);
  };

  // Updates the size of the area between the handles
  private updateSelectedArea = () => {
    if (this.type == "range") {
      this.selectedArea.style.left = this.leftHandle.style.left;
      this.selectedArea.style.right = `${100 - this.getHandleProgress(this.rightHandle)}%`;
    } else {
      this.selectedArea.style.right = `${100 - this.getHandleProgress(this.leftHandle)}%`;
    }
  };

  private getSteps = () => {
    if (!this.stepIncrement) return nothing;

    const stepCount = Math.round((this.max - this.min) / this.stepIncrement);
    const stepElements = [];
    for (let i = 0; i < stepCount + 1; i++) {
      // Get the value the step represents and convert it to a number between 1-100 to get it's position.
      const position = this.convertValueToProgress(this.min + i * this.stepIncrement);
      stepElements.push(
        html`<div
          class="step"
          style=${styleMap({
          left: `${position}%`
        })}
        ></div>`
      );
    }
    return html`<div class="step-container">${stepElements}</div>`;
  };

  updated(): void {
    if (this.type == "default") {
      let initValue = this.convertValueToProgress(this.value);

      if (this.stepIncrement) {
        initValue = this.roundToStepValue(initValue);
      }

      this.moveHandle(this.leftHandle, this.getHandlePosition(initValue, this.leftHandle));
    } else if (this.type == "range") {
      let initLowerValue = this.convertValueToProgress(this.lowerValue);
      let initUpperValue = this.convertValueToProgress(this.upperValue);

      if (this.stepIncrement) {
        initLowerValue = this.roundToStepValue(initLowerValue);
        initUpperValue = this.roundToStepValue(initUpperValue);
      }

      this.moveHandle(this.leftHandle, this.getHandlePosition(initLowerValue, this.leftHandle));
      this.moveHandle(this.rightHandle, this.getHandlePosition(initUpperValue, this.rightHandle));
    }
  }

  protected override render() {
    return html`
      <div class="slider">
        <div id="track" class="track contourable-target" @click=${this.trackClickHandler}>${this.getSteps()}</div>
        <div id="selected-area" class="selected-area contourable-target" @click=${this.trackClickHandler}></div>
        <div id="handle-l" class="handle" @mousedown=${(e: MouseEvent) => this.mouseDownHandler(e, this.leftHandle)}></div>
        ${this.type == "range"
        ? html`<div id="handle-r" class="handle" @mousedown=${(e: MouseEvent) => this.mouseDownHandler(e, this.rightHandle)}></div>`
        : nothing}
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-slider": ZetaSlider;
  }
}
