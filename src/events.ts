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
  name: string = "change";
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
  name: string = "change";
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
  name: string = "pageChange";
  constructor(detail: T) {
    super(detail, { bubbles: true, composed: true });
  }
}

export type ZetaCloseEventDetail = object;
/** A CustomEvent factory that creates events when a close button is clicked, e.g. on an avatar. */
export class ZetaCloseEvent extends ZetaEvent<ZetaCloseEventDetail> {
  name: string = "close";
  constructor() {
    super({}, { bubbles: true, composed: true });
  }
}

export type ZetaPopupEventDetail = object;
/** A CustomEvent factory that creates events when a standard slider is changed. */
export class ZetaPopupEvent extends ZetaEvent<ZetaPopupEventDetail> {
  name: string = "open";
  constructor(type: "open" | "close" | "cancel") {
    super({});
    this.name = type;
  }
}

export type ZetaCancelUploadEventDetail = object; //TODO BK
/** A CustomEvent factory that creates events when the cancel button on a progess circle is clicked. */
export class ZetaCancelUploadEvent extends ZetaEvent<ZetaCancelUploadEventDetail> {
  name: string = "cancelUpload";
  constructor() {
    super({}, { bubbles: true, composed: true });
  }
}

export type ZetaDropdownEventDetail = object; //TODO BK
export class ZetaDropdownEvent extends ZetaEvent<ZetaDropdownEventDetail> {
  name: string = "open";
  constructor(isOpen: boolean) {
    super({});
    this.name = isOpen ? "open" : "close";
  }
}

export type ZetaChangeEventDetail = object;
/** A CustomEvent factory that creates events for when an input value changes. */
export class ZetaChangeEvent extends ZetaEvent<ZetaChangeEventDetail> {
  name: string = "change";
  constructor() {
    super({});
  }
}

export type ZetaInputEventDetail<S> = {
  value: S;
};
/** A CustomEvent factory that creates events for when an input value changes. */
export class ZetaInputEvent<S, T extends ZetaInputEventDetail<S>> extends ZetaEvent<T> {
  name: string = "input";
  constructor(detail: T) {
    super(detail);
  }
}

export type ZetaOptionClickEventDetail = {
  value: string;
};
/** A CustomEvent factory that creates events for when a option in a select is clicked. */
export class ZetaOptionClickEvent extends ZetaEvent<ZetaOptionClickEventDetail> {
  name: string = "zeta-option-click";
  constructor(detail: { value: string }) {
    super(detail, { bubbles: true });
  }
}

export type ZetaStepperChangeEventDetail = {
  value: string;
};
/** A CustomEvent factory that creates events for when an input value changes. */
export class ZetaStepperChangeEvent extends ZetaEvent<ZetaStepperChangeEventDetail> {
  name: string = "change";
  constructor(detail: { value: string }) {
    super(detail, { bubbles: true, composed: true });
  }
}

/** The sort direction of a `zeta-table-column`, matching the `aria-sort` values. */
export type ZetaTableSortDirection = "none" | "ascending" | "descending";

/** The type of the CustomEvent fired when the user sorts a `zeta-table`. */
export interface ZetaTableSortEventDetail {
  /** The `zeta-table-column` that was sorted. */
  column: HTMLElement;
  /** The new sort direction. */
  direction: ZetaTableSortDirection;
}
/** A CustomEvent factory that creates events when the user sorts a table. */
export class ZetaTableSortEvent extends ZetaEvent<ZetaTableSortEventDetail> {
  name: string = "sort";
  constructor(detail: ZetaTableSortEventDetail) {
    super(detail, { bubbles: true, composed: true });
  }
}

/** The type of the CustomEvent fired when the user filters a `zeta-table` column. */
export interface ZetaTableFilterEventDetail {
  /** The `zeta-table-column` that was filtered. */
  column: HTMLElement;
  /** The cell values the column is filtered to. Empty when the filter is cleared. */
  values: string[];
}
/** A CustomEvent factory that creates events when the user filters a table column. */
export class ZetaTableFilterEvent extends ZetaEvent<ZetaTableFilterEventDetail> {
  name: string = "filter";
  constructor(detail: ZetaTableFilterEventDetail) {
    super(detail, { bubbles: true, composed: true });
  }
}

/** The type of the CustomEvent fired when the user types in a `zeta-table` search field. */
export interface ZetaTableSearchEventDetail {
  /** The search text. */
  query: string;
}
/** A CustomEvent factory that creates events when the user searches a table. */
export class ZetaTableSearchEvent extends ZetaEvent<ZetaTableSearchEventDetail> {
  name: string = "search";
  constructor(detail: ZetaTableSearchEventDetail) {
    super(detail, { bubbles: true, composed: true });
  }
}

/** The type of the CustomEvent fired when the user changes which `zeta-table` rows are selected. */
export interface ZetaTableRowSelectEventDetail {
  /** Every selected `zeta-table-row`, on any page. */
  rows: HTMLElement[];
}
/** A CustomEvent factory that creates events when the user selects or deselects table rows. */
export class ZetaTableRowSelectEvent extends ZetaEvent<ZetaTableRowSelectEventDetail> {
  name: string = "rowselect";
  constructor(detail: ZetaTableRowSelectEventDetail) {
    super(detail, { bubbles: true, composed: true });
  }
}

/** The type of the CustomEvent fired when the user changes the page or page size of a `zeta-table`. */
export interface ZetaTablePageEventDetail {
  /** The new page, starting at 1. */
  page: number;
  /** The number of rows per page. */
  pageSize: number;
}
/** A CustomEvent factory that creates events when the user changes a table's page or rows per page. */
export class ZetaTablePageEvent extends ZetaEvent<ZetaTablePageEventDetail> {
  name: string = "pagechange";
  constructor(detail: ZetaTablePageEventDetail) {
    super(detail, { bubbles: true, composed: true });
  }
}
