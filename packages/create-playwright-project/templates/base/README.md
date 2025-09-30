# Playwright TypeScript Project

A modern Playwright testing framework built with TypeScript and the [@netanelh2/playwright-framework](https://www.npmjs.com/package/@netanelh2/playwright-framework).

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   npx playwright install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env
   # Edit .env with your application URL and settings
   ```

3. **Run tests:**
   ```bash
   npm test              # All tests
   npm run test:headed   # With browser UI
   npm run test:debug    # Debug mode
   npm run test:ui       # Playwright UI mode
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
- **Quality Gates:** ESLint + Prettier + TypeScript validation

## Available Scripts

| Script                    | Description                                |
| ------------------------- | ------------------------------------------ |
| `npm test`                | Run all tests                              |
| `npm run test:chrome`     | Run tests in Chromium only                 |
| `npm run test:sanity`     | Run tests tagged with `@sanity`            |
| `npm run test:regression` | Run tests tagged with `@regression`        |
| `npm run test:debug`      | Run tests in debug mode                    |
| `npm run test:ui`         | Launch Playwright UI mode                  |
| `npm run report`          | View test results                          |
| `npm run quality-check`   | Run linting, formatting, and type checking |
| `npm run format:fix`      | Auto-fix code formatting                   |

## Writing Tests

```typescript
import {test} from '@/fixtures'

test.describe('Example Feature @sanity', () => {
  test('should perform basic action', async ({mainPage}) => {
    await mainPage.navigateTo()
    await mainPage.validatePageLoaded()
  })
})
```

## Environment Variables

Configure your `.env` file:

```env
BASE_URL=https://your-app.com
# Add other environment variables as needed
```

## Documentation

- [Framework Documentation](https://github.com/NetanelH2/playwright-framework-suite#readme)
- [Playwright Docs](https://playwright.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## License

MIT
