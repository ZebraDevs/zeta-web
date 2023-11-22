import * as React from "react";
import { createComponent } from "@lit/react";
import { ZetaPriorityPill as ZetaPriorityPillWC } from "zeta-web";

export const ZetaPriorityPill = createComponent({
  tagName: "zeta-priority-pill",
  elementClass: ZetaPriorityPillWC,
  react: React,
  events: {}
});