// Temporary file for testing Playwright setup
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the landing page and display starter content', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('To get started, edit the page.tsx file.');

    const docLink = page.locator('text=Documentation');
    await expect(docLink).toBeVisible();
    await expect(docLink).toHaveAttribute('href', /.*nextjs.org\/docs.*/);
  });
});
