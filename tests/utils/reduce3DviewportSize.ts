import type { Page } from '@playwright/test';

export const reduce3DViewportSize = async (page: Page) => {
  const viewport = await page.waitForFunction(
    () => {
      const cornerstone = (window as any).cornerstone;
      return cornerstone
        ?.getEnabledElements()
        .find(element => element.viewport?.type === 'volume3d')?.viewport;
    },
    undefined,
    { timeout: 60_000 }
  );

  try {
    await viewport.evaluate(viewport => {
      viewport.setZoom(0.5);
      viewport.render();
    });
  } finally {
    await viewport.dispose();
  }
};
