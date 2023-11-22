import * as React from "react";
import { createComponent } from "@lit/react";
import { ZetaStatusLabel as ZetaStatusLabelWC } from "zeta-web";

export const ZetaStatusLabel = createComponent({
  tagName: "zeta-status-label",
  elementClass: ZetaStatusLabelWC,
  react: React,
  events: {}
});