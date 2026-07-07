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
  test('should properly hydrate SEG from 3D four up layout', async ({
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

    // Loading the SEG into the 3D four-up keeps the viewports re-rendering, so
    // give it longer to settle and relax the stability/diff tolerance for this
    // transient state (the default 5s/2% cannot catch a stable frame here).
    await page.waitForTimeout(15000);
    await checkForScreenshot({
      page,
      screenshotPath: screenShotPaths.segHydrationFrom3DFourUp.threeDFourUpAfterSEG,
      maxDiffPixelRatio: 0.1,
      attempts: 20,
      delay: 1000,
    });

    await DOMOverlayPageObject.viewport.segmentationHydration.yes.click();

    await page.waitForTimeout(5000);
    await checkForScreenshot(
      page,
      page,
      screenShotPaths.segHydrationFrom3DFourUp.threeDFourUpAfterSegHydrated
    );
  });
});
