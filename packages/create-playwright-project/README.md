# @netanelh2/create-playwright-project

🎭 CLI tool to scaffold new Playwright TypeScript projects with the [@netanelh2/playwright-framework](https://www.npmjs.com/package/@netanelh2/playwright-framework).

## Features

- **Interactive Setup**: Choose between minimal or full-featured project templates
- **Modern Configuration**: Biome for linting and formatting with `biome.json`
- **Framework Integration**: Automatic `@netanelh2/playwright-framework` dependency setup
- **ES Modules**: Proper module configuration
- **Example Tests**: Includes login page examples with fixtures and locators

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
- `-f, --force` - Force scaffolding into existing directory without prompts

## Examples

```bash
# Create with all defaults
npx @netanelh2/create-playwright-project my-tests --yes

# Create without installing dependencies
npx @netanelh2/create-playwright-project my-tests --no-install

# Create without git initialization
npx @netanelh2/create-playwright-project my-tests --no-git

# Force scaffolding into existing directory
npx @netanelh2/create-playwright-project existing-folder --force

# Create with custom configuration (interactive)
npx @netanelh2/create-playwright-project my-tests
```

## Existing Directories

The CLI handles existing directories intelligently:

### Safe Directories

If the target directory exists but only contains "safe" files (like `.git`, `README.md`, `LICENSE`, etc.), you'll be prompted to confirm scaffolding into it:

```bash
npx @netanelh2/create-playwright-project existing-project
# Directory existing-project exists but appears safe to scaffold into. Continue? (y/N)
```

### Non-Safe Directories

If the directory contains other files, the CLI will show an error and suggest using `--force`:

```bash
npx @netanelh2/create-playwright-project existing-project
# ❌ Directory existing-project already exists!
# Contents: package.json, src, node_modules
# Use --force to scaffold into this directory anyway, or choose a different name.
```

### Force Mode

Use `--force` to scaffold into any existing directory without prompts:

```bash
npx @netanelh2/create-playwright-project existing-project --force
```

**⚠️ Warning:** Force mode will overwrite existing files with the same names as template files.

## What Gets Created

The CLI creates a new Playwright TypeScript project with:

- ✅ **Playwright configuration** optimized for CI/CD with smart retry logic
- ✅ **3-Layer architecture**: Core utilities, Page Objects, Tests
- ✅ **Centralized locators** with type safety and role-based patterns
- ✅ **Custom test fixtures** for dependency injection
- ✅ **Environment configuration** with `.env` support
- ✅ **Modern code quality tools**: Biome for linting and formatting
- ✅ **Comprehensive npm scripts** for testing, linting, formatting, and type checking
- ✅ **Sample tests and page objects** (optional)
- ✅ **ES Modules** with proper import/export handling

## Project Structure

## Project Structure

```
my-project/
├── src/
│   ├── fixtures/         # Test setup and dependency injection
│   ├── locators/         # Centralized element locators
│   ├── pages/           # Page Object Model classes
│   ├── tests/           # Test specifications
│   └── types/           # TypeScript type definitions
├── biome.json           # Biome linter and formatter configuration
├── playwright.config.ts  # Playwright configuration with smart retries
├── package.json         # Modern scripts and dependencies
├── tsconfig.json        # TypeScript 5.x with project references
└── .env.example         # Environment variables template
```

## After Creation

Once your project is created, navigate to it and start testing:

```bash
cd my-project

# Testing
npm test                      # Run all tests
npm run test:headed           # Run tests with browser UI
npm run test:chrome           # Run tests in Chrome only
npm run test:sanity           # Run @sanity tagged tests
npm run test:regression       # Run @regression tagged tests
npm run test:sanity:chrome    # Run @sanity tests in Chrome only
npm run test:regression:chrome # Run @regression tests in Chrome only
npm run test:debug            # Open Playwright Inspector
npm run report                # View test results
npm run codegen               # Launch Playwright code generator

# Code Quality
npm run check                 # Run all quality checks (Biome lint + format + types)
npm run type-check            # TypeScript 5.x compilation check
npm run pre-commit            # Run pre-commit hooks (lint-staged)

# CI/CD
npm run trigger-ci            # Trigger CI workflows for testing
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
