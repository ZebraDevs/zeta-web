/** Defines how corners are shaped. Defaults to `rounded`. @public */
export type Contour =
  /** Applies 4px border-radius. */
  | "rounded"
  /** Applies 0px border-radius. */
  | "sharp";

export type Flavor =
  /** Primary background color.*/
  | "primary"
  /** Negative background color. */
  | "negative"
  /** Primary outline color, no background. */
  | "outline";

export type Size = "small" | "medium" | "large";

export type Alignment = "center" | "start" | "end";

export type Status = "positive" | "warning" | "negative";

export type BannerStatus = "default" | "info" | Status;

export type BadgeStatus = Status | "neutral" | "info";

