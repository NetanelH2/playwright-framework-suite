# Changelog

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
