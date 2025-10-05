# @netanelh2/playwright-framework

A robust Playwright TypeScript testing framework with Page Object Model, smart locators, and utilities for scalable E2E testing.

> **See also:** [AI Coding Agent Guide (AGENTS.md)](../../AGENTS.md) for advanced usage, conventions, and project structure tips.

A comprehensive Playwright testing framework with TypeScript, providing robust utilities for maintainable E2E testing with a layered architecture.

## Features

- **Three-Layer Architecture**: Core utilities, Page Objects, and test specs
- **Centralized Locator Management**: Role-based locator definitions
- **Fixture-Based Page Injection**: Ready-to-use page objects in tests
- **Type-Safe Environment Handling**: Secure credential management
- **Modern Tooling**: ESLint 9.x flat config, Prettier 3.x, TypeScript 5.x project references

## Installation

## Features

- 🎭 **Built on Playwright**: Leverages the power of Playwright for reliable E2E testing
- 🏗️ **Page Object Model**: Well-structured page objects extending BasePage for consistency
- 🎯 **Smart Locators**: Flexible locator system supporting both CSS selectors and role-based locators
- 🔧 **Test Fixtures**: Pre-configured fixtures for consistent browser context and page management
- 🛠️ **Utilities**: Helper functions for environment variables, array operations, and more
- 📦 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🚀 **Modern ES Modules**: Full ESM support with proper `.js` extensions in imports/exports
- ⚡ **Project References**: Optimized compilation with TypeScript project references

## Installation

```bash
npm install --save-dev @netanelh2/playwright-framework @playwright/test typescript
```

> **Note**: This package uses modern ES modules. Ensure your project has `"type": "module"` in `package.json` and uses `.ts` extensions in relative imports.

## Quick Start

### 1. Create a Page Object

```typescript
import {BasePage, StringOrRoleLocatorType} from '@netanelh2/playwright-framework'

const LOGIN_LOCATORS = {
  usernameInput: {role: 'textbox', name: 'Username'},
  passwordInput: {role: 'textbox', name: 'Password'},
  submitButton: {role: 'button', name: 'Sign In'},
} as const

export class LoginPage extends BasePage {
  async navigateTo(): Promise<void> {
    await this.gotoURL('/login')
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillInput(LOGIN_LOCATORS.usernameInput, username)
    await this.fillInput(LOGIN_LOCATORS.passwordInput, password)
    await this.clickOnElement(LOGIN_LOCATORS.submitButton)
  }

  async validateLoaded(): Promise<void> {
    await this.validateVisibility(LOGIN_LOCATORS.usernameInput)
  }
}
```

### 2. Write Tests

```typescript
import {test, expect} from '@netanelh2/playwright-framework/fixtures'
import {LoginPage} from './pages/LoginPage'

test.describe('Login Flow', () => {
  test('should login successfully', async ({loginPage}) => {
    await loginPage.navigateTo()
    await loginPage.validateLoaded()
    await loginPage.login('testuser', 'password123')

    // Add your assertions here
  })
})
```

## Fixtures

The framework provides pre-configured test fixtures that manage browser context and page lifecycle automatically:

```typescript
import {test, expect} from '@netanelh2/playwright-framework/fixtures'

test('example test', async ({page}) => {
  // Page is automatically created and cleaned up
  await page.goto('https://example.com')
  await expect(page).toHaveTitle(/Example/)
})
```

### Custom Fixtures

You can extend the base fixtures to add your own page objects:

```typescript
import {test as baseTest} from '@netanelh2/playwright-framework/fixtures'
import {LoginPage, DashboardPage} from './pages'

export const test = baseTest.extend({
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page))
  },
  dashboardPage: async ({page}, use) => {
    await use(new DashboardPage(page))
  },
})

export {expect} from '@netanelh2/playwright-framework/fixtures'

// Usage in tests
test('login flow', async ({loginPage, dashboardPage}) => {
  await loginPage.navigateTo()
  await loginPage.login('user', 'pass')
  await dashboardPage.validateLoaded()
})
```

## Core Classes

### BasePage

Base class for all page objects providing common functionality:

- `validateText(locator, text)` - Validate element text content
- `validateURL(expectedURL)` - Validate current page URL
- `gotoURL(url)` - Navigate to a specific URL
- `clickOnElement(locator)` - Click on an element
- `fillInput(locator, text)` - Fill input fields
- `hoverOnElement(locator)` - Hover over elements
- `validateVisibility(locator)` - Check element visibility
- `waitForSelectorState(locator, options)` - Wait for element state

### LocatorUtils

Utility class for flexible locator handling:

- Supports CSS selectors, XPath, and role-based locators
- Automatic fallback strategies for element finding
- Parent-child locator combinations

## Locator Types

### String Locators

```typescript
const locator = '#submit-button'
const locator = 'text=Submit'
```

### Role-based Locators

```typescript
const locator = {role: 'button', name: 'Submit'}
const locator = {parent: '.form', role: 'textbox', name: 'Username'}
```

## Utilities

### Environment Variables

```typescript
import {getEnvCredentials} from '@netanelh2/playwright-framework'

const baseUrl = getEnvCredentials('BASE_URL')
```

### Array Utilities

```typescript
import {findItemByProperty} from '@netanelh2/playwright-framework'

const user = findItemByProperty(users, 'email', 'test@example.com')
```

## Configuration

The framework works with standard Playwright configuration. Here's a recommended setup:

```typescript
// playwright.config.ts
import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
  testDir: './src/tests',
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [['html', {open: 'never'}]],
  use: {
    trace: 'on-first-retry',
    screenshot: {mode: 'only-on-failure', fullPage: true},
    video: 'retain-on-failure',
  },
  projects: [
    {name: 'chromium', use: {...devices['Desktop Chrome']}},
    {name: 'firefox', use: {...devices['Desktop Firefox']}},
    {name: 'webkit', use: {...devices['Desktop Safari']}},
  ],
})
```

## Best Practices

1. **Extend BasePage**: Always extend your page objects from `BasePage`
2. **Centralize Locators**: Keep locators in separate constants or files
3. **Use Role-based Locators**: Prefer accessibility-based locators when possible
4. **Environment Variables**: Use `getEnvCredentials()` for configuration
5. **Page Validation**: Always validate page load in page objects

## Available Imports

The framework provides multiple import paths for different use cases:

```typescript
// Main framework exports (classes, utilities, types)
import {BasePage, LocatorUtils, getEnvCredentials} from '@netanelh2/playwright-framework'

// Test fixtures (recommended for test files)
import {test, expect} from '@netanelh2/playwright-framework/fixtures'

// Core classes only
import {BasePage} from '@netanelh2/playwright-framework/core'

// Utilities only
import {getEnvCredentials, findItemByProperty} from '@netanelh2/playwright-framework/helpers'

// Types only
import type {
  StringOrRoleLocatorType,
  RoleLocator,
  AriaRole,
  PageFixtures,
} from '@netanelh2/playwright-framework/types'
```

## Creating New Projects

For scaffolding new projects with this framework, use the CLI tool:

```bash
npm create @netanelh2/playwright-project my-new-project
```

## Contributing

Contributions are welcome! Please visit the [main repository](https://github.com/NetanelH2/playwright-framework-suite) for contribution guidelines.

## License

MIT - see [LICENSE](https://github.com/NetanelH2/playwright-framework-suite/blob/main/LICENSE) for details.

# Workflow test
