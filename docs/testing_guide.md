# Testing Guide

We use automated testing to verify that our website works correctly and doesn't break when making edits. This guide explains how to write both **End-to-End (E2E) Browser Tests** and **Unit Tests**.

---

## 1. End-to-End (E2E) Testing with Playwright

E2E tests open a headless browser, navigate the website, and simulate real user actions (clicking buttons, typing into forms, navigating pages).

### A. Test File Location & Naming
- All E2E test files live in `apps/web/e2e/`.
- Test files must end with the `.spec.ts` suffix (e.g., `home.spec.ts`).

### B. Creating a Basic Test Case
Create a new file `apps/web/e2e/about.spec.ts` and add the following example:

```typescript
import { test, expect } from '@playwright/test';

test.describe('About Page Tests', () => {
  // This test verifies the page loads and has the correct header
  test('should display the About Us heading', async ({ page }) => {
    // 1. Navigate to the page
    await page.goto('/about');

    // 2. Locate the header element and assert it is visible
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText('About IEEE Student Chapter');
  });

  // This test checks a user interaction (like opening a FAQ item)
  test('should expand a FAQ answer when clicked', async ({ page }) => {
    await page.goto('/about');

    // 1. Locate the accordion button
    const faqQuestion = page.locator('text=How can I join?');
    await expect(faqQuestion).toBeVisible();

    // 2. Click the question
    await faqQuestion.click();

    // 3. Locate the answer and assert it has expanded/become visible
    const faqAnswer = page.locator('text=You can register via the Join link');
    await expect(faqAnswer).toBeVisible();
  });
});
```

### C. Common Playwright Selectors
Always choose robust, user-visible selectors rather than fragile CSS classes:
- **By Text:** `page.locator('text=Join Now')` or `page.getByText('Join Now')` (Matches what users see).
- **By Role:** `page.getByRole('button', { name: 'Submit' })` (Semantic and accessible).
- **By Test ID:** If an element is hard to select, add `data-testid="contact-form-submit"` in your HTML and select it with `page.getByTestId('contact-form-submit')`.

---

## 2. Unit Testing with Vitest

Unit tests check small, isolated JavaScript/TypeScript functions (e.g., date formatters, URL parsers, input validators) without opening a browser.

### A. Test File Location & Naming
- Colocate your test files directly next to the code you are testing.
- Test files must end with `.test.ts` or `.test.tsx`.
- *Example:* If you have `src/utils/formatDate.ts`, create `src/utils/formatDate.test.ts` in the same directory.

### B. Creating a Unit Test Case
If you have a date utility function:
```typescript
// src/utils/formatDate.ts
export function formatReadableDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
```

Write your test case in the `.test.ts` file:
```typescript
// src/utils/formatDate.test.ts
import { expect, test } from 'vitest';
import { formatReadableDate } from './formatDate';

test('formats date strings into a readable IEEE event format', () => {
  // Test case 1
  expect(formatReadableDate('2026-06-06')).toBe('June 6, 2026');

  // Test case 2
  expect(formatReadableDate('2026-12-25')).toBe('December 25, 2026');
});
```

---

## 3. Best Practices for Writing Reliable Tests

To keep tests useful and easy to maintain, follow these guidelines:

1. **Don’t overtest (keep it focused):**  
   Only test the important user flows, such as landing page loading, navigation, and key forms (Contact, Join, etc.). Avoid testing small UI details like spacing, animations, or hover effects since they change often and don’t add much value in E2E tests.

2. **Use AI to help write tests (Recommended):**  
  It is recommended to use tools like ChatGPT, Copilot, or Gemini to generate Playwright tests since it’s generally faster and helps you avoid missing important edge cases. Just make sure you:   
    - Provide the component or page code  
    - Include our `playwright.config.ts`  
    - Ask it to focus only on the main user flow  

   Also, always run the generated test locally before committing.

3. **Always include assertions:**  
   Every test should have at least one `expect(...)`. If a test only opens a page without checking anything, it’s not actually testing anything meaningful.

