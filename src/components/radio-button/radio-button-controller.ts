import { type ReactiveController } from 'lit';
import { type ZetaRadioButton } from './radio-button';

export class RadioButtonController implements ReactiveController {
  constructor(private readonly host: ZetaRadioButton) { }
  private rootNode: ParentNode | null = null;

  hostConnected(): void {
    this.rootNode = this.host.getRootNode() as ParentNode;
    this.handleChange();
  }
  hostDisconnected(): void {
    this.rootNode = null;
  }
  handleChange(): void {
    if (this.host.checked) {
      this.radios?.forEach(radio => {
        if (radio !== this.host) {
          radio.checked = false;
        }
      });
    }
  }
  get radios(): NodeListOf<ZetaRadioButton /* | HTMLInputElement*/> | undefined {
    //TODO test with mixed <input type="radio"> and zeta-radio-buttons, we may need to extend the selector to include inputs
    return this.rootNode?.querySelectorAll(`zeta-radio-button[name="${this.host.name}"]`);
  }
  //TODO selecting with the keyboard arrows should work
  //TODO write ALL the tests for this, including checking what is submitted.
  //TODO test if the name is not the same (only radios with the same name should be grouped)
}
