# @netanelh2/playwright-framework

A robust Playwright TypeScript testing framework with Page Object Model, smart locators, and utilities for scalable E2E testing.

> **See also:** [AI Coding Agent Guide (AGENTS.md)](../../AGENTS.md) for advanced usage, conventions, and project structure tips.

## Features

- 🎭 **Built on Playwright**: Leverages the power of Playwright for reliable E2E testing
- 🏗️ **Page Object Model**: Well-structured page objects extending `BasePage` for consistency
- 🎯 **Smart Locators**: Flexible locator system supporting CSS selectors and role-based locators with automatic fallback
- 🔧 **Test Fixtures**: Pre-configured fixtures for dependency injection and page management
- 🛠️ **Utilities**: Helper functions for environment variables, array operations, and more
- 📦 **TypeScript 5.x**: Full type safety with comprehensive type definitions
- ⚡ **ES Modules**: Modern module system with optimized imports
- 🔒 **Type-Safe Locators**: Role-based locator types with `StringOrRoleLocatorType`

## Installation

```bash
npm install --save-dev @netanelh2/playwright-framework @playwright/test typescript
```

> **Note**: This package uses modern ES modules. Ensure your project has `"type": "module"` in `package.json`.

## Quick Start

### 1. Define Locators with Type Safety

```typescript
import type {StringOrRoleLocatorType} from '@netanelh2/playwright-framework'

// Centralized locators with role-based pattern (preferred)
export const LOGIN_PAGE_LOCATORS = {
  usernameField: {role: 'textbox', name: 'Username'},
  passwordField: {role: 'textbox', name: 'Password'},
  submitButton: {role: 'button', name: 'Sign In'},
  errorMessage: '.error-message',
} as const satisfies Record<string, StringOrRoleLocatorType>
```

### 2. Create Type-Safe Page Objects

```typescript
import {BasePage, type Page} from '@netanelh2/playwright-framework'
import {test} from '../fixtures/testSetup'
import {LOGIN_PAGE_LOCATORS as L} from '../locators/login/Login_Page'

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async navigateTo(): Promise<void> {
    await this.gotoURL('/login')
  }

  async login(username: string, password: string): Promise<void> {
    await test.step('User login flow', async () => {
      const usernameLocator = this.extractLocator(L.usernameField)
      const passwordLocator = this.extractLocator(L.passwordField)

      await usernameLocator.fill(username)
      await passwordLocator.fill(password)
      await this.clickOnElement(L.submitButton)
    })
  }

  async validateLoaded(): Promise<void> {
    await this.validateVisibility(L.usernameField)
    await this.validateVisibility(L.submitButton)
  }

  async validateLoginError(): Promise<void> {
    await this.validateVisibility(L.errorMessage)
  }
}
```

### 3. Define User Types and Test Data

```typescript
// src/types/userTypes.ts
export interface UserCredentials {
  username: string
  password: string
  role?: 'admin' | 'user' | 'guest'
}

// src/data/users.ts
import type {UserCredentials} from '../types/userTypes'

export const STANDARD_USER: UserCredentials = {
  username: 'standard_user',
  password: 'secret_sauce',
  role: 'user',
}

export const ADMIN_USER: UserCredentials = {
  username: 'admin',
  password: 'admin123',
  role: 'admin',
}
```

### 4. Create Custom Fixtures with Type Safety

```typescript
// src/fixtures/testSetup.ts
import {test as baseTest} from '@netanelh2/playwright-framework'
import {LoginPage} from '../pages/LoginPage'
import {DashboardPage} from '../pages/DashboardPage'

interface CustomFixtures {
  loginPage: LoginPage
  dashboardPage: DashboardPage
}

export const test = baseTest.extend<CustomFixtures>({
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page))
  },
  dashboardPage: async ({page}, use) => {
    await use(new DashboardPage(page))
  },
})

export {expect} from '@netanelh2/playwright-framework'
```

### 5. Write Type-Safe Tests

```typescript
// src/tests/login.spec.ts
import {STANDARD_USER, ADMIN_USER} from '../data/users'
import {test} from '../fixtures/testSetup'

test.describe('Login Flow @sanity', () => {
  test('should login successfully with standard user', async ({
    loginPage,
    dashboardPage,
  }) => {
    await loginPage.navigateTo()
    await loginPage.validateLoaded()
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password)
    await dashboardPage.validateUserLoggedIn(STANDARD_USER.username)
  })

  test('should display error for invalid credentials', async ({loginPage}) => {
    await loginPage.navigateTo()
    await loginPage.login('invalid_user', 'wrong_password')
    await loginPage.validateLoginError()
  })
})

test.describe('Admin Login @regression', () => {
  test('should allow admin access', async ({loginPage, dashboardPage}) => {
    await loginPage.navigateTo()
    await loginPage.login(ADMIN_USER.username, ADMIN_USER.password)
    await dashboardPage.validateAdminAccess()
  })
})
```

## Core Classes

### BasePage

Base class for all page objects providing common functionality with type-safe methods:

```typescript
import {
  BasePage,
  type Page,
  type StringOrRoleLocatorType,
} from '@netanelh2/playwright-framework'

export class DashboardPage extends BasePage {
  private readonly LOCATORS = {
    header: {role: 'banner'},
    userMenu: {role: 'button', name: 'User Menu'},
    welcomeMessage: '.welcome-message',
  } as const satisfies Record<string, StringOrRoleLocatorType>

  constructor(page: Page) {
    super(page)
  }

  // Navigation
  async navigateTo(): Promise<void> {
    await this.gotoURL('/dashboard')
  }

  // Validation
  async validateLoaded(): Promise<void> {
    await this.validateVisibility(this.LOCATORS.header)
    await this.validateURL('/dashboard')
  }

  async validateUserLoggedIn(username: string): Promise<void> {
    await this.validateText(
      this.LOCATORS.welcomeMessage,
      `Welcome, ${username}`,
    )
  }

  // Interactions
  async openUserMenu(): Promise<void> {
    await this.clickOnElement(this.LOCATORS.userMenu)
  }
}
```

### Available BasePage Methods

#### Navigation Methods

- `gotoURL(url: string): Promise<void>` - Navigate to a specific URL
- `validateURL(expectedURL: string): Promise<void>` - Validate current page URL

#### Element Interaction Methods

- `clickOnElement(locator: StringOrRoleLocatorType): Promise<void>` - Click on an element
- `hoverOnElement(locator: StringOrRoleLocatorType): Promise<void>` - Hover over an element
- `fillInput(locator: StringOrRoleLocatorType, text: string): Promise<void>` - Fill input fields

#### Validation Methods

- `validateVisibility(locator: StringOrRoleLocatorType): Promise<void>` - Check element visibility
- `validateText(locator: StringOrRoleLocatorType, text: string): Promise<void>` - Validate element text
- `waitForSelectorState(locator: StringOrRoleLocatorType, options?: WaitForSelectorOptions): Promise<void>` - Wait for element state

### LocatorUtils

Utility class for flexible locator handling with automatic fallback strategies:

```typescript
import {
  LocatorUtils,
  type Page,
  type StringOrRoleLocatorType,
} from '@netanelh2/playwright-framework'

export class CustomPage extends LocatorUtils {
  constructor(page: Page) {
    super(page)
  }

  async getElementText(locator: StringOrRoleLocatorType): Promise<string> {
    const element = this.extractLocator(locator)
    return (await element.textContent()) ?? ''
  }

  async isElementVisible(locator: StringOrRoleLocatorType): Promise<boolean> {
    const element = this.extractLocator(locator)
    return await element.isVisible()
  }
}
```

## Locator Types

The framework supports multiple locator strategies with TypeScript type safety:

### String Locators (CSS, XPath, Text)

```typescript
// CSS Selector
const button = '#submit-button'
const input = '.username-input'

// XPath
const element = '//button[@type="submit"]'

// Text selector
const link = 'text=Click Here'
```

### Role-Based Locators (Preferred)

```typescript
import type {RoleLocator, AriaRole} from '@netanelh2/playwright-framework'

// Simple role locator
const submitButton: RoleLocator = {
  role: 'button',
  name: 'Submit',
}

// Role locator with parent context
const usernameInput: RoleLocator = {
  parent: '.login-form',
  role: 'textbox',
  name: 'Username',
}

// Available ARIA roles (type-safe)
const heading: RoleLocator = {
  role: 'heading',
  name: 'Welcome',
}
```

### Combined Locator Definition

```typescript
import type {StringOrRoleLocatorType} from '@netanelh2/playwright-framework'

export const PAGE_LOCATORS = {
  // Role-based (preferred for accessibility)
  submitButton: {role: 'button', name: 'Submit'},
  emailInput: {role: 'textbox', name: 'Email'},

  // CSS selectors (when role-based isn't suitable)
  errorMessage: '.error-message',
  loadingSpinner: '#loading',

  // With parent context
  formSubmit: {
    parent: '.checkout-form',
    role: 'button',
    name: 'Complete Order',
  },
} as const satisfies Record<string, StringOrRoleLocatorType>
```

## Utilities

### Environment Variables with Type Safety

```typescript
import {getEnvCredentials} from '@netanelh2/playwright-framework'

// Load environment variables (from .env file)
const baseUrl = getEnvCredentials('BASE_URL')
const apiKey = getEnvCredentials('API_KEY')
const timeout = getEnvCredentials('DEFAULT_TIMEOUT')

// Usage in page objects
export class ApiPage extends BasePage {
  private readonly BASE_URL = getEnvCredentials('BASE_URL')

  async navigateTo(path: string): Promise<void> {
    await this.gotoURL(`${this.BASE_URL}${path}`)
  }
}
```

### Array Utilities

```typescript
import {findItemByProperty} from '@netanelh2/playwright-framework'

interface User {
  id: number
  email: string
  role: string
}

const users: User[] = [
  {id: 1, email: 'admin@test.com', role: 'admin'},
  {id: 2, email: 'user@test.com', role: 'user'},
]

// Find user by email
const admin = findItemByProperty(users, 'email', 'admin@test.com')
// Result: { id: 1, email: 'admin@test.com', role: 'admin' }

// Find user by role
const regularUser = findItemByProperty(users, 'role', 'user')
// Result: { id: 2, email: 'user@test.com', role: 'user' }
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
  grep: process.env.TEST_TAGS ? new RegExp(process.env.TEST_TAGS) : undefined,
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: 'playwright-report',
      },
    ],
    ['list'],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
})
```

## Best Practices

### 1. Extend BasePage for All Page Objects

```typescript
import {BasePage, type Page} from '@netanelh2/playwright-framework'

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  // Your page-specific methods
}
```

### 2. Centralize Locators in Separate Files

```typescript
// src/locators/checkout/Checkout_Page.ts
import type {StringOrRoleLocatorType} from '@netanelh2/playwright-framework'

export const CHECKOUT_PAGE_LOCATORS = {
  firstName: {role: 'textbox', name: 'First Name'},
  lastName: {role: 'textbox', name: 'Last Name'},
  continueButton: {role: 'button', name: 'Continue'},
} as const satisfies Record<string, StringOrRoleLocatorType>
```

### 3. Use Role-Based Locators When Possible

```typescript
// ✅ Preferred: Role-based (accessibility-friendly)
const loginButton = {role: 'button', name: 'Login'}

// ⚠️ Acceptable: CSS when role-based isn't suitable
const errorMessage = '.error-message'

// ❌ Avoid: Fragile selectors
const button = 'div > div > button:nth-child(3)'
```

### 4. Leverage test.step() for Readable Test Reports

```typescript
async login(username: string, password: string): Promise<void> {
  await test.step('Fill login credentials', async () => {
    await this.fillInput(L.usernameField, username);
    await this.fillInput(L.passwordField, password);
  });

  await test.step('Submit login form', async () => {
    await this.clickOnElement(L.submitButton);
  });
}
```

### 5. Use Environment Variables for Configuration

```typescript
// .env
BASE_URL=https://staging.example.com
API_ENDPOINT=https://api.example.com
DEFAULT_TIMEOUT=30000

// Usage
import { getEnvCredentials } from '@netanelh2/playwright-framework';

export const BASE_URL = getEnvCredentials('BASE_URL');
export const API_ENDPOINT = getEnvCredentials('API_ENDPOINT');
```

### 6. Implement Page Validation Methods

```typescript
export class ProductPage extends BasePage {
  async validateLoaded(): Promise<void> {
    await this.validateVisibility(PRODUCT_PAGE_LOCATORS.productGrid)
    await this.validateVisibility(PRODUCT_PAGE_LOCATORS.filterSection)
    await this.validateURL('/products')
  }
}
```

## Available Imports

The framework provides multiple import paths for different use cases:

```typescript
// Main framework exports (classes, utilities, types)
import {
  BasePage,
  LocatorUtils,
  getEnvCredentials,
  findItemByProperty,
} from '@netanelh2/playwright-framework'

// Type imports
import type {
  StringOrRoleLocatorType,
  RoleLocator,
  AriaRole,
  Page,
  Locator,
  PageFixtures,
} from '@netanelh2/playwright-framework'

// Test fixtures (for custom fixtures)
import {test as baseTest} from '@netanelh2/playwright-framework'

// Re-exported Playwright types
import type {
  Browser,
  BrowserContext,
  PlaywrightTestConfig,
  TestInfo,
} from '@netanelh2/playwright-framework'
```

## Project Structure

```
my-project/
├── src/
│   ├── core/              # Custom base classes (optional)
│   ├── data/              # Test data (users, products, etc.)
│   │   └── users.ts
│   ├── fixtures/          # Custom test fixtures
│   │   └── testSetup.ts
│   ├── helpers/           # Utility functions
│   ├── locators/          # Centralized locators
│   │   ├── login/
│   │   │   └── Login_Page.ts
│   │   └── dashboard/
│   │       └── Dashboard_Page.ts
│   ├── pages/             # Page Object Model classes
│   │   ├── LoginPage.ts
│   │   └── DashboardPage.ts
│   ├── tests/             # Test specifications
│   │   ├── login.spec.ts
│   │   └── dashboard.spec.ts
│   └── types/             # TypeScript type definitions
│       ├── fixtureTypes.ts
│       └── userTypes.ts
├── .env                   # Environment variables (gitignored)
├── .env.example           # Environment template
├── biome.json             # Biome configuration
├── playwright.config.ts   # Playwright configuration
├── package.json
└── tsconfig.json          # TypeScript configuration
```

## Creating New Projects

For scaffolding new projects with this framework, use the CLI tool:

```bash
npx @netanelh2/create-playwright-project my-new-project
```

This creates a complete project structure with:

- Pre-configured Playwright settings
- Example page objects and tests
- Proper TypeScript configuration
- Biome for code quality
- Environment setup

## TypeScript Configuration

Recommended `tsconfig.json` for optimal compatibility:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "types": ["node", "@playwright/test"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Contributing

Contributions are welcome! Please visit the [main repository](https://github.com/NetanelH2/playwright-framework-suite) for contribution guidelines.

## License

MIT - see [LICENSE](https://github.com/NetanelH2/playwright-framework-suite/blob/main/LICENSE) for details.

## Support

- 🐛 [Report Issues](https://github.com/NetanelH2/playwright-framework-suite/issues)
- 💬 [Discussions](https://github.com/NetanelH2/playwright-framework-suite/discussions)
- 📖 [Documentation](https://github.com/NetanelH2/playwright-framework-suite/tree/main/packages/playwright-framework)
- 🎓 [AI Coding Agent Guide](../../AGENTS.md)

---

**Built with ❤️ for the Playwright testing community**
