import { expect, test, visitStudy } from './utils';
import { assertBoundingBoxIsContainedWithin } from './utils/assertions';

for (const width of [1024, 1280]) {
  test(`keeps undo and redo inside the header without overlapping tools at ${width}px`, async ({
    page,
    mainToolbarPageObject,
    viewportPageObject,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await visitStudy(page, '1.3.6.1.4.1.25403.345050719074.3824.20170125095438.5', 'viewer', 2000);

    const { header, undo, redo } = mainToolbarPageObject;
    await expect(undo.button).toBeVisible();
    await expect(redo.button).toBeVisible();

    await expect(async () => {
      const [headerBox, historyBox, undoBox, redoBox, primaryBox, gridBox] = await Promise.all([
        header.locator.boundingBox(),
        header.history.boundingBox(),
        undo.button.boundingBox(),
        redo.button.boundingBox(),
        header.primary.boundingBox(),
        viewportPageObject.grid.boundingBox(),
      ]);

      for (const [label, box] of [
        ['Undo', undoBox],
        ['Redo', redoBox],
      ] as const) {
        assertBoundingBoxIsContainedWithin({
          innerBox: box,
          outerBox: headerBox,
          innerBoxLabel: label,
          outerBoxLabel: 'Header',
        });
      }

      expect(historyBox).not.toBeNull();
      expect(primaryBox).not.toBeNull();
      expect(gridBox).not.toBeNull();
      expect(undoBox.x + undoBox.width).toBeLessThanOrEqual(redoBox.x);
      expect(Math.abs(undoBox.y - redoBox.y)).toBeLessThanOrEqual(1);
      expect(primaryBox.x + primaryBox.width).toBeLessThanOrEqual(historyBox.x);
      expect(historyBox.y + historyBox.height).toBeLessThanOrEqual(gridBox.y);
    }).toPass({ timeout: 10_000 });
  });
}
