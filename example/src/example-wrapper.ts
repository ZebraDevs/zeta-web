import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "@zebra-fed/zeta-web/components/progress-indicators/progress-circle/progress-circle.js";
import "@zebra-fed/zeta-web";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { DirectiveResult } from "lit/async-directive.js";
import * as WebComponents from "./webcomponents.svg?raw";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import componentsData from "./components.json" assert { type: "json" };
const components = Array.isArray(componentsData) ? componentsData : Object.values(componentsData);

@customElement("example-wrapper")
export class ExampleWrapper extends LitElement {
  getQueryString(): string {
    return window.location.search;
  }

  static styles = [
    css`
      #app {
        height: 360px;
        background-color: var(--surface-default);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        align-items: center;
      }

      #bottom-bar {
        position: static;
        height: 68px;
        background-color: var(--main-default);
        color: var(--main-inverse);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        width: calc(100% - 32px);
      }

      .row {
        display: flex;
        flex-direction: row;
        gap: 16px;
        padding: 16px;
        align-items: center;
      }

      .container {
        padding: 16px;
        display: flex;
        justify-content: center;
      }

      .column {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .full {
        width: calc(100% - 32px);
      }

      .scroll {
        overflow-y: scroll;
      }
      .top {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 360px;
        flex-direction: column;
      }

      #web-components {
        display: flex;
        align-items: center;

        svg {
          height: 44px;
          width: 88px;
        }
      }
      .expanded {
        width: 100%;
        height: 292px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      select {
        height: 32px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.loadQuery();
  }

  loadQuery = () => {
    const query = this.getQueryString();

    const url = "/components/" + query.replace("?", "") + ".html";

    if (!query || !components.includes(query.replace("?", ""))) {
      this.child = html`<div class="container">Please select a component from the dropdown above.</div>`;
      return;
    }

    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        this.child = unsafeHTML(text);
        this.requestUpdate();
      });
  };

  child: DirectiveResult | null = null;

  render() {
    return html` <div id="app">
      <select name="Components">
        ${(components as string[]).map((component) => {
          return html`<option
            value="${component}"
            ?selected="${this.getQueryString() === `?${component}`}"
            @click="${() => {
              window.history.replaceState(null, "", `?${component}`);
              this.loadQuery();
            }}"
          >
            ${component}
          </option>`;
        })}
      </select>
      <div class="top">
        <div class="expanded">
          ${this.child ? this.child : html`<zeta-progress-circle indeterminate></zeta-progress-circle>`}
        </div>
        <div id="bottom-bar">
          <div>zeta-web v<span id="version"></span></div>
          <div id="web-components">
            ${unsafeSVG(WebComponents.default)}
            <div>Web Components</div>
          </div>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "example-wrapper": ExampleWrapper;
  }
}
