import { readFileSync } from 'fs';
import path from 'path';
import { expect, test, visitStudy } from './utils';
import { assertBoundingBoxIsContainedWithin } from './utils/assertions';

const nextcloudConfigSource = readFileSync(
  path.resolve(__dirname, '../platform/app/public/config/nextcloud.js'),
  'utf8'
);

test.beforeEach(async ({ page }) => {
  // Exercise the real Nextcloud config while serving the local E2E study data.
  await page.route('**/app-config.js*', async route => {
    const response = await route.fetch();
    const e2eConfigSource = await response.text();
    await route.fulfill({
      response,
      body: `${e2eConfigSource}
        (() => {
          const nextcloudWindow = {};
          (function(window) { ${nextcloudConfigSource} })(nextcloudWindow);
          Object.assign(window.config, nextcloudWindow.config, {
            routerBasename: null,
            dataSources: window.config.dataSources,
            defaultDataSourceName: window.config.defaultDataSourceName,
            investigationalUseDialog: { option: 'never' },
            showWarningMessageForCrossOrigin: false,
          });
        })();`,
    });
  });
});

for (const mode of ['viewer', 'segmentation']) {
  test(`positions Nextcloud viewport controls without covering metadata in ${mode}`, async ({
    page,
    viewportPageObject,
  }) => {
    await visitStudy(
      page,
      '1.3.6.1.4.1.14519.5.2.1.1706.8374.643249677828306008300337414785',
      mode,
      2000
    );

    const viewport = await viewportPageObject.active;
    await viewport.pane.hover();
    const { orientation, windowLevel } = viewport.overlayMenu;
    await expect(orientation.button).toBeVisible();
    await expect(windowLevel.button).toBeVisible();

    const [pane, orientationBox, windowLevelBox, metadata] = await Promise.all([
      viewport.pane.boundingBox(),
      orientation.button.boundingBox(),
      windowLevel.button.boundingBox(),
      viewport.overlayText.bottomLeft.locator.boundingBox(),
    ]);
    for (const [label, box] of [
      ['Orientation', orientationBox],
      ['Window/level', windowLevelBox],
    ] as const) {
      assertBoundingBoxIsContainedWithin({
        innerBox: box,
        outerBox: pane,
        innerBoxLabel: label,
        outerBoxLabel: 'Viewport',
      });
    }
    expect(metadata).not.toBeNull();
    expect(orientationBox.x - pane.x).toBeLessThan(10);
    expect(orientationBox.y - pane.y).toBeLessThan(10);
    expect(windowLevelBox.x - pane.x).toBeLessThan(10);
    expect(pane.y + pane.height - windowLevelBox.y - windowLevelBox.height).toBeLessThan(10);
    expect(metadata.y + metadata.height).toBeLessThanOrEqual(windowLevelBox.y);

    await orientation.click();
    await expect(orientation.menu).toBeVisible();
    await orientation.click();
    await expect(orientation.menu).toBeHidden();
    await windowLevel.click();
    await expect(windowLevel.menu).toBeVisible();
  });
}
