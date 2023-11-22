import * as React from "react";
import { createComponent } from "@lit/react";
import { ZetaIcon as ZetaIconWC } from "zeta-web";

export const ZetaIcon = createComponent({
  tagName: "zeta-icon",
  elementClass: ZetaIconWC,
  react: React,
  events: {}
});

