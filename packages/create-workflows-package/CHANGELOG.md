# Changelog

## 3.0.1

### Patch Changes

- 07cd9e6: Remove all ESLint and Prettier references and configurations. All packages now use Biome exclusively for linting and formatting.

## 3.0.0

### Major Changes

- ff69926: Migrate from ESLint + Prettier to Biome

  BREAKING CHANGE: Replaced ESLint 9.x and Prettier 3.x with Biome for unified linting and formatting.

  - Add Biome configuration (`biome.json`) to all packages and templates
  - Remove all ESLint and Prettier configuration files
  - Update all quality scripts to use `biome check --write`
  - Optimize GitHub Actions workflows with `biomejs/setup-biome` action
  - Update lint-staged to use Biome with `--write` flag
  - Fix Node.js import protocol violations (add `node:` prefix)
  - Update all documentation to reflect Biome usage

  Benefits:

  - 10-100x faster than ESLint + Prettier combined
  - Single tool for linting and formatting
  - Simplified configuration (one `biome.json` vs multiple config files)
  - Better developer experience with instant feedback
  - Faster CI/CD pipeline execution

  Migration is backward compatible for end users - all npm scripts remain the same.

### Patch Changes

- 97296b5: chore: version packages

## 2.0.7

### Patch Changes

- a54a573: chore: version packages (#61)

## 2.0.6

### Patch Changes

- 11b9d5d: chore: version packages

## 2.0.5

### Patch Changes

- 8b2b952: Test complete publish workflow after fixing [skip ci] issue

  This changeset tests the end-to-end release workflow:

  - ✅ Version bump creation (Version PR)
  - ✅ NPM publishing when PR is merged
  - ✅ GitHub release creation
  - ✅ No infinite loops with smart commit detection

  This will bump all 3 packages:

  - @netanelh2/playwright-framework: 3.0.7 → 3.0.8
  - @netanelh2/create-playwright-project: 3.0.7 → 3.0.8
  - @netanelh2/create-workflows-package: 2.0.4 → 2.0.5

## 2.0.4

### Patch Changes

- 2dd5c1d: Test release: verify automated release workflow
  - Test version bumping for all packages
  - Test NPM publishing pipeline
  - Test GitHub release creation
  - Verify Changesets workflow integration

## 2.0.3

### Patch Changes

- a6c9bfe: Update CLI guidance with detailed GitHub branch protection ruleset instructions

## 2.0.2

### Patch Changes

- 4b9002c: chore: update package version to 2.0.1 and enhance workflow error handling for regression and sanity tests

## 2.0.0

### Major Changes

- e37ffa8: chore: remove @ path aliases and barrel exports

## 1.2.49

### Patch Changes

- Refactor: Remove @ path aliases and barrel exports
  - Removed @ path alias from tsconfig files across all packages
  - Replaced barrel exports with direct file imports using relative paths
  - Updated package.json exports to single entry point
  - Added composite flag to playwright-framework tsconfig for project references
  - All imports now use relative paths with .js extensions for ES modules compatibility

## 1.2.48

### Patch Changes

- [`bebbe5e`](https://github.com/NetanelH2/playwright-framework-suite/commit/bebbe5e47cfa45584033cd978a641873f8cb1ab5) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - chore: version packages

- [`9aeb04e`](https://github.com/NetanelH2/playwright-framework-suite/commit/9aeb04e83e028dfb6287893f34a7f9d3df2fb0ea) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - docs: add JSDoc headers to package entry points

## 1.2.47

### Patch Changes

- [`7bdc205`](https://github.com/NetanelH2/playwright-framework-suite/commit/7bdc205317a495abf60363c2a37d64de72fa986d) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - test: bump all package versions to test CI publishing workflow

## 1.2.45

### Patch Changes

- chore: version packages

## 1.2.44

### Patch Changes

- chore: version packages

## 1.2.43

### Patch Changes

- chore: version packages

## 1.2.42

### Patch Changes

- chore: version packages

## 1.2.41

### Patch Changes

- chore: version packages

## 1.2.40

### Patch Changes

- chore: version packages

## 1.2.39

### Patch Changes

- chore: version packages

## 1.2.38

### Patch Changes

- chore: version packages

## 1.2.37

### Patch Changes

- chore: version packages

## 1.2.36

### Patch Changes

- chore: version packages

## 1.2.35

### Patch Changes

- chore: version packages

## 1.2.34

### Patch Changes

- chore: version packages

## 1.2.33

### Patch Changes

- chore: version packages

## 1.2.32

### Patch Changes

- chore: version packages

## 1.2.31

### Patch Changes

- chore: version packages

## 1.2.30

### Patch Changes

- chore: version packages

## 1.2.29

### Patch Changes

- chore: version packages

## 1.2.28

### Patch Changes

- chore: version packages

## 1.2.27

### Patch Changes

- chore: version packages

## 1.2.26

### Patch Changes

- chore: version packages

## 1.2.25

### Patch Changes

- chore: version packages

## 1.2.24

### Patch Changes

- chore: version packages

## 1.2.23

### Patch Changes

- chore: version packages

## 1.2.22

### Patch Changes

- chore: version packages

## 1.2.21

### Patch Changes

- chore: version packages

## 1.2.20

### Patch Changes

- chore: version packages

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
