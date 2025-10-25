# @netanelh2/create-workflows-package

🚀 CLI tool to add GitHub Actions workflows and code quality setup with Husky to your existing project.

## Features

- **GitHub Actions Templates**: Pre-configured workflows for code quality, testing, and CI/CD automation
- **Husky & lint-staged**: Pre-commit hooks for quality gates
- **Branch Protection**: Automated PR checks and merge requirements
- **Code Quality Tools**: Biome for unified linting and formatting with TypeScript support

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
- ✅ **Code quality tools**: Biome for unified linting and formatting with TypeScript support
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

## GitHub Actions Setup Guide

After running the CLI, follow these steps to enable GitHub Actions:

### 1. Repository Permissions

- Go to your repository on GitHub
- Navigate to **Settings > Actions > General**
- Under "Workflow permissions", select **"Read and write permissions"**
- Click **Save**

### 2. GitHub Pages Setup (for report deployment)

- Go to **Settings > Pages**
- Set Source to **"GitHub Actions"**
- This enables automatic publishing of test reports

### 3. Required Secrets (Settings > Secrets and variables > Actions)

#### Optional Secrets (based on workflows selected):

- **`SLACK_WEBHOOK_URL`**: Slack webhook URL for notifications (only if Slack notifications workflow enabled)

#### For NPM Publishing (if using Changesets):

If your project uses Changesets for version management, the workflows support **OIDC (OpenID Connect)** for secure NPM publishing - no long-lived tokens needed!

**Setup NPM Trusted Publishers:**

1. Go to your package settings on [npmjs.com](https://npmjs.com)
2. Navigate to **"Trusted Publisher"** section
3. Click **"GitHub Actions"**
4. Configure:
   - **Organization/User**: Your GitHub username or org (e.g., `YourUsername`)
   - **Repository**: Your repository name (e.g., `my-project`)
   - **Workflow filename**: `release.yml` (must include `.yml` extension)
   - **Environment name**: Leave empty unless using GitHub environments
5. Click **"Add"**

**Benefits of OIDC:**

- ✅ No need for `NPM_TOKEN` secret
- ✅ Short-lived, automatically-managed credentials
- ✅ Automatic provenance generation for packages
- ✅ Better security - no token leakage risks

> **Note**: This package does not install or configure Changesets. If you need automated versioning and publishing, consider using [@netanelh2/create-playwright-project](https://www.npmjs.com/package/@netanelh2/create-playwright-project) which includes Changesets setup.

### 4. Personal Access Token (PAT) for Auto-Merge

If you want to use auto-merge workflows or create releases:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Select scopes:
   - `repo` (full control of repositories)
   - `workflow` (update GitHub Action workflows)
4. Copy the token and add it as **`PAT_TOKEN`** in repository secrets

### 5. Branch Protection (recommended)

- Go to **Settings > Branches**
- Add rules for your main branch (main/master/develop)
- Enable:
  - ✅ Require status checks before merging
  - ✅ Require "Biome Quality Check" to pass
  - ✅ Require branches to be up to date before merging
- This ensures code quality before merging

### 6. Package.json Scripts

Ensure your `package.json` has these scripts (automatically added by CLI):

```json
{
  "scripts": {
    "test": "playwright test",
    "test:sanity": "playwright test --grep '@sanity'",
    "test:regression": "playwright test --grep '@regression'",
    "test:chrome": "playwright test --project=chromium",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "report": "playwright show-report",
    "check": "npx @biomejs/biome check --write && npx tsc --noEmit",
    "type-check": "tsc --noEmit",
    "pre-commit": "lint-staged",
    "prepare": "husky"
  }
}
```

### 7. Slack Setup (if notifications enabled)

- Create a Slack app with incoming webhooks
- Get the webhook URL and add it as `SLACK_WEBHOOK_URL` secret
- Ensure the Slack channel has proper permissions

### 8. Optional: Code Ownership

- The CLI will ask if you want to create a CODEOWNERS file
- If yes, provide your GitHub username to set up automatic code ownership

## Scripts Added to package.json

```json
{
  "scripts": {
    "check": "npx @biomejs/biome check --write && npx tsc",
    "type-check": "tsc --noEmit",
    "pre-commit": "lint-staged",
    "prepare": "husky"
  }
}
```

## After Setup

Once setup is complete, you can use these commands:

```bash
# Code Quality
npm run check            # Run Biome linting, formatting, and type checking
npm run type-check       # Run TypeScript type checking only

# Git Hooks
npm run prepare          # Setup Husky (run once)
```

## Requirements

- Node.js 18.0.0 or higher
- npm or yarn
- Existing Git repository (recommended)

## Dependencies Added

**Dev Dependencies:**

- `@biomejs/biome` - Ultra-fast Rust-based linter and formatter
- `husky` - Git hooks management
- `lint-staged` - Run linters on staged files

## Support

For questions and support, please open an issue on [GitHub](https://github.com/netanelh2/playwright-framework-suite/issues).
