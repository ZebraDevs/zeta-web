import { fixture, html } from "@open-wc/testing";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import type { ZetaTextInput } from "../../components/text-input/text-input.js";
import "../../components/text-input/text-input.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { nothing } from "lit";

interface Props {
  disabled?: boolean;
  leadingIcon?: ZetaIconName;
  trailingIcon?: ZetaIconName;
  suffix?: string;
  prefix?: string;
  error?: boolean;
  required?: boolean;
  label?: string;
  hint?: string;
  errorText?: string;
  name?: string;
  value?: string;
  type?: "text" | "date" | "textarea" | "password" | "time" | "number" | "integer";
  min?: number;
  max?: number;
}

export async function setup({
  hint = "",
  label = "",
  disabled = false,
  error = false,
  leadingIcon,
  trailingIcon,
  prefix = "",
  required = false,
  suffix = "",
  type = "text",
  errorText = undefined,
  name = undefined,
  value = undefined,
  min = undefined,
  max = undefined
}: Props) {
   return await fixture<ZetaTextInput>(
    html`<zeta-text-input
      ?required=${required}
      ?error=${error} 
      suffix=${suffix}
      prefix=${prefix}
      ?disabled=${disabled}
      leadingIcon=${ifDefined(leadingIcon)}
      trailingIcon=${ifDefined(trailingIcon)}
      type=${type}
      name=${ifDefined(name)}
      value=${ifDefined(value)} 
      min=${ifDefined(min)}
      max=${ifDefined(max)}
    >
    ${label ? html`<span slot="label">${label}</span>` :  nothing}
    ${hint ? html`<span slot="hint">${hint}</span>` :  nothing}
    ${errorText ? html`<span slot="error">${errorText}</span>` :  nothing}
    </zeta-text-input>`);
  
}
