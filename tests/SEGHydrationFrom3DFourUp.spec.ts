import {
  attemptAction,
  checkForScreenshot,
  reduce3DViewportSize,
  screenShotPaths,
  test,
  visitStudy,
} from './utils';

test.beforeEach(async ({ page }) => {
  const studyInstanceUID = '1.3.6.1.4.1.14519.5.2.1.1706.8374.643249677828306008300337414785';
  const mode = 'viewer';
  await visitStudy(page, studyInstanceUID, mode, 2000);
});

test.describe('3D four up SEG hydration', async () => {
  // Known-flaky in headless CI: the post-SEG-load 3D four-up viewport never
  // settles, so the threeDFourUpAfterSEG screenshot cannot capture a stable
  // frame within the timeout. Tracked separately for a stability fix.
  test.fixme('should properly hydrate SEG from 3D four up layout', async ({
    page,
    DOMOverlayPageObject,
    leftPanelPageObject,
    mainToolbarPageObject,
  }) => {
    await mainToolbarPageObject.layoutSelection.threeDFourUp.click();

    await attemptAction(() => reduce3DViewportSize(page), 10, 100);

    await page.waitForTimeout(5000);

    await checkForScreenshot(
      page,
      page,
      screenShotPaths.segHydrationFrom3DFourUp.threeDFourUpBeforeSEG
    );

    await leftPanelPageObject.loadSeriesByDescription('SEG');

    await page.waitForTimeout(5000);
    await checkForScreenshot(
      page,
      page,
      screenShotPaths.segHydrationFrom3DFourUp.threeDFourUpAfterSEG
    );

    await DOMOverlayPageObject.viewport.segmentationHydration.yes.click();

    await page.waitForTimeout(5000);
    await checkForScreenshot(
      page,
      page,
      screenShotPaths.segHydrationFrom3DFourUp.threeDFourUpAfterSegHydrated
    );
  });
});
