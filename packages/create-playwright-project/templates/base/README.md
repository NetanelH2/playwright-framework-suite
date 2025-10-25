# Playwright TypeScript Project

A modern Playwright testing framework built with TypeScript and the [@netanelh2/playwright-framework](https://www.npmjs.com/package/@netanelh2/playwright-framework).

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   npx playwright install
   ```
   
3. **Run tests:**
   ```bash
   npm test              # All tests
   npm run test:headed   # With browser UI
   npm run test:debug    # Debug mode
   ```

## Project Structure

```
src/
├── tests/           # Test specifications
├── pages/           # Page Object Models
├── locators/        # Centralized locators
├── fixtures/        # Test fixtures and setup
├── helpers/         # Utility functions
└── types/           # TypeScript type definitions
```

## Key Features

- **3-Layer Architecture:** Core framework, Page Objects, and Test specifications
- **Type-Safe Locators:** Role-based locator system with TypeScript support
- **Environment Management:** Secure credential handling via `.env` files
- **Fixture-Based Testing:** Dependency injection for page objects
- **Tag-Based Execution:** Run `@sanity` or `@regression` test suites
- **Quality Gates:** Biome (linting + formatting) + TypeScript validation

## Available Scripts

| Script                           | Description                                |
| -------------------------------- | ------------------------------------------ |
| `npm test`                       | Run all tests                              |
| `npm run test:headed`            | Run tests with browser UI                  |
| `npm run test:chrome`            | Run tests in Chromium only                 |
| `npm run test:sanity`            | Run tests tagged with `@sanity`            |
| `npm run test:regression`        | Run tests tagged with `@regression`        |
| `npm run test:sanity:chrome`     | Run `@sanity` tests in Chromium only       |
| `npm run test:regression:chrome` | Run `@regression` tests in Chromium only   |
| `npm run test:debug`             | Run tests in debug mode                    |
| `npm run report`                 | View test results                          |
| `npm run codegen`                | Launch Playwright code generator           |
| `npm run check`                  | Run Biome linting, formatting, and type checking |
| `npm run type-check`             | Run TypeScript type checking               |
| `npm run pre-commit`             | Run pre-commit hooks (lint-staged)         |
| `npm run trigger-ci`             | Trigger CI workflows for testing           |

## Writing Tests

```typescript
import {test} from '../fixtures/testSetup'

test.describe('Example Feature @sanity', () => {
  test('should perform basic action', async ({mainPage}) => {
    await mainPage.navigateTo()
    await mainPage.validatePageLoaded()
  })
})
```

## Documentation

- [Framework Documentation](https://github.com/NetanelH2/playwright-framework-suite#readme)
- [Playwright Docs](https://playwright.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## License

MIT
