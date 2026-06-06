# Architecture and Modular Design Guide

To keep our website code organized and easy to maintain, we follow a **Modular Component Architecture** and a clear folder structure. This prevents the code from turning into a mess as we add more features.

---

## 1. Directory Structure

Our project uses **npm workspaces** to separate the Next.js website and the Sanity CMS Studio.

```
ieee-web/
├── apps/
│   ├── web/                           # Next.js Frontend Application
│   │   ├── e2e/                       # Playwright Browser E2E Tests
│   │   ├── public/                    # Static Assets (Images, Favicons)
│   │   └── src/                       # Application Source Code
│   │       ├── app/                   # Next.js App Router (Routes & Layouts)
│   │       ├── components/            # Reusable UI & Common Layout components
│   │       └── features/              # Feature-based modular domains (Articles, Events)
│   │
│   └── studio-ieee-sbui-website/      # Sanity Studio CMS
│       ├── schemaTypes/               # CMS content schemas (Posts, Authors)
│       └── static/                    # Static CMS assets
│
├── docs/                              # Project Documentation Guides
└── package.json                       # Monorepo Workspaces Configuration
```

---

## 2. Modular Component Architecture

Inside `apps/web/src/components/` and `src/features/`, we categorize React components into three distinct folders:

```
src/
├── components/
│   ├── ui/          # Atoms (Button, Input, Badge) - generic, no business logic
│   └── common/      # Layout (Navbar, Footer, Sidebar) - app-level structures
└── features/
    ├── articles/    # Articles feature domain (ArticleCard, ArticleList)
    └── events/      # Events feature domain (EventCard, EventMap)
```

### A. UI Components (`src/components/ui/`)
- **What they are:** Simple building blocks (Atoms). Examples: Buttons, Modals, Inputs, Cards, Badges.
- **Rules:** 
  - Should be **stateless** and **generic**.
  - Don’t fetch data or contain business logic.
  - Receive values via React `props` and just render them.
- *Example:* A simple `Button.tsx` with `label`, `onClick`, and `variant` props.

### B. Common Components (`src/components/common/`)
- **What they are:** Layout components used across multiple pages.
- *Examples:* `Navbar.tsx`, `Footer.tsx`, `MobileMenu.tsx`.

### C. Feature Domains (`src/features/`)
- **What they are:** Components grouped by business feature.
  - `features/events/`: `EventCard.tsx`, `EventGrid.tsx`, `useEvents.ts`
  - `features/articles/`: `ArticleCard.tsx`, `ArticleDetail.tsx`, `useArticles.ts`
- **Rules:** 
  - Feature components can use `components/ui/` but should rarely import from other features (to avoid circular dependencies).
  - Keep features self-contained. Editing a feature should only require touching its own folder.

---

## 3. Component Design Principles

### A. Single Responsibility (SRP)
Each component should do **one thing well**.
- If a component displays an article AND handles fetching the author details AND renders a comment form, it is too big.
- **Fix:** Split it into `ArticleContent`, `AuthorCard`, and `CommentSection`.

### B. TypeScript Types
Always explicitly type your props. Never use `any`.
```typescript
interface EventCardProps {
  title: string;
  date: string;
  location: string;
  isRegistered: boolean;
  onRegister: () => void;
}

export function EventCard({ title, date, location, isRegistered, onRegister }: EventCardProps) {
  return (
    // ...
  );
}
```