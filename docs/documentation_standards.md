# Code Documentation Standards

We document code at three levels:
1. **Self-Documenting Code** (clean naming).
2. **In-Code Comments** (explaining the why, not the what, and TSDocs).
3. **Markdown Documentation** (explaining architecture and features).

---

## 1. Good vs. Bad In-Code Comments

### Rule: Explain the *Why*, Not the *What*
Comments that merely restate what the code does are redundant. Only write comments when the logic is not obvious or if you are using a workaround.

#### BAD (Explaining the *What*):
```typescript
// Increment the count by 1
count += 1;

// Fetch articles from the database
const articles = await fetchArticles();

// Check if the user is an admin
if (user.role === 'admin') {
  showAdminDashboard();
}
```

####  GOOD (Explaining the *Why*):
```typescript
// We add a 1px buffer to account for rounding errors in Safari's layout engine
const scrollBuffer = 1;

// Sanity content lake CDN has a 60s cache latency. We use draft Mode bypass
// when fetching articles in preview mode to show edits instantly.
const queryOptions = isPreviewMode ? { useCdn: false } : {};

// We check 'admin' role specifically. Other management roles (e.g., editor)
// only have access to the CMS sub-routes, not the primary admin panel.
if (user.role === 'admin') {
  showAdminDashboard();
}
```

---

## 2. JSDoc & TSDoc Standards

Use JSDoc/TSDoc syntax (`/** ... */`) for utility functions, custom React hooks, and complex component props. Most editors (like VS Code) will read these block comments and show them as hover tips when developers use your functions.

### A. Documenting a Utility Function
```typescript
/**
 * Formats an ISO date string into an IEEE-standard readable format.
 *
 * @param dateString - The ISO date string to format (e.g. "2026-06-06").
 * @returns The formatted date string (e.g., "June 6, 2026").
 * 
 * @example
 * ```ts
 * const eventDate = formatReadableDate("2026-06-06");
 * // returns "June 6, 2026"
 * ```
 */
export function formatReadableDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
```

### B. Documenting a Custom Hook
```typescript
/**
 * Custom hook to fetch and filter upcoming IEEE events from Sanity.
 * 
 * @param limit - The maximum number of events to fetch. Defaults to 5.
 * @returns An object containing the events array, loading status, and error object.
 */
export function useUpcomingEvents(limit: number = 5) {
  // Hook implementation ...
}
```


---

## 3. Feature Documentation Template (Markdown)

When you add a major feature (like authentication, Sanity webhooks, or search), create a file in `docs/features/<feature-name>.md` using this format:

```markdown
# Feature: [Feature Name]

A short overview of what this feature does and why it exists (2-3 sentences should enough).

## What it does / rules
- Any important rules or constraints (e.g. who can access it, what’s allowed or not)

## How it works
- A simple step-by-step explanation of the flow  
  (e.g. Sanity -> API -> frontend)

## Setup (if needed)
List any environment variables or setup steps:
- `SECRET_API_KEY`: what it’s for and where to get it

## Edge cases/limitations
- Things that might break or behave differently than expected
- Example: “Content may take a few seconds to update due to caching”
```