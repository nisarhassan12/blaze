import { newE2EPage } from '@stencil/core/dist/testing';

export default (name) => (testName, html) =>
  test(testName, async () => {
    const page = await newE2EPage();
    await page.setContent(html);
    const element = await page.find(`${name}`);

    await page.waitForChanges();

    if (element.shadowRoot) {
      return expect(element.shadowRoot.innerHTML).toMatchSnapshot();
    }

    expect(element.outerHTML).toMatchSnapshot();
  });
