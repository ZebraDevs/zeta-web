import { ZetaSheetHeader } from "../../../src/components/bottom-sheets/sheet-header/sheet-header.ts";
import  "../../../src/components/bottom-sheets/sheet-header/sheet-header.ts";
import { fixture, assert, html, elementUpdated, expect, unsafeStatic } from '@open-wc/testing';

describe('ZetaSheetHeader', () => {
  let subject: ZetaSheetHeader;

  const createComponent = (template = '<zeta-sheet-header></zeta-sheet-header>') => {
    return fixture<ZetaSheetHeader>(html`${unsafeStatic(template)}`);
  }

  beforeEach(async () => {
    subject = await createComponent();
  });

  it('sets the correct default values', async () => {
    expect(subject.alignment).to.equal('start');
    expect(subject.text).to.equal('Title');
  });

  it('should align the text to the center when alightment = center', async () => {
    subject.setAttribute('alignment', 'center');
    await elementUpdated(subject);

    expect(window.getComputedStyle(subject.shadowRoot.querySelector('.container')).justifyContent).to.equal('center');
  });

  it('should shows the text to the passed value', async () => {
    subject.setAttribute('text', 'Testing service');
    await elementUpdated(subject);

    await expect(subject.shadowRoot.querySelector('.container').textContent).to.equal('Testing service');
  });

  it('it meets accessibility requirements', async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
