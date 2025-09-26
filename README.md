# 🎭 Playwright Framework Suite

A modern, TypeScript-first testing framework for Playwright with enterprise-grade architecture and developer experience.

## 📦 Packages

This monorepo contains two complementary packages:

### [@netanelh2/playwright-framework](./packages/playwright-framework) 
**Core testing framework** - Provides base classes, utilities, and type-safe patterns for building maintainable test suites.

### [@netanelh2/create-playwright-project](./packages/create-playwright-project)
**Project scaffolding CLI** - Interactive tool to create new Playwright projects with best practices built-in.

## 🚀 Quick Start

### Creating a New Project

```bash
# Using npm
npm create @netanelh2/playwright-project my-test-project

# Using npx
npx @netanelh2/create-playwright-project my-test-project

# Using yarn
yarn create @netanelh2/playwright-project my-test-project
```

### Using the Framework Directly

```bash
npm install @netanelh2/playwright-framework @playwright/test
```

## ✨ Key Features

- **🏗️ 3-Layer Architecture** - Core framework, Page Objects, and Test specifications
- **🔒 Type-Safe Locators** - Role-based locator system with full TypeScript support
- **🧪 Fixture-Based Testing** - Dependency injection for page objects and test setup
- **🏷️ Tag-Based Execution** - Run `@sanity` or `@regression` test suites independently
- **⚙️ Environment Management** - Secure credential handling via `.env` files
- **📋 Smart Locator Resolution** - Automatic fallback from role → label → text selectors
- **🔄 Built-in Retry Logic** - Configurable retries with CI-aware settings
- **📊 Quality Gates** - ESLint + Prettier + TypeScript validation pipeline

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Test Specifications                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐    │
│  │   Sanity    │ │ Regression  │ │  Integration Tests  │    │
│  │    Tests    │ │    Tests    │ │                     │    │
│  └─────────────┘ └─────────────┘ └─────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     Page Object Layer                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐    │
│  │  LoginPage  │ │  MainPage   │ │   CheckoutPage      │    │
│  │             │ │             │ │                     │    │
│  └─────────────┘ └─────────────┘ └─────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Core Framework Layer                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐    │
│  │  BasePage   │ │ LocatorUtils│ │   Type Definitions  │    │
│  │             │ │             │ │                     │    │
│  └─────────────┘ └─────────────┘ └─────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 📚 Documentation

- [Framework Core Documentation](./packages/playwright-framework/README.md)
- [CLI Tool Documentation](./packages/create-playwright-project/README.md)
- [Development Contributing Guide](./CONTRIBUTING.md)
- [API Reference](https://netanelh2.github.io/playwright-framework-suite/)

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm 9+

### Setup
```bash
git clone https://github.com/NetanelH2/playwright-framework-suite.git
cd playwright-framework-suite
npm install
npm run build
```

### Available Scripts
```bash
npm run build          # Build both packages
npm run build:framework # Build framework only  
npm run build:cli      # Build CLI only
npm test              # Run all tests
npm run lint          # Run ESLint
npm run type-check    # TypeScript compilation check
npm run clean         # Clean build artifacts
```

## 🏗️ Example Usage

### Basic Page Object
```typescript
import { BasePage } from '@netanelh2/playwright-framework'
import { LOGIN_PAGE_LOCATORS as L } from '@/locators'

export class LoginPage extends BasePage {
  async login(username: string, password: string): Promise<void> {
    await this.test.step('User login flow', async () => {
      await this.fillField(L.usernameField, username)
      await this.fillField(L.passwordField, password)
      await this.clickElement(L.loginButton)
    })
  }
}
```

### Test with Fixtures
```typescript
import { test } from '@/fixtures'

test.describe('Authentication @sanity', () => {
  test('should login successfully', async ({ loginPage, dashboardPage }) => {
    await loginPage.navigateTo()
    await loginPage.login('user@example.com', 'password123')
    await dashboardPage.validateUserLoggedIn()
  })
})
```

## 🚀 Release Notes

See [CHANGELOG.md](./CHANGELOG.md) for version history and release notes.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

### Quick Contribution Steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint && npm test`
5. Submit a Pull Request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙋‍♂️ Support

- 🐛 [Report issues](https://github.com/NetanelH2/playwright-framework-suite/issues)
- 💬 [Discussions](https://github.com/NetanelH2/playwright-framework-suite/discussions)  
- 📖 [Documentation](https://netanelh2.github.io/playwright-framework-suite/)

---

**Built with ❤️ for the Playwright testing community**

<!-- TEST COMMIT - TO BE REVERTED -->