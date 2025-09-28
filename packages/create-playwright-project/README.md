# @netanelh2/create-playwright-project

🎭 CLI tool to scaffold new Playwright TypeScript projects with the [@netanelh2/playwright-framework](https://www.npmjs.com/package/@netanelh2/playwright-framework).

## Quick Start

Create a new Playwright project using npx (recommended):

```bash
npx @netanelh2/create-playwright-project my-project-name
```

Or install globally and use:

```bash
npm install -g @netanelh2/create-playwright-project
create-playwright-project my-project-name
```

## Usage

### Interactive Mode (Default)

Run without arguments to be prompted for configuration:

```bash
npx @netanelh2/create-playwright-project
```

### With Project Name

Specify a project name and get prompted for other options:

```bash
npx @netanelh2/create-playwright-project my-awesome-tests
```

### Non-Interactive Mode

Skip all prompts and use defaults:

```bash
npx @netanelh2/create-playwright-project my-project --yes
```

## Command Options

- `[project-name]` - Name of the project directory to create
- `-y, --yes` - Skip prompts and use default settings
- `--no-install` - Skip automatic dependency installation
- `--no-git` - Skip git repository initialization

## Examples

```bash
# Create with all defaults
npx @netanelh2/create-playwright-project my-tests --yes

# Create without installing dependencies
npx @netanelh2/create-playwright-project my-tests --no-install

# Create without git initialization
npx @netanelh2/create-playwright-project my-tests --no-git

# Create with custom configuration (interactive)
npx @netanelh2/create-playwright-project my-tests
```

## What Gets Created

The CLI creates a new Playwright TypeScript project with:

- ✅ **Modern TypeScript configuration** with path aliases (`@/`)
- ✅ **Playwright configuration** optimized for CI/CD
- ✅ **3-Layer architecture**: Core utilities, Page Objects, Tests
- ✅ **Centralized locators** with type safety
- ✅ **Custom test fixtures** for dependency injection
- ✅ **Environment configuration** with `.env` support
- ✅ **Code quality tools**: ESLint, Prettier
- ✅ **npm scripts** for testing, linting, and formatting
- ✅ **Sample tests and page objects** (optional)

## Project Structure

```
my-project/
├── src/
│   ├── fixtures/         # Test setup and dependency injection
│   ├── locators/         # Centralized element locators
│   ├── pages/           # Page Object Model classes
│   ├── tests/           # Test specifications
│   └── types/           # TypeScript type definitions
├── playwright.config.ts  # Playwright configuration
├── package.json
└── tsconfig.json        # TypeScript configuration with path aliases
```

## After Creation

Once your project is created, navigate to it and start testing:

```bash
cd my-project
npm test                 # Run all tests
npm run test:chrome      # Run tests in Chrome only
npm run test:debug       # Open Playwright Inspector
npm run report           # View test results
```

## Requirements

- Node.js 18.0.0 or higher
- npm or yarn

## Related Packages

- [@netanelh2/playwright-framework](https://www.npmjs.com/package/@netanelh2/playwright-framework) - The core framework library

## License

MIT

## Support

- [GitHub Issues](https://github.com/NetanelH2/playwright-framework-suite/issues)
- [GitHub Repository](https://github.com/NetanelH2/playwright-framework-suite)
