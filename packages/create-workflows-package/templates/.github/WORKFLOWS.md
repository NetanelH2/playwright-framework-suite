# CI/CD Workflows Documentation

> 🚀 **Automated Testing & Deployment Pipeline** for the ITCB Testing Framework

## 🎯 Overview

The ITCB Testing Framework uses GitHub Actions to provide a comprehensive CI/CD pipeline that ensures code quality, runs automated tests, generates reports, and notifies the team of results. The pipeline is designed for resilience, with intelligent fallback mechanisms for storage quota issues.

## 🏗️ Workflow Architecture

```
WORKFLOW ARCHITECTURE:
Developer Push/PR → Code Quality Check → Pass/Fail → Merge Allowed/Blocked

TESTING WORKFLOWS:
Sanity Tests (Every 2 hours) → Deploy Reports → Slack Notifications
Regression Tests (Daily 2 AM) → Deploy Reports → Slack Notifications
Artifact Cleanup (Daily 2 AM) → Storage Management
```

## 📋 Core Workflows

### 1. Code Quality Check (`code-quality.yml`)

**🎯 Purpose**: Automated code quality validation for pull requests and commits

**⚙️ Triggers**:

```yaml
push: [main, master, develop]
pull_request: [main, master, develop]
```

**🔍 Quality Gates**:

- **ESLint**: Code linting with zero-warning policy
- **Prettier**: Code formatting validation
- **TypeScript**: Type checking and compilation

**⚙️ Configuration**:

```yaml
timeout: 60 minutes
browser: N/A (code quality only)
retention: 2 days (on failure)
artifact: test-results (failure cases only)
```

**🛡️ Quality Assurance**:

- Blocks merging if quality gates fail
- Provides detailed feedback on issues
- Caches dependencies for faster execution

---

### 2. Sanity Tests (`sanity.yml`)

**🎯 Purpose**: Fast feedback loop for critical functionality

**⏰ Schedule**:

- **Automatic**: Every 2 hours (`0 */2 * * *`)
- **Manual**: On-demand via GitHub Actions UI

**🎭 Test Scope**:

- Tests tagged with `@sanity` only
- Critical user journeys and core functionality
- Optimized for speed (~5-10 minutes)

**⚙️ Configuration**:

```yaml
timeout: 60 minutes
browser: All (chromium, firefox, webkit)
retention: 2 days
artifact: sanity-playwright-report-{run_number}
```

**🛡️ Resilience Features**:

- Storage quota fallback with `continue-on-error`
- Intelligent error reporting
- Automatic retry logic for critical tests

---

### 3. Regression Tests (`nightly-regression.yml`)

**🎯 Purpose**: Comprehensive daily validation

**⏰ Schedule**:

- **Automatic**: Daily at 2:00 AM UTC (`0 2 * * *`)
- **Manual**: On-demand via GitHub Actions UI

**🎭 Test Scope**:

- Complete Playwright test suite
- All test scenarios including edge cases
- Cross-browser compatibility validation

**⚙️ Configuration**:

```yaml
timeout: 120 minutes
browser: All (chromium, firefox, webkit)
retention: 2 days
artifact: regression-playwright-report-{run_number}
```

**📊 Extended Coverage**:

- Full regression testing
- Performance validation
- Visual regression testing

---

### 4. Deploy Reports (`deploy-reports.yml`)

**🎯 Purpose**: Publishes test results to GitHub Pages

**⚙️ Trigger Logic**:

```yaml
workflow_run:
  workflows: ['Sanity Tests', 'Regression Tests']
  types: [completed]
```

**📊 Process Flow**:

1. **Wait** for test workflow completion
2. **Download** latest test artifacts
3. **Extract** HTML reports and assets
4. **Organize** reports by workflow and timestamp
5. **Deploy** to GitHub Pages
6. **Trigger** Slack notifications

**🌐 Output**:

- **Live Reports**: `https://itcb-2.github.io/ITCB-Testing/`
- **Latest**: `/latest/{workflow-name}/`
- **Historical**: `/reports/{workflow-name}/{timestamp}/`

**🧹 Maintenance**:

- Keeps last 10 reports per workflow
- Automatic cleanup of old reports
- Organized directory structure

---

### 5. Slack Notifications (`slack-notifications.yml`)

**🎯 Purpose**: Team communication and status updates

**📱 Trigger**: When deploy workflow completes

**📢 Channel**: `#testing-updates`

**🌍 Timezone**: Israel (Asia/Jerusalem)

**💬 Notification Content**:

```yaml
Success Message:
  - ✅ Test status with contextual emoji
  - 🔗 Direct links to live reports
  - 📊 Workflow execution details
  - 🕐 Israel timezone timestamps

Failure Message:
  - ❌ Clear failure indicators
  - 🔧 Action required notifications
  - 📋 Direct links to workflow logs
  - 🆘 Team escalation context
```

**🎨 Smart Messaging**:

- **Success**: Celebratory tone with report links
- **Failure**: Action-oriented with debugging links
- **Context**: Workflow name, trigger type, timestamps

---

### 6. Artifact Cleanup (`cleanup-artifacts.yml`)

**🎯 Purpose**: Automated storage management and quota prevention

**⏰ Schedule**: Daily at 1:00 AM UTC (`0 1 * * *`) - one hour before regression tests

**🧹 Enhanced Cleanup Strategy**:

```yaml
default_retention: 3 days
configurable_options: [1, 2, 3, 7 days]
dry_run_support: Preview before deletion
dual_policy_system: Age-based + Count-based retention
api_integration: GitHub REST API with pagination
```

**📊 Cleanup Process**:

1. **Scan** all repository artifacts with pagination support
2. **Group** artifacts by workflow type (sanity, regression, quality)
3. **Apply Age Policy**: Delete artifacts older than retention period (default: 2 days)
4. **Apply Count Policy**: Keep only latest N artifacts per workflow type (default: 5)
5. **Delete** artifacts that violate either policy via GitHub API
6. **Report** storage saved, remaining artifacts, and recommendations

**📋 Dual Retention Policies**:

- **Age-based**: Removes artifacts older than specified days (prevents unlimited accumulation)
- **Count-based**: Keeps only the latest N artifacts per workflow type (prevents workflow spam)
- **Combined**: An artifact is deleted if it violates EITHER policy

**⚙️ Manual Options**:

- **Days to Keep**: 7, 14, 30, or 60 days
- **Max Artifacts per Workflow**: 3, 5, 10, or 20 artifacts
- **Dry Run**: Preview deletions without executing
- **Immediate Execution**: For quota emergencies

**🚀 Storage Intelligence**:

- Groups artifacts by workflow type for targeted cleanup
- Provides storage usage analysis and recommendations
- Warns when approaching GitHub's 1 GB storage limit
- Suggests optimal retention settings based on current usage

## 🛡️ Resilience & Fallback Strategies

### Storage Quota Management

**🚨 Problem**: GitHub has storage quotas that can block CI pipelines

**✅ Solution**: Multi-tier fallback approach

#### **Tier 1: Graceful Degradation**

```yaml
- name: Upload artifacts (with quota fallback)
  continue-on-error: true
  id: upload-artifacts
```

- Tests continue even if upload fails
- Provides helpful error context
- Maintains CI pipeline availability

#### **Tier 2: Enhanced Preventive Maintenance**

```yaml
# Daily cleanup at 1 AM UTC - before test workflows
schedule:
  - cron: '0 1 * * *'
```

- **Dual-policy** artifact cleanup (age + count based)
- **2-day default** retention with configurable options
- **Latest 5 artifacts** per workflow type retention
- **Proactive scheduling** before test execution
- **Storage intelligence** with usage recommendations

#### **Tier 3: Emergency Response**

```yaml
# Manual cleanup with enhanced dual-policy settings
workflow_dispatch:
  inputs:
    days_to_keep: ['7', '14', '30', '60']
    max_artifacts_per_workflow: ['3', '5', '10', '20']
    dry_run: ['true', 'false']
```

- **Immediate dual-policy** cleanup (age + count based)
- **Preview mode** for safety with detailed analysis
- **Flexible retention** policies for different scenarios
- **Emergency response** for quota issues

### Test Execution Resilience

**🔄 Intelligent Retry Logic**:

```yaml
CI Environment:
  @sanity tests: 2 retries (critical functionality)
  @regression tests: 2 retries (stability assurance)
  General tests: 0 retries (fast feedback)

Local Development:
  All tests: 0 retries (immediate feedback)
```

**⚡ Fast Failure Detection**:

- Immediate local feedback
- CI retries only for tagged critical tests
- Balanced speed vs. reliability

## 📊 Workflow Execution Timeline

### **Daily Schedule (UTC)**

```
01:00 - Enhanced Artifact Cleanup (dual-policy: 30-day + latest-5)
02:00 - Regression Tests + Report Deployment
04:00 - Sanity Tests
06:00 - Sanity Tests
08:00 - Sanity Tests
10:00 - Sanity Tests
12:00 - Sanity Tests
14:00 - Sanity Tests
16:00 - Sanity Tests
18:00 - Sanity Tests
20:00 - Sanity Tests
22:00 - Sanity Tests
00:00 - Sanity Tests
```

### **Workflow Dependencies**

```
Enhanced Artifact Cleanup (01:00 UTC)
     ↓
Code Quality Check (on PR/push) → Merge Protection
     ↓
Test Workflows → Deploy Reports → Slack Notifications
     ↓
Continuous Storage Management
```

## 🔧 Configuration & Secrets

### **Required Repository Secrets**

1. **`BASE_URL`**
   - **Purpose**: Target application URL
   - **Example**: `https://www.itcb.org.il`
   - **Used by**: Sanity & Regression tests

2. **`SLACK_WEBHOOK_URL`** _(Optional)_
   - **Purpose**: Team notifications
   - **Format**: Slack webhook URL
   - **Used by**: Slack notifications workflow

### **Workflow Permissions**

```yaml
permissions:
  contents: read # Repository access
  pages: write # GitHub Pages deployment
  id-token: write # OIDC token access
  actions: read # Workflow run access
```

## 📈 Monitoring & Metrics

### **Success Indicators**

- ✅ Test execution completion
- ✅ Artifact upload success
- ✅ GitHub Pages deployment
- ✅ Slack notification delivery

### **Failure Detection**

- ❌ Test failures with detailed reports
- ❌ Storage quota exceeded warnings
- ❌ Deployment failures with rollback
- ❌ Network connectivity issues

### **Performance Metrics**

- ⏱️ Code quality check: ~2-5 minutes
- ⏱️ Sanity tests: ~5-10 minutes
- ⏱️ Regression tests: ~30-45 minutes
- ⏱️ Report deployment: ~2-3 minutes
- ⏱️ Cleanup: ~1-2 minutes

## 🎯 Workflow Triggers Summary

| **Workflow**        | **Automatic**        | **Manual** | **Dependency**  |
| ------------------- | -------------------- | ---------- | --------------- |
| Artifact Cleanup    | Daily 1 AM           | ✅         | None            |
| Code Quality Check  | On push/PR           | ❌         | None            |
| Sanity Tests        | Every 2 hours        | ✅         | None            |
| Regression Tests    | Daily 2 AM           | ✅         | None            |
| Deploy Reports      | On test completion   | ✅         | Test workflows  |
| Slack Notifications | On deploy completion | ✅         | Deploy workflow |

## 🔧 Manual Workflow Triggers

All workflows support manual triggering via GitHub Actions UI:

1. Go to **Actions** tab
2. Select workflow
3. Click **Run workflow**
4. Choose options (if available)
5. Click **Run workflow**

## 📊 Report Access

- **Live Reports**: https://itcb-2.github.io/ITCB-Testing/

## 🛠 Troubleshooting

### **Common Issues**

1. **Code Quality workflow fails**
   - Check ESLint configuration and fix linting errors
   - Run `npm run fix` locally to auto-fix formatting issues
   - Verify TypeScript compilation with `npm run type-check`
   - Ensure all dependencies are properly installed

2. **Workflow fails with "Environment variable not set"**
   - Check that required repository secrets are configured
   - Verify secret names match exactly (case-sensitive)

3. **Reports not deploying**
   - Ensure GitHub Pages is enabled
   - Check deploy-reports workflow logs
   - Verify test workflows completed successfully

4. **Slack notifications not working**
   - Verify `SLACK_WEBHOOK_URL` secret is set
   - Check Slack webhook URL is valid
   - Ensure channel permissions are correct

5. **Storage quota exceeded**
   - Run manual artifact cleanup workflow
   - Check cleanup workflow logs
   - Verify retention settings are appropriate

### **Debugging Steps**

1. Check workflow logs in Actions tab
2. Verify secrets are properly configured
3. Test workflows manually with workflow_dispatch
4. Review artifact uploads/downloads
5. Monitor storage usage in repository settings

## 🔗 Related Documentation

- **🏗️ Architecture**: [Architecture Guide](../docs/ARCHITECTURE.md)
- **🛠️ Development**: [Development Guide](../docs/DEVELOPMENT.md)
- **🧪 Testing**: [Testing Guide](../docs/TESTING.md)
- **🔄 Retry Logic**: [Retry Configuration](../docs/RETRY_CONFIGURATION.md)
- **🔧 Troubleshooting**: [Troubleshooting Guide](../docs/TROUBLESHOOTING.md)

---

**💙 Automated with care for the ITCB Testing Team**

🚀 **CI/CD Pipeline Status**: [View Live Workflows](https://github.com/ITCB-2/ITCB-Testing/actions)
