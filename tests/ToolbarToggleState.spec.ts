import { expect, test, visitStudy } from './utils';

for (const { tool, initiallyEnabled } of [
  { tool: 'referenceLines', initiallyEnabled: true },
  { tool: 'imageOverlay', initiallyEnabled: true },
] as const) {
  test(`shows a persistent background when ${tool} is enabled`, async ({
    page,
    mainToolbarPageObject,
  }) => {
    await visitStudy(page, '1.3.6.1.4.1.25403.345050719074.3824.20170125095438.5', 'viewer', 2000);

    const moreTools = mainToolbarPageObject.moreTools;
    const { button } = moreTools[tool];
    const transparent = 'rgba(0, 0, 0, 0)';
    const background = () => button.evaluate(element => getComputedStyle(element).backgroundColor);

    async function expectEnabledBackground(enabled: boolean) {
      // Move off the menu item so focus/hover cannot masquerade as the enabled state.
      await page.mouse.move(0, 0);
      if (enabled) {
        await expect(button).not.toHaveCSS('background-color', transparent);
        const enabledBackground = await background();
        await button.hover();
        await expect(button).toHaveCSS('background-color', enabledBackground);
      } else {
        await expect(button).toHaveCSS('background-color', transparent);
      }
    }

    await moreTools.click();
    await expectEnabledBackground(initiallyEnabled);
    const initialBackground = await background();

    await button.click();
    await moreTools.click();
    await expectEnabledBackground(!initiallyEnabled);
    expect(await background()).not.toBe(initialBackground);

    await button.click();
    await moreTools.click();
    await expectEnabledBackground(initiallyEnabled);
    expect(await background()).toBe(initialBackground);
  });
}
