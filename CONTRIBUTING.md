# Contributing and General Coding Standards

Thank you for contributing to the IEEE Student Chapter Website! To maintain high code quality, sustainability, and readability, please follow these guidelines and standards.

---

## 1. Coding Standards

### A. General Principles
- **Keep it simple:** Write code that is easy to understand, even for beginner developers who join the team next year. Avoid complex, over-engineered architectures.
- **No placeholders:** Never check in placeholder content ("lorem ipsum" or dummy images) to the `main` branch.
- **Clean console:** Avoid leaving `console.log` statements in production code. Only `console.warn` and `console.error` are permitted for debugging.
- **Component reusability:** Break large components into smaller, reusable ones.

### B. Naming Conventions
Follow these strict naming rules across the repository:

| Asset Type | Convention | Example |
| :--- | :--- | :--- |
| **React Components** | **PascalCase** | `EventCard.tsx`, `HeroSection.tsx` |
| **Helper Functions/Files** | **camelCase** | `formatDate.ts`, `slugify.ts` |
| **Custom React Hooks** | **camelCase** (starts with `use`) | `useArticleData.ts` |
| **Folder Names** | **kebab-case** | `schema-types`, `ui-components` |
| **Environment Variables** | **UPPER_SNAKE_CASE** | `NEXT_PUBLIC_SANITY_PROJECT_ID` |

### C. Formatting & Linting
Our codebase uses **Prettier** for formatting and **ESLint 9** for syntax validation.
- Run code formatting locally before committing:
  ```bash
  npm run lint
  ```
- Make sure your editor has the **Prettier** extension installed and configured to "Format on Save".

---

## 2. Git and Commit Guidelines

We enforce a strict Git workflow to keep our history clean and make tracking changes easy.

### A. Branch Names
Branch names must start with a category prefix:
- `feat/feature-description` (e.g., `feat/add-events-calendar`)
- `fix/bug-description` (e.g., `fix/navbar-overlap-on-mobile`)
- `docs/documentation-topic` (e.g., `docs/update-onboarding-guide`)
- `refactor/code-optimization` (e.g., `refactor/clean-up-post-schemas`)

### B. Commit Messages (Conventional Commits)
We use the **Conventional Commits** specification. Commit messages should look like this:

`type: description`

- **`feat:`** A new feature (e.g., `feat: add contact form page`)
- **`fix:`** A bug fix (e.g., `fix: resolve hydration warning on navbar`)
- **`docs:`** Documentation changes only (e.g., `docs: add playwright instructions`)
- **`style:`** Changes that do not affect code logic (white-space, formatting, missing semi-colons)
- **`refactor:`** A code change that neither fixes a bug nor adds a feature (e.g., split a component into smaller parts)

*Example:* `feat: add sanity schema for curriculum articles`

---

## 3. Pull Request Requirements

Before a Pull Request (PR) is merged:
1. Your code must pass all GitHub Actions status checks (Linting, TypeScript compilation, and Playwright E2E tests).
2. At least one Web Dev Team Lead must review and approve your PR.
3. Resolve any merge conflicts with `main` before requesting reviews.
4. **Documentation:** If your changes introduce new commands, features, or CMS schemas, update the relevant markdown files in `docs/` or the root `README.md`.

---

## 4. Writing Tests & Validations
We require testing for core user flows and utility functions.
- To learn how to write Playwright E2E tests or unit tests, read our [Testing Guide](file:///home/cosmo/Desktop/UI/IEEE/ieee-web/docs/testing_guide.md).

---

## 5. AI Usage Guidelines

Using AI coding assistants (such as Gemini, ChatGPT, Claude, or GitHub Copilot) is permitted and encouraged for learning, debugging, and code generation, provided you follow these rules:

- **Provide Context:** Always provide full project context to the AI. This prevents the AI from generating incompatible code.
- **Review and Understand:** Never blindly copy-paste AI-generated code. You must fully understand what the generated code does and ensure it complies with our naming conventions and styling standards.
- **Run Local Verifications:** Before pushing any AI-assisted code, always run local checks (`npm run lint`, `npm run typecheck`, and E2E tests `npm run test:e2e`) to verify that the code compiles and functions correctly.
