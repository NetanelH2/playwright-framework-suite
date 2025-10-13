# @netanelh2/playwright-framework

## 4.0.2

### Patch Changes

- 2c779fa: chore: version packages

## 4.0.1

### Patch Changes

- 07cd9e6: Remove all ESLint and Prettier references and configurations. All packages now use Biome exclusively for linting and formatting.

## 4.0.0

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

## 3.0.10

### Patch Changes

- a54a573: chore: version packages (#61)

## 3.0.9

### Patch Changes

- 11b9d5d: chore: version packages

## 3.0.8

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

## 3.0.7

### Patch Changes

- 2dd5c1d: Test release: verify automated release workflow
  - Test version bumping for all packages
  - Test NPM publishing pipeline
  - Test GitHub release creation
  - Verify Changesets workflow integration

## 3.0.6

### Patch Changes

- 3db6c75: chore: release @netanelh2/playwright-framework@3.0.4
- 3db6c75: Rename PageFixtures to basePageFixtures for better clarity and consistency

## 3.0.5

### Patch Changes

- 686fbaa: chore: release @netanelh2/playwright-framework@3.0.4
- 60c45ff: Rename PageFixtures to basePageFixtures for better clarity and consistency

## 3.0.4

### Patch Changes

- Rename PageFixtures to basePageFixtures for better clarity and consistency

## 3.0.3

### Patch Changes

- 4569b84: docs: update installation note to specify .ts extensions for modern ES modules
- c2cf0fb: chore: release packages with documentation updates
- 7c041d8: docs: update all documentation to remove .ts extensions from imports and correct Prettier config references
  - Removed `.ts` extensions from all import examples in documentation
  - Changed all references from `.prettierrc.ts` to `.prettierrc.json`
  - Updated AGENTS.md, README.md, and package READMEs
  - Ensured consistent import style across all documentation and templates

## 3.0.2

### Patch Changes

- 8d79cf0: chore(playwright-framework): bump version to 3.0.1
- docs: update all documentation to remove .ts extensions from imports and correct Prettier config references
  - Removed `.ts` extensions from all import examples in documentation
  - Changed all references from `.prettierrc.ts` to `.prettierrc.json`
  - Updated AGENTS.md, README.md, and package READMEs
  - Ensured consistent import style across all documentation and templates

## 3.0.1

### Patch Changes

- fix: resolve build issues with incremental compilation
  - Fixed stale tsconfig.tsbuildinfo causing missing dist folder
  - Updated clean script to remove both dist and tsconfig.tsbuildinfo
  - Verified package exports work correctly in consumer projects
  - Tested with Playwright integration tests - all passing

## 3.0.0

### Major Changes

- e37ffa8: chore: remove @ path aliases and barrel exports

## 2.4.48

### Patch Changes

- Refactor: Remove @ path aliases and barrel exports
  - Removed @ path alias from tsconfig files across all packages
  - Replaced barrel exports with direct file imports using relative paths
  - Updated package.json exports to single entry point
  - Added composite flag to playwright-framework tsconfig for project references
  - All imports now use relative paths with .js extensions for ES modules compatibility

## 2.4.47

### Patch Changes

- [`bebbe5e`](https://github.com/NetanelH2/playwright-framework-suite/commit/bebbe5e47cfa45584033cd978a641873f8cb1ab5) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - chore: version packages

- [`9aeb04e`](https://github.com/NetanelH2/playwright-framework-suite/commit/9aeb04e83e028dfb6287893f34a7f9d3df2fb0ea) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - docs: add JSDoc headers to package entry points

## 2.4.46

### Patch Changes

- [`7bdc205`](https://github.com/NetanelH2/playwright-framework-suite/commit/7bdc205317a495abf60363c2a37d64de72fa986d) Thanks [@github-actions[bot]](https://github.com/github-actions%5Bbot%5D)! - test: bump all package versions to test CI publishing workflow

## 2.4.44

### Patch Changes

- chore: version packages

## 2.4.43

### Patch Changes

- chore: version packages

## 2.4.42

### Patch Changes

- chore: version packages

## 2.4.41

### Patch Changes

- chore: version packages

## 2.4.40

### Patch Changes

- chore: version packages

## 2.4.39

### Patch Changes

- chore: version packages

## 2.4.38

### Patch Changes

- chore: version packages

## 2.4.37

### Patch Changes

- chore: version packages

## 2.4.36

### Patch Changes

- chore: version packages

## 2.4.35

### Patch Changes

- chore: version packages

## 2.4.34

### Patch Changes

- chore: version packages

## 2.4.33

### Patch Changes

- chore: version packages

## 2.4.32

### Patch Changes

- chore: version packages

## 2.4.31

### Patch Changes

- chore: version packages

## 2.4.30

### Patch Changes

- chore: version packages

## 2.4.29

### Patch Changes

- chore: version packages

## 2.4.28

### Patch Changes

- chore: version packages

## 2.4.27

### Patch Changes

- chore: version packages

## 2.4.26

### Patch Changes

- chore: version packages

## 2.4.25

### Patch Changes

- chore: version packages

## 2.4.24

### Patch Changes

- chore: version packages

## 2.4.23

### Patch Changes

- chore: version packages

## 2.4.22

### Patch Changes

- chore: version packages

## 2.4.21

### Patch Changes

- chore: version packages

## 2.4.20

### Patch Changes

- chore: version packages

## 2.4.19

### Patch Changes

- chore: version packages

## 2.4.18

### Patch Changes

- chore: version packages

## 2.4.17

### Patch Changes

- chore: version packages

## 2.4.16

### Patch Changes

- chore: version packages

## 2.4.15

### Patch Changes

- chore: version packages

## 2.4.14

### Patch Changes

- chore: version packages

## 2.4.13

### Patch Changes

- chore: version packages

## 2.4.12

### Patch Changes

- chore: version packages

## 2.4.11

### Patch Changes

- chore: version packages

## 2.4.10

### Patch Changes

- chore: version packages

## 2.4.9

### Patch Changes

- chore: version packages

## 2.4.8

### Patch Changes

- chore: version packages

## 2.4.7

### Patch Changes

- chore: merge version bumps from PR #58

## 2.4.6

### Patch Changes

- docs: enhance package README files with feature lists

## 2.4.5

### Patch Changes

- 688f6a6: Merge branch 'main' of github.com:NetanelH2/playwright-framework-suite

## 2.4.4

### Patch Changes

- 058821f: Merge branch 'main' of github.com:NetanelH2/playwright-framework-suite

## 2.4.3

### Patch Changes

- 20244b1: Merge branch 'main' of github.com:NetanelH2/playwright-framework-suite

## 2.4.2

### Patch Changes

- 9a4d8f1: Merge branch 'main' of github.com:NetanelH2/playwright-framework-suite

## 2.4.1

### Patch Changes

- e871eb9: Merge branch 'main' of github.com:NetanelH2/playwright-framework-suite

## 2.4.0

### Minor Changes

- 34bc75b: feat: Modern tooling migration and ES modules support

## 2.3.0

### Minor Changes

- 50d3d7a: feat: update package version and adjust import paths to include file extensions

## 2.2.17

### Minor Changes

- **ES Modules Migration**: Complete migration to modern ES modules with proper `.js` extensions in imports/exports
- **TypeScript Project References**: Added `"composite": true` for optimized incremental builds
- **Build System**: Updated build process for full ES module compatibility

### Patch Changes

- Updated all internal imports to use `.js` extensions for ESM compatibility
- Enhanced TypeScript configuration with project references support
- Improved build output for better consumer experience

## 2.2.13

### Patch Changes

- 4705b22: fix: restore missing exports in core, helpers, and types modules

## 2.2.8

### Patch Changes

- f552840: Automated release: feat: update installation instructions to use devDependencies and increment package versions

## 2.2.6

### Patch Changes

- 994b48d: Automated release: feat: update installation instructions to use devDependencies and increment package versions

## 2.2.5

### Patch Changes

- Fixed packaging issue where dist/ folder was not included in published package
- Added .npmignore file to properly control published files
- Ensures compiled TypeScript files are available to consumers

## 2.2.4

### Patch Changes

- 6347804: Merge branch 'main' of github.com:NetanelH2/playwright-framework-suite
- dc8eb39: Update README with corrected test examples and formatting fixes

## 2.2.3

### Patch Changes

- 713eff1: Merge pull request #9 from NetanelH2/changeset-release/main

## 2.2.2

### Patch Changes

- 4052758: Merge pull request #5 from NetanelH2/changeset-release/main
- 097bd9e: Merge pull request #6 from NetanelH2/changeset-release/main

## 2.2.1

### Patch Changes

- be48829: Merge pull request #4 from NetanelH2/changeset-release/main

## 2.2.0

### Minor Changes

- ac212a8: feat: update ExamplePage.ts to properly align with locator structure

## 2.1.2

### Patch Changes

- 48901dd: Merge pull request #3 from NetanelH2/changeset-release/main

## 2.1.1

### Patch Changes

- a9e470c: docs: add AGENTS.md reference for advanced agent/contributor usage
- 27ed823: Merge pull request #2 from NetanelH2/changeset-release/main

## 2.1.0

### Minor Changes

- 8a8dc88: feat: add ESLint and Prettier configuration files

### Patch Changes

- ed4a146: Merge pull request #1 from NetanelH2/changeset-release/main
- 95542a1: docs: update README to showcase fixtures and modern import patterns

## 2.0.0

### Major Changes

- 44aa9b6: Refactor code for consistency and readability across multiple files
