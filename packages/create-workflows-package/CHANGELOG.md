# Changelog

## 1.2.2

### Patch Changes

- 3730b42: chore: release packages (#47)

## 1.2.1

### Patch Changes

- bf11412: chore: release packages (#45)

## 1.2.0

### Minor Changes

- 00d3f11: feat(workflows): improve GitHub Actions workflows with enhanced error handling

### Patch Changes

- b0e9b67: fix(workflows): remove continue-on-error from code-quality workflows

All notable changes to `@netanelh2/create-workflows-package` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added

- Initial release
- Interactive CLI for selecting workflows and features
- Support for GitHub Actions workflows:
  - Sanity Tests
  - Regression Tests
  - Code Quality (ESLint + Prettier)
  - Cleanup Artifacts
  - Deploy Reports
  - Slack Notifications
  - Nightly Regression
- Husky git hooks setup
- Code quality tools (ESLint, Prettier)
- Automatic package.json script updates
- Comprehensive setup guide for GitHub Actions including:
  - Repository permissions configuration
  - GitHub Pages setup for report deployment
  - Required secrets (BASE_URL, SLACK_WEBHOOK_URL)
  - Branch protection rules
  - Package.json script verification
