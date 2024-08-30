abstract class ZetaEvent<T> {
  abstract name: string;
  detail: T;
  bubbles: boolean;
  composed: boolean;
  cancelable: boolean;

  constructor(
    detail: T,
    options?: {
      bubbles?: boolean;
      composed?: boolean;
      cancelable?: boolean;
    }
  ) {
    this.detail = detail;
    this.bubbles = options && "bubbles" in options && typeof options.bubbles === "boolean" ? options.bubbles : false;
    this.composed = options && "composed" in options && typeof options.composed === "boolean" ? options.composed : false;
    this.cancelable = options && "cancelable" in options && typeof options.cancelable === "boolean" ? options.cancelable : false;
  }
  toEvent(): CustomEvent<T> {
    return new CustomEvent<T>(this.name, {
      bubbles: this.bubbles,
      composed: this.composed,
      cancelable: this.cancelable,
      detail: this.detail
    });
  }
}

export interface ZetaSliderEventDetail {
  /** The value of the slider */
  value: number;
}
/** A CustomEvent factory that creates events when a standard slider is changed. */
export class ZetaSliderEvent<T extends ZetaSliderEventDetail> extends ZetaEvent<T> {
  name: string = "zeta-slider-change";
  constructor(detail: T) {
    super(detail);
  }
}

/** The type of the CustomEvent fired when a ranged slider is changed. */
export interface ZetaRangeSliderEventDetail {
  /** The minimum value of the range slider. */
  min: number;
  /** The maximum value of the range slider. */
  max: number;
}
/** A CustomEvent factory that creates events when a ranged slider is changed. */
export class ZetaRangeSliderEvent<T extends ZetaRangeSliderEventDetail> extends ZetaEvent<T> {
  name: string = "zeta-range-slider-change";
  constructor(detail: T) {
    super(detail);
  }
}

/** The type of the CustomEvent fired when a page is changed. */
export interface ZetaPageEventDetail {
  /** The new page number. */
  page: number;
}
/** A CustomEvent factory that creates events when a ranged slider is changed. */
export class ZetaPageEvent<T extends ZetaPageEventDetail> extends ZetaEvent<T> {
  name: string = "zeta-page-change";
  constructor(detail: T) {
    super(detail, { bubbles: true, composed: true });
  }
}

export class ZetaAvatarCloseEvent extends ZetaEvent<undefined> {
  name: string = "avatar-close";
  constructor() {
    super(undefined, { bubbles: true, composed: true });
  }
}

export type ZetaPopupEventDetail = object
/** A CustomEvent factory that creates events when a standard slider is changed. */
export class ZetaPopupEvent extends ZetaEvent<ZetaPopupEventDetail> {
  name: string = "zeta-modal-open";
  constructor(isOpen: boolean) {
    super({});
    this.name = isOpen ? "zeta-modal-open" : "zeta-modal-close";
  }
}

export type ZetaCancelUploadEventDetail = object
/** A CustomEvent factory that creates events when the cancel button on a progess circle is clicked. */
export class ZetaCancelUploadEvent extends ZetaEvent<ZetaCancelUploadEventDetail> {
  name: string = "zeta-cancel-upload";
  constructor() {
    super({}, { bubbles: true, composed: true });
  }
}
