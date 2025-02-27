import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./login-page.styles.js";
import { Contourable } from "../../mixins/contour.js";
import "../button/button.js";

/**
 * TODO
 *
 * @figma TODO
 * @storybook TODO
 */
@customElement("zeta-login-page")
export class ZetaLoginPage extends Contourable(LitElement) {
  /** The URL to redirect to when the Sign in button is pressed */
  @property({ type: String }) url: string;
  /** Name of Zebra Product. */
  @property({ type: String }) name: string;
  /** Extra information to display to the user to inform them what they are signing into */
  @property({ type: String }) description?: string;

  login() {
    window.location.href = this.url;
  }
  //TODO read queryParams for auth success/failure

  protected render() {
    return html` <div class="header"></div>
      <main>
        <div class="logo">
          <div class="zebra">Zebra</div>
          <div class="product">${this.name}</div>
        </div>
        <zeta-button
          ?rounded=${this.rounded}
          flavor="primary"
          @click=${() => {
            this.login();
          }}
          >Sign In With SSO</zeta-button
        >
      </main>
      <footer><slot name="footer"></slot></footer>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-login-page": ZetaLoginPage;
  }
}
