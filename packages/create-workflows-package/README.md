# @netanelh2/create-workflows-package

🚀 CLI tool to add GitHub Actions workflows and code quality setup with Husky to your existing project.

## Features

- **GitHub Actions Templates**: Pre-configured workflows for code quality, testing, and releases
- **Changeset Integration**: Automated version bumping and NPM publishing
- **Husky & lint-staged**: Pre-commit hooks for quality gates
- **Branch Protection**: Automated PR checks and merge requirements

## Quick Start

Add workflows and code quality to your project using npx (recommended):

```bash
npx @netanelh2/create-workflows-package
```

Or install globally and use:

```bash
npm install -g @netanelh2/create-workflows-package
create-workflows-package
```

## Usage

### Interactive Mode (Default)

Run to be prompted for which workflows and features to include:

```bash
npx @netanelh2/create-workflows-package
```

### Non-Interactive Mode

Skip all prompts and include everything:

```bash
npx @netanelh2/create-workflows-package --yes
```

## Command Options

- `-y, --yes` - Skip prompts and include all features
- `--no-install` - Skip automatic dependency installation

## Examples

```bash
# Interactive setup
npx @netanelh2/create-workflows-package

# Include everything without prompts
npx @netanelh2/create-workflows-package --yes

# Setup without installing dependencies
npx @netanelh2/create-workflows-package --no-install
```

## What Gets Added

The CLI adds to your existing project:

- ✅ **GitHub Actions workflows** for CI/CD automation
- ✅ **Code quality tools**: ESLint, Prettier with TypeScript support
- ✅ **Husky git hooks** for pre-commit quality checks
- ✅ **lint-staged** for efficient pre-commit linting
- ✅ **Updated package.json** with quality scripts

## Available Workflows

Choose from these GitHub Actions workflows:

- **Sanity Tests** - Run quick sanity checks on pull requests
- **Regression Tests** - Full test suite for releases
- **Code Quality** - Linting, formatting, and type checking
- **Cleanup Artifacts** - Automatic cleanup of old workflow artifacts
- **Deploy Reports** - Deploy test reports to GitHub Pages
- **Slack Notifications** - Send notifications to Slack channels
- **Nightly Regression** - Run full regression tests nightly

## GitHub Actions Setup Guide

After running the CLI, follow these steps to enable GitHub Actions:

1. **Repository Permissions**:
   - Go to your repository on GitHub
   - Navigate to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"

2. **GitHub Pages Setup** (for report deployment):
   - Go to Settings > Pages
   - Set Source to "GitHub Actions"
   - This enables automatic publishing of test reports

3. **Required Secrets** (Settings > Secrets and variables > Actions):
   - **`BASE_URL`**: Your application URL (e.g., `https://your-app.com`) - required for tests
   - **`SLACK_WEBHOOK_URL`**: Slack webhook URL for notifications (optional, only if Slack notifications enabled)

4. **Branch Protection** (recommended):
   - Go to Settings > Branches
   - Add rules for your main branch (main/master/develop)
   - Require status checks from "Code Quality Check" workflow
   - This ensures code quality before merging

5. **Package.json Scripts**:
   Ensure your `package.json` has these scripts (automatically added by CLI):

   ```json
   {
     "scripts": {
       "test:sanity": "playwright test --grep '@sanity'",
       "test:regression": "playwright test --grep '@regression'",
       "check": "npm run lint:check && npm run format:check && npx tsc"
     }
   }
   ```

6. **Slack Setup** (if notifications enabled):
   - Create a Slack app with incoming webhooks
   - Get the webhook URL and add it as `SLACK_WEBHOOK_URL` secret
   - Ensure the Slack channel has proper permissions

7. **Optional: Code Ownership**:
   - The CLI will ask if you want to create a CODEOWNERS file
   - If yes, provide your GitHub username to set up automatic code ownership

## Scripts Added to package.json

```json
{
  "scripts": {
    "lint:check": "eslint src/**/*.ts --max-warnings 0 --no-warn-ignored",
    "format:check": "prettier --check src/**/*.ts",
    "check": "npm run lint:check && npm run format:check && npx tsc",
    "fix": "prettier --write src/**/*.ts && eslint src/**/*.ts --fix --no-warn-ignored",
    "pre-commit": "lint-staged",
    "prepare": "husky"
  }
}
```

## After Setup

Once setup is complete, you can use these commands:

```bash
# Code Quality
npm run check            # Run all quality checks
npm run lint:check       # Check linting
npm run format:check     # Check formatting
npm run fix              # Auto-fix issues

# Git Hooks
npm run prepare          # Setup Husky (run once)
```

## Requirements

- Node.js 18.0.0 or higher
- npm or yarn
- Existing Git repository (recommended)

## Dependencies Added

**Dev Dependencies:**

- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `prettier`
- `husky`
- `lint-staged`

## License

MIT

## Support

- [GitHub Issues](https://github.com/NetanelH2/playwright-framework-suite/issues)
- [GitHub Repository](https://github.com/NetanelH2/playwright-framework-suite)</content>
  <parameter name="filePath">/Users/netanel/Documents/Development/playwright-framework-suite/packages/create-workflows-package/README.md
