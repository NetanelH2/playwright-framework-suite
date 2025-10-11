---
"@netanelh2/playwright-framework": major
"@netanelh2/create-playwright-project": major
"@netanelh2/create-workflows-package": major
---

Migrate from ESLint + Prettier to Biome

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
