import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./slider.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import { styleMap } from "lit/directives/style-map.js";
import { msg } from "@lit/localize";
import { ZetaRangeSliderEvent, ZetaSliderEvent } from "../../events.js";

export * from "./slider-input-field/slider-input-field.js";

/** Sliders allow users to make selections from a range of values.
 *
 * @event {CustomEvent<ZetaSliderEventDetail>} change - Fired whenever value of slider is changed. Contains a single entry in details: `value:number`.
 * @event {CustomEvent<ZetaRangeSliderEventDetail>} change - Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`.
 *
 * Each thumb is focusable and exposed as an ARIA `slider`; arrow keys move it by `stepIncrement` (or 1), Home/End jump to the ends.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6132-3190
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-slider--docs
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

  // Selected state lives in CSS; a class is used because :active is lost once the pointer leaves the thumb mid-drag.
  private setStyles(handle: HTMLDivElement) {
    this.selectedArea.parentElement?.classList.add("selected");
    handle.classList.add("dragging");
  }

  private removeStyles(handle: HTMLDivElement) {
    this.selectedArea.parentElement?.classList.remove("selected");
    handle.classList.remove("dragging");
  }
  /**
   * @fires ZetaSliderEvent:change when the Slider value changes.
   * @fires ZetaRangeSliderEvent:change when the Range Slider value changes.
   */
  private onHandleMoved = (handle: HTMLDivElement) => {
    if (this.stepIncrement) this.snapHandle(handle);

    if (this.type == "default") {
      this.value = this.getHandleValue(this.leftHandle);
      this.dispatchEvent(new ZetaSliderEvent({ value: this.value }).toEvent());
    } else {
      this.lowerValue = this.getHandleValue(this.leftHandle);
      this.upperValue = this.getHandleValue(this.rightHandle);
      this.dispatchEvent(
        new ZetaRangeSliderEvent({
          min: this.lowerValue,
          max: this.upperValue
        }).toEvent()
      );
    }
  };

  private moveHandle = (handle: HTMLDivElement, position: number) => {
    handle.style.left = `${position}%`;
    this.updateSelectedArea();
  };

  private mouseDownHandler = (e: Event, handle: HTMLDivElement, offHandle: HTMLDivElement) => {
    if (!this.disabled) {
      e.preventDefault();
      this.setStyles(handle);

      handle.style.zIndex = "7";
      if (offHandle != undefined) {
        offHandle.style.zIndex = "6";
      }

      const dragHandler = (e: MouseEvent) => this.dragHandler(e, handle);

      const onMouseUp = () => {
        this.removeStyles(handle);

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
        upperLimit = rightHandleDimensions.left - handleDimensions.width * 1.5 - this.getBoundingClientRect().x;
      } else if (handle == this.rightHandle) {
        lowerLimit = this.leftHandle?.getBoundingClientRect().x - this.getBoundingClientRect().x;
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
    if (this.type == "default" && !this.disabled) {
      const progress = this.convertPxToPercent(e.clientX - this.track.getBoundingClientRect().x);

      this.moveHandle(this.leftHandle, this.getHandlePosition(progress, this.leftHandle));
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
      // Start at the handle's centre, not its box edge: the box is wider than the visible thumb
      this.selectedArea.style.left = `${this.getHandleProgress(this.leftHandle)}%`;
      this.selectedArea.style.right = `${100 - this.getHandleProgress(this.rightHandle)}%`;
    } else {
      this.selectedArea.style.right = `${100 - this.getHandleProgress(this.leftHandle)}%`;
    }
  };

  private keyDownHandler = (e: KeyboardEvent, handle: "value" | "lowerValue" | "upperValue") => {
    if (this.disabled) return;
    const step = this.stepIncrement || 1;
    const deltas: Record<string, number> = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step };
    let next: number;
    if (e.key in deltas) next = this[handle] + deltas[e.key];
    else if (e.key == "Home") next = this.min;
    else if (e.key == "End") next = this.max;
    else return;
    e.preventDefault();

    // Land on a step, matching where the thumb is drawn.
    if (this.stepIncrement) next = Math.round(next / step) * step;
    // In range mode a thumb cannot pass the other one.
    const lower = handle == "upperValue" ? this.lowerValue : this.min;
    const upper = handle == "lowerValue" ? this.upperValue : this.max;
    next = Math.min(upper, Math.max(lower, next));
    if (next == this[handle]) return;
    this[handle] = next;

    if (this.type == "default") {
      this.dispatchEvent(new ZetaSliderEvent({ value: this.value }).toEvent());
    } else {
      this.dispatchEvent(new ZetaRangeSliderEvent({ min: this.lowerValue, max: this.upperValue }).toEvent());
    }
  };

  private renderHandle(id: string, handle: "value" | "lowerValue" | "upperValue", label: string, onMouseDown: (e: MouseEvent) => void) {
    return html`<div
      id=${id}
      class="handle"
      role="slider"
      tabindex=${this.disabled ? -1 : 0}
      aria-label=${label}
      aria-valuemin=${this.min}
      aria-valuemax=${this.max}
      aria-valuenow=${this[handle]}
      aria-disabled=${this.disabled ? "true" : "false"}
      @mousedown=${onMouseDown}
      @keydown=${(e: KeyboardEvent) => this.keyDownHandler(e, handle)}
    ></div>`;
  }

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
        <div id="track" class="track" @click=${this.trackClickHandler}>${this.getSteps()}</div>
        <div id="selected-area" class="selected-area" @click=${this.trackClickHandler}></div>
        ${
          this.type == "range"
            ? html`${this.renderHandle("handle-l", "lowerValue", msg("Minimum"), (e: MouseEvent) => this.mouseDownHandler(e, this.leftHandle, this.rightHandle))}
              ${this.renderHandle("handle-r", "upperValue", msg("Maximum"), (e: MouseEvent) => this.mouseDownHandler(e, this.rightHandle, this.leftHandle))}`
            : this.renderHandle("handle-l", "value", msg("Slider"), (e: MouseEvent) => this.mouseDownHandler(e, this.leftHandle, this.rightHandle))
        }
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
