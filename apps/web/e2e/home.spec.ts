import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the landing page and display the hero heading', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', {
      level: 1,
      name: 'Instrumenting Harmony',
    });
    await expect(heading).toBeVisible();
  });
});
