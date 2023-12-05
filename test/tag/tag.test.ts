import { ZetaTag } from "../../src/components/tag/tag.ts";
import  "../../src/components/tag/tag.ts";
import { fixture, assert, html, elementUpdated, expect, unsafeStatic } from '@open-wc/testing';

describe('ZetaTag', () => {
  let subject: ZetaTag;

  const createComponent = (template = '<zeta-tag></zeta-tag>') => {
    return fixture<IgcButtonComponent>(html`${unsafeStatic(template)}`);
  }

  beforeEach(async () => {
    subject = await createComponent();
  });

  it('sets the default properties correctly', async () => {
    expect(subject.point).to.equal("right");
    expect(subject.text).to.equal("Tag");
  });


  it('manages point attribute correctly', async() => {
    let pointValue = "left";

    subject.setAttribute('point', pointValue);
    expect(subject.point).to.equal(pointValue);

    pointValue = "right";

    subject.setAttribute('point', pointValue);
    expect(subject.point).to.equal(pointValue);
  });

  it('manages text attribute correctly', async() => {
    let textValue = "Testing service";
    subject.setAttribute("text", textValue);
    expect(subject.text).to.equal(textValue);
  });

  it('renders the passed text into a span', async() => {
    let textValue = "Testing service";
    subject.setAttribute('text', textValue);
    await elementUpdated(subject);

    const spanEl = subject.shadowRoot
      ? (subject.shadowRoot.querySelector('span') as HTMLSpanElement)
      : (subject.querySelector('span') as HTMLSpanElement);

    await expect(spanEl.textContent).to.equal(textValue);
  });

  it('it meets accessibility requirements', async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
