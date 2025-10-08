---
"@netanelh2/playwright-framework": patch
"@netanelh2/create-playwright-project": patch
"@netanelh2/create-workflows-package": patch
---

Test complete publish workflow after fixing [skip ci] issue

This changeset tests the end-to-end release workflow:

- ✅ Version bump creation (Version PR)
- ✅ NPM publishing when PR is merged
- ✅ GitHub release creation
- ✅ No infinite loops with smart commit detection

This will bump all 3 packages:

- @netanelh2/playwright-framework: 3.0.7 → 3.0.8
- @netanelh2/create-playwright-project: 3.0.7 → 3.0.8
- @netanelh2/create-workflows-package: 2.0.4 → 2.0.5
