# @netanelh2/create-playwright-project

## 2.3.3

### Patch Changes

- 994b48d: Automated release: feat: update installation instructions to use devDependencies and increment package versions

## 2.3.2

### Patch Changes

- **FIXED**: .gitignore file now properly included in generated projects
- Renamed .gitignore to \_gitignore in template to avoid npm exclusion during publishing
- Updated CLI to automatically rename \_gitignore back to .gitignore when creating projects
- This resolves the issue where generated projects were missing .gitignore files

## 2.3.1

### Patch Changes

<<<<<<< HEAD

- # 75669bd: fix: update version numbers for create-playwright-project and playwright-framework packages
- Move @netanelh2/playwright-framework to devDependencies in generated projects (testing frameworks should be dev dependencies)
- Update framework version to 2.2.5 in template
- Updated README documentation to reflect devDependency installation patterns
  > > > > > > > 56db864 (feat: update installation instructions to use devDependencies and increment package versions)

## 2.3.0

### Minor Changes

- Enhanced existing directory handling with smart detection and user prompts
- Added `--force` flag to allow scaffolding into existing directories without prompts
- Improved safety checks to identify "safe" directories (containing only `.git`, `README.md`, etc.)
- Better error messages showing directory contents when scaffolding is blocked
- Updated documentation with examples for existing directory scenarios

### Features

- **Smart Directory Detection**: Automatically detects if existing directories are safe to scaffold into
- **Interactive Prompts**: Ask users to confirm when scaffolding into existing "safe" directories
- **Force Mode**: Use `--force` flag to bypass all existing directory checks
- **Better Error Messages**: Show directory contents and provide clear guidance when scaffolding is blocked
- **Comprehensive Documentation**: Updated README with examples for all existing directory scenarios

## 2.2.11

### Patch Changes

- 849d8fa: fix: add newline at end of package.json

## 2.2.7

### Patch Changes

- 7fa1396: chore: release @netanelh2/create-playwright-project@2.2.5

## 2.2.6

### Patch Changes

- d0030d9: fix: add missing newline at end of package.json

## 2.2.5

### Patch Changes

- b7d8ac1: remove: unused postinstall.ts file
- f1d2dee: fix: update framework version in template from ^1.0.0 to ^2.2.4

## 2.2.4

### Patch Changes

- 6347804: Merge branch 'main' of github.com:NetanelH2/playwright-framework-suite

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

- 27ed823: Merge pull request #2 from NetanelH2/changeset-release/main
- 6fc4562: Update template tsconfig.json for modern project setup
- 7c5d996: Sync local tsconfig changes with enhanced configuration

## 2.1.0

### Minor Changes

- 8a8dc88: feat: add ESLint and Prettier configuration files

### Patch Changes

- ed4a146: Merge pull request #1 from NetanelH2/changeset-release/main

## 2.0.0

### Major Changes

- 44aa9b6: Refactor code for consistency and readability across multiple files
