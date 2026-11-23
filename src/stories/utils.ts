import { spread as oldSpread } from "@open-wc/lit-helpers";
import { html, type LitElement, type PropertyDeclaration } from "lit";
import type { DirectiveResult } from "lit/directive.js";

type SpreadData = {
  [key: string]: unknown;
};
type PropertyDeclarationMap = Map<string, PropertyDeclaration>;

const _spread = (_spreadData: SpreadData, properties: PropertyDeclarationMap): DirectiveResult => {
  const fixedSpreadData = Object.entries(_spreadData).reduce((acc, [key, value]) => {
    const property = properties.get(key) as (PropertyDeclaration & { type?: { name: string } }) | undefined;
    let newKey = key;
    if (property?.attribute === undefined || property?.attribute !== false) {
      newKey = `${property?.type && property.type.name == "Boolean" ? "?" : ""}${key}`;
    } else if (property?.attribute === false) {
      newKey = `.${key}`;
    }

    /* '@' will set the event */
    if (property === undefined && key.startsWith("on")) {
      newKey = `@${key.slice(2)}`;
    }
    // Fix for css-variables, which don't have a type
    else if (property?.type == undefined) {
      return acc;
    }
    acc[newKey] = value;
    return acc;
  }, {} as SpreadData);
  const returnVal = oldSpread(fixedSpreadData) as SpreadData;

  return returnVal;
};

export const spreadGenerator = (clas: typeof LitElement) => {
  return (spreadData: SpreadData) => _spread(spreadData, clas.elementProperties as PropertyDeclarationMap);
};

export const placeholder = (width: number = 400, height: number = 400) => {
  const widthMinusBorder = width - 2;
  const heightMinusBorder = height - 2;
  return html`
    <style>
      .placeholder {
        position: relative;
        width: ${widthMinusBorder}px;
        height: ${heightMinusBorder}px;
        max-width: 100%;
        max-height: 100%;
        border: 1px solid var(--main-subtle);
        background: none;
        overflow: hidden;
      }
      .placeholder-cross {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .placeholder-cross line {
        stroke: var(--main-subtle);
        stroke-width: 1px;
      }
    </style>
    <div class="placeholder">
      <svg class="placeholder-cross" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="${width}" y2="${height}" />
        <line x1="${width}" y1="0" x2="0" y2="${height}" />
      </svg>
    </div>
  `;
};
