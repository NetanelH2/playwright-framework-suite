# Auto-Merge Workflow Fixes

## 🔧 Issues Fixed

### 1. ✅ **Endless Loop Prevention**

**Problem Identified:**

- The workflow was triggering on `synchronize` events
- When the workflow approved a PR or added comments, it could trigger another `synchronize` event
- This created an infinite loop where the workflow kept re-running itself

**Solution Applied:**

1. **Removed `synchronize` trigger**: Changed from `types: [opened, synchronize, reopened, ready_for_review]` to `types: [opened, reopened, ready_for_review, closed]`
2. **Added duplicate detection**: Check if PR is already approved by `github-actions[bot]` before approving again
3. **Check auto-merge status**: Skip if auto-merge is already enabled
4. **Early exit conditions**: Return early if workflow has already processed the PR

**Code Changes:**

```yaml
# Before
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

# After
on:
  pull_request:
    types: [opened, reopened, ready_for_review, closed]
```

```javascript
// Added duplicate detection
const alreadyApproved = reviews.some(
  (review) =>
    review.user.login === "github-actions[bot]" && review.state === "APPROVED",
);

if (pr.auto_merge) {
  console.log("✅ Auto-merge already enabled - skipping to prevent loop");
  return;
}

if (alreadyApproved) {
  console.log("✅ Already approved by workflow - skipping duplicate approval");
  return;
}
```

### 2. ✅ **Automatic Branch Deletion After Merge**

**New Feature:**

- Automatically deletes merged branches to keep the repository clean
- Only deletes branches from the same repository (not forks)
- Protects important branches from deletion

**Implementation:**

- New job: `delete-merged-branch`
- Triggers on: `pull_request` with `action == 'closed'` and `merged == true`
- Permissions: `contents: write`

**Protected Branches (Won't Delete):**

- `main`
- `master`
- `develop`
- `development`
- `staging`
- `production`
- Any branch starting with `release/`

**Code:**

```yaml
delete-merged-branch:
  name: Delete Merged Branch
  runs-on: ubuntu-latest
  if: >
    github.event_name == 'pull_request' &&
    github.event.action == 'closed' &&
    github.event.pull_request.merged == true &&
    github.event.pull_request.head.repo.full_name == github.repository
```

---

## 🔄 Workflow Behavior After Fixes

### For Your PRs (@NetanelH2):

1. **PR Opened/Reopened:**
   - ✅ Auto-approve (once)
   - ✅ Enable auto-merge (once)
   - ✅ Add informational comment
   - ⏳ Wait for code quality checks

2. **Code Quality Passes:**
   - ✅ GitHub auto-merges the PR (native feature)
3. **After Merge:**
   - ✅ Branch is automatically deleted
   - ✅ Comment added confirming deletion

### For External PRs:

1. **PR Opened:**
   - 📝 Notification comment added
   - ⏸️ Waits for manual review by @NetanelH2

2. **After Manual Merge:**
   - ✅ Branch is automatically deleted (if from same repo)

---

## 🛡️ Safety Features

| Feature                   | Status    | Description                              |
| ------------------------- | --------- | ---------------------------------------- |
| **Loop Prevention**       | ✅ Active | Duplicate detection prevents re-approval |
| **Auto-merge Check**      | ✅ Active | Skip if already enabled                  |
| **Protected Branches**    | ✅ Active | Won't delete main/master/develop/etc.    |
| **Fork Safety**           | ✅ Active | Only deletes branches from same repo     |
| **Owner-only Auto-merge** | ✅ Active | Only PRs from @NetanelH2                 |

---

## 📊 Expected Workflow Runs

**Before Fixes:**

```
PR Opened → Workflow runs → Approves
          → Triggers sync → Workflow runs → Approves again
          → Triggers sync → Workflow runs → Approves again
          → ... (infinite loop) ❌
```

**After Fixes:**

```
PR Opened → Workflow runs → Checks if already approved → No → Approve + Enable auto-merge
                                                        → Yes → Skip ✅

PR Merged → Workflow runs → Delete branch → Comment ✅
```

---

## 🧪 Testing Recommendations

1. **Create a test PR** from your account
2. **Verify** it only gets approved once (check Actions logs)
3. **Confirm** auto-merge is enabled
4. **Merge the PR** (manually or auto)
5. **Check** that the branch is deleted automatically

---

## 📝 Workflow Events Summary

| Event                | Trigger               | Jobs That Run                   |
| -------------------- | --------------------- | ------------------------------- |
| PR Opened            | PR from @NetanelH2    | `auto-approve-and-enable-merge` |
| PR Opened            | PR from external user | `notify-external-pr`            |
| PR Reopened          | PR from @NetanelH2    | `auto-approve-and-enable-merge` |
| Quality Check Passes | workflow_run          | `merge-after-quality-check`     |
| PR Closed (Merged)   | PR merged             | `delete-merged-branch`          |

---

## ⚠️ Important Notes

1. **PAT_TOKEN Required**: The workflow still requires `PAT_TOKEN` secret to be set
2. **No Synchronize Events**: The workflow no longer triggers on code pushes to PR branches
3. **Re-approval**: If you need to re-trigger approval, close and reopen the PR
4. **Branch Protection**: Protected branches won't be deleted even if merged

---

## 🔍 Monitoring

Check workflow runs at:
https://github.com/NetanelH2/playwright-framework-suite/actions/workflows/auto-merge-native.yml

Look for:

- ✅ No duplicate approvals
- ✅ Single workflow run per PR event
- ✅ Branches deleted after merge
- ✅ No infinite loops in Actions logs
