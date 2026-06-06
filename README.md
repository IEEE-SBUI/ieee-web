# IEEE Student Chapter Website

Welcome to the official repository for the IEEE Student Chapter Website!

---

## 1. Project Architecture

This project is structured as a **Monorepo** using **npm workspaces**. It contains two main applications:

1. **`apps/web` (Next.js 16):**  This is the frontend application that is publicly accessible. Besides displaying static content, it also fetches articles dynamically from the CMS.
2. **`apps/studio-ieee-sbui-website` (Sanity Studio):** The content editor dashboard. This is where the Curriculum and Journalism team (and other authorized users) create, schedule, publish content.

---

## 2. Local Environment Setup

You can run this project either directly on your host machine or containerized via Docker.

### Option A: Local Host Setup (Recommended)

Ensure you have **Node.js 20+** installed on your computer.

1. **Clone the repository:**
   Download the codebase to your local computer:
   ```bash
   git clone https://github.com/<your-org>/ieee-web.git
   cd ieee-web
   ```

2. **Setup Environment Variables:**
   Copy the template file to create your local config file:
   ```bash
   cp .env.local.example apps/web/.env.local
   ```
   *Note: Open `apps/web/.env.local` in your editor and configure your Sanity Project Credentials.*

3. **Install Dependencies:**
   Install all package packages for the monorepo:
   ```bash
   npm install
   ```

4. **Start Development Server:**
   Launch the development mode for both frontend and CMS:
   ```bash
   npm run dev
   ```
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio CMS: [http://localhost:3333](http://localhost:3333)

---

### Option B: Docker Setup (Alternative)

If you prefer to run inside Docker to avoid installing Node locally:

1. **Copy Environment Variables:**
   ```bash
   cp .env.local.example apps/web/.env.local
   ```

2. **Build and Run:**
   Use the `Makefile` helper commands:
   ```bash
   make setup   # Builds the Docker container
   make dev     # Starts the server in docker compose
   ```
   - Website is available at [http://localhost:3000](http://localhost:3000).

3. **Stop server:**
   ```bash
   make down
   ```

---

## 3. Core Commands Reference

Run these commands directly from the **repository root**:

| Action | Command | Description |
| :--- | :--- | :--- |
| **Start Dev Server** | `npm run dev` | Runs both Web frontend and CMS dev servers |
| **Run Linting** | `npm run lint` | Checks code style and formatting rules |
| **Type Check** | `npm run typecheck` | Validates TypeScript compiler types |
| **Production Build** | `npm run build` | Compiles the production version of both workspaces |
| **Run E2E Tests** | `npm run test:e2e` | Runs Playwright tests (automatically boots server) |

---

## 4. Using Git and Github for Your Workflow

### Step 1: Configure Git on your computer
Open your terminal and run:
```bash
git config --global user.name "Your First and Last Name"
git config --global user.email "your.email@example.com"
```

### Step 2: Create a Feature Branch
Never write code directly on the `main` branch. Always create a new "branch" (which will be an isolated workspace for your edits):
1. Make sure you are on main and up-to-date:
   ```bash
    # Switch to main
    git checkout main

    # Make sure you have the latest info from the remote
    git fetch origin

    # Update your local main with any remote changes
    git pull origin main --rebase
   ```
2. Create and switch to your new branch (name it according to what you are doing):
   ```bash
   # Use feat/ for new features, fix/ for bug fixes
   git checkout -b feat/add-about-us-section
   ```

### Step 3: Write Code and Test Locally
Write your HTML, CSS, or TypeScript code. Check your browser to make sure it looks correct. Before saving, check for syntax or style warnings:
```bash
npm run lint
```

### Step 4: Stage and Commit Your Changes
"Staging" tells Git which files you want to save, and "Committing" saves them with a message:
1. View what files you have modified:
   ```bash
   git status
   ```
2. Stage all your changes:
   ```bash
   git add .
   ```
3. Commit with a descriptive message explaining what you changed. Do not just say "added some code". Example:
   ```bash
   git commit -m "feat: add team members grid to about page"
   ```

### Step 5: Push to GitHub & Create a Pull Request (PR)
1. Push your branch to GitHub:
   ```bash
   git push -u origin feat/add-about-us-section
   ```
2. Go to our GitHub repository webpage. You will see a green button that says **"Compare & pull request"**. Click it. Alternatively, you can go to the **Pull requests** tab on the repository and create a new pull request from your branch to the main branch.
3. Fill out the PR template explaining your changes and click **"Create pull request"**.
4. After you open a pull request, automated **checks** will run (linting, type-checking, and tests). Once everything passes and someone reviews it, your changes can be merged into main and deployed.
---

## 5. Contribution Guidelines

1. **Branch Naming:**
   - Feature additions: `feat/feature-name`
   - Bug fixes: `fix/bug-name`
   - Refactoring/Docs: `docs/documentation-name` or `refactor/clean-code`
2. **Quality Checks before Committing:**
   Always run linting and typechecking locally before committing:
   ```bash
   npm run lint
   ```
3. **Pull Request Checklist:**
   - Ensure the build succeeds locally (`npm run build`).
   - Write clear, concise commit messages.
   - Describe your changes in the PR template, attaching screenshots/video for UI changes.


## 6. Playwright End-to-End (E2E) Testing

We use **Playwright** for browser automation testing to ensure our user interfaces work correctly across various browsers (Chrome, Firefox, Safari, etc).

### Running & Debugging Tests Locally:
- **Run all E2E tests headless:**
  ```bash
  npm run test:e2e
  ```
- **Open Playwright UI Mode (Interactive Dashboard):**
  
  Useful for writing new tests and step-by-step debugging. Run this from `apps/web/`:
  ```bash
  cd apps/web
  npx playwright test --ui
  ```
- **View Last HTML Report:**
  
  If a test fails locally, view the visual report:
  ```bash
  cd apps/web
  npx playwright show-report
  ```

*For guidelines on how to write new tests, navigate to the `apps/web/e2e/` directory or read the testing guideline in docs/testing_guide.md.*

---

## 7. Git & CI/CD Pipeline Workflow


### GitHub Actions CI Workflows:
Every Pull Request targeting the `main` branch triggers three automated pipelines:
1. **Quality Checks (`ci.yml`):** Runs ESLint 9 checks to verify code style, and TypeScript compiler validations.
2. **E2E Tests (`e2e.yml`):** Automatically spins up the server in a headless runner, downloads browser binaries, and executes all Playwright E2E tests.
3. **Lighthouse Audits (`lighthouse.yml`):** Runs Google Lighthouse audits on our pages to enforce performance, accessibility, and SEO budgets. 
   - *For details on how budgets are enforced and how to keep pages fast, read the [Lighthouse Guide](file:///home/cosmo/Desktop/UI/IEEE/ieee-web/docs/lighthouse.md).*

### Continuous Deployment (CD):
- Merging to `main` automatically triggers a production deployment to **Vercel** for the frontend, and updates the schema for the CMS.
- Every Pull Request generates an isolated **Vercel Preview URL** where you can review design and functional changes in a live environment before merging.