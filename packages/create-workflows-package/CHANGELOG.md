# Changelog

## 1.2.19

### Patch Changes

- chore: version packages

## 1.2.18

### Patch Changes

- chore: version packages

## 1.2.17

### Patch Changes

- chore: version packages

## 1.2.16

### Patch Changes

- chore: version packages

## 1.2.15

### Patch Changes

- chore: version packages

## 1.2.14

### Patch Changes

- chore: version packages

## 1.2.13

### Patch Changes

- chore: version packages

## 1.2.12

### Patch Changes

- chore: version packages

## 1.2.11

### Patch Changes

- chore: version packages

## 1.2.10

### Patch Changes

- chore: version packages

## 1.2.9

### Patch Changes

- chore: version packages

## 1.2.8

### Patch Changes

- chore: merge version bumps from PR #58

## 1.2.7

### Patch Changes

- docs: enhance package README files with feature lists

## 1.2.6

### Patch Changes

- [#56](https://github.com/NetanelH2/playwright-framework-suite/pull/56) [`6559cb8`](https://github.com/NetanelH2/playwright-framework-suite/commit/6559cb8e5eb2e62e7994dbbe7acd7d3d17a4b62b) Thanks [@NetanelH2](https://github.com/NetanelH2)! - chore: release packages (#55)

## 1.2.5

### Patch Changes

- 3077a6c: chore: release packages (#53)

## 1.2.4

### Patch Changes

- c73ffa3: chore: release packages (#51)

## 1.2.3

### Patch Changes

- bfb4972: chore: release packages (#49)

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
