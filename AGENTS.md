# AI Coding Agent Guide

Purpose: Make agents instantly productive in this Playwright + TypeScript test framework by codifying how this repo is structured, how to run it, and how to extend it safely.

## Modern Tooling Stack

This framework uses cutting-edge tooling for optimal developer experience:

- **Biome** - Ultra-fast linter and formatter (Rust-based, `biome.json` configuration)
- **TypeScript 5.x** - Type safety with project references for incremental builds
- **Husky** - Git hooks for pre-commit quality checks

## Project Shape (big picture)

- Test stack: Playwright + TypeScript using a 3-layer model.
- Layers: `core/` (foundations), `pages/` (Page Objects), `tests/` (specs) with fixtures in `fixtures/` and locators in `locators/`.
- Imports: use relative paths (e.g., `import {MainPage} from '../pages/MainPage'`). No barrel imports or path aliases.
- Test dir: Playwright runs specs from `src/tests` (see `playwright.config.ts`).

## How Things Work

- Page Objects extend `BasePage` (which extends `LocatorUtils`) for shared actions and locator extraction.
- Locators are centralized under `src/locators/**`; prefer role-based objects over raw selector strings.
- Fixtures (`src/fixtures/testSetup.ts`) inject ready-to-use page objects into tests (e.g., `{mainPage, topMenuMainPage, ...}`) via the custom `test` export. Import directly from the fixtures file using relative paths.
- Environment: load secrets/URLs via `.env` and `getEnvCredentials(...)` in `src/helpers/envUtils.ts`.
- Playwright config: retries only in CI and only when tag-filtering (via `TEST_TAGS`) for `@sanity`/`@regression`; traces/videos/screenshots kept on failures.

## Conventions That Matter

- Page Objects: `*Page` classes in `src/pages/**` extending `BasePage`; expose high-level business actions only.
- Locator names: `UPPER_SNAKE_CASE` with `_LOCATORS` suffix (e.g., `LOGIN_PAGE_LOCATORS`).
- Locators: use `StringOrRoleLocatorType` from `src/types/locatorTypes.ts`.
  - Preferred: `{ role: 'button', name: 'Submit' }` or with parent `{ parent: '.form', role: 'textbox', name: 'Username' }`.
- Tests: place under `src/tests/**`, name with `.spec.ts`. Import the custom `test` from your fixtures file using relative paths (not from `@playwright/test`).
- Steps: group meaningful actions with `test.step(...)` inside page methods where helpful.
- Tags: classify suites with `@sanity` or `@regression` in describe titles to enable targeted runs (see commands below).
- Code quality: Biome handles both linting and formatting via `biome.json` config; violations fail CI. Configuration is in the root `biome.json` file.
- Locator resolution (from code):
  - For string locators: `page.locator(...) → page.getByLabel(...) → page.getByText(...)`.
  - For role locators: `page.getByRole(role, {name})`, with optional `parent` via `page.locator(parent).getByRole(...)`.

## Typical Addition (minimal example)

```ts
// src/locators/content-pages/Login_Page.ts
export const LOGIN_PAGE_LOCATORS = {
  form: {parent: '#login', role: 'textbox', name: 'Username'},
  submit: {role: 'button', name: 'Submit'},
} as const

// src/pages/LoginPage.ts
import {BasePage} from '../core/BasePage'
import {BASE_URL} from '../data/urls'
import {LOGIN_PAGE_LOCATORS as L} from '../locators/content-pages/Login_Page'
export class LoginPage extends BasePage {
  async navigateTo(): Promise<void> {
    await this.gotoURL(BASE_URL + '/login')
  }
  async validateLoaded(): Promise<void> {
    await this.validateVisibility(L.form)
  }
}

// src/tests/main.spec.ts (fixture-based injection)
import {test} from '../fixtures/testSetup'
test.describe('Main Page @sanity', () => {
  test('loads and shows content', async ({mainPage}) => {
    await mainPage.openMainPage()
    await mainPage.validateContactOnMainPage()
  })
})
```

## Run, Debug, Quality

- Install once: `npm install && npx playwright install`
- All tests: `npm test`
- Sanity set: `npm run test:sanity` (sets `TEST_TAGS='@sanity'`)
- Regression set: `npm run test:regression`
- Chromium only: `npm run test:chrome`
- Debug inspector: `npm run test:debug`
- Report viewer: `npm run report`
- Quality gates: `npm run check` (Biome lint + format + `tsc`)
- Auto-fix: `npm run fix` (Biome auto-fix)
- Format check: `npm run format:check`

Notes

- CI/GitHub Actions use the same scripts; retries apply only in CI when `TEST_TAGS` targets `@sanity`/`@regression` (see `playwright.config.ts`).
- Prefer role-based locators from `src/locators/**` and avoid inline CSS/XPath in tests.
- Access env via `getEnvCredentials('KEY')`; define keys in `.env` locally (never commit secrets).
- Keep page classes small; move cross-cutting helpers to `src/helpers/**`.

## Environment & URLs

- Define `BASE_URL` in `.env` (e.g., `BASE_URL=https://www.example.com`).
- `src/data/urls.ts` exposes `BASE_URL` via `getEnvCredentials('BASE_URL')`.
- In pages, import `BASE_URL` from `../data/urls` (using relative path) and compose full paths when navigating (e.g., `await this.gotoURL(BASE_URL + '/login')`).

Reference Files

- `src/core/BasePage.ts`, `src/core/LocatorUtils.ts` — shared actions and locator extraction
- `src/fixtures/testSetup.ts` — fixture-based dependency injection
- `src/data/urls.ts` — environment-aware URLs
- `src/types/locatorTypes.ts` — locator typing contract
- `playwright.config.ts` — test dir, reporters, retries, tags
- `biome.json` — Biome linter and formatter configuration
- `package.json` — scripts for test/quality
