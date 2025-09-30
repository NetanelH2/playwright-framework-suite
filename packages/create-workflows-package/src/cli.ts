#!/usr/bin/env node
/* eslint-disable no-console */

import chalk from 'chalk'
import {execSync} from 'child_process'
import {Command} from 'commander'
import {cpSync, existsSync, readFileSync, unlinkSync, writeFileSync} from 'fs'
import inquirer from 'inquirer'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface WorkflowConfig {
  includeSanity: boolean
  includeRegression: boolean
  includeCodeQuality: boolean
  includeCleanup: boolean
  includeDeployReports: boolean
  includeSlackNotifications: boolean
  includeNightlyRegression: boolean
  includeHusky: boolean
  installDependencies: boolean
}

interface CliOptions {
  yes?: boolean
  noInstall?: boolean
}

const program = new Command()

program
  .name('@netanelh2/create-workflows-package')
  .description(
    'Add GitHub Actions workflows and code quality setup with Husky to your project',
  )
  .version('1.0.0')

program
  .option('-y, --yes', 'skip prompts and use defaults')
  .option('--no-install', 'skip dependency installation')
  .action(async options => {
    console.log(chalk.blue.bold('🚀 Create Workflows Package'))
    console.log(
      chalk.gray('Setting up GitHub Actions workflows and code quality...\n'),
    )

    const config = await getWorkflowConfig(options)
    await setupWorkflows(config, options.noInstall || false)
  })

async function getWorkflowConfig(options: CliOptions): Promise<WorkflowConfig> {
  if (options.yes) {
    return {
      includeSanity: true,
      includeRegression: true,
      includeCodeQuality: true,
      includeCleanup: true,
      includeDeployReports: true,
      includeSlackNotifications: true,
      includeNightlyRegression: true,
      includeHusky: true,
      installDependencies: !options.noInstall,
    }
  }

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'workflows',
      message: 'Which GitHub Actions workflows would you like to include?',
      choices: [
        {name: 'Sanity Tests', value: 'sanity', checked: true},
        {name: 'Regression Tests', value: 'regression', checked: true},
        {
          name: 'Code Quality (linting, formatting)',
          value: 'codeQuality',
          checked: true,
        },
        {name: 'Cleanup Artifacts', value: 'cleanup', checked: true},
        {name: 'Deploy Reports', value: 'deployReports', checked: true},
        {name: 'Slack Notifications', value: 'slack', checked: false},
        {name: 'Nightly Regression', value: 'nightly', checked: false},
      ],
    },
    {
      type: 'confirm',
      name: 'includeHusky',
      message: 'Include Husky for git hooks?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'installDependencies',
      message: 'Install required dependencies?',
      default: true,
      when: (): boolean => !options.noInstall,
    },
  ])

  return {
    includeSanity: answers.workflows.includes('sanity'),
    includeRegression: answers.workflows.includes('regression'),
    includeCodeQuality: answers.workflows.includes('codeQuality'),
    includeCleanup: answers.workflows.includes('cleanup'),
    includeDeployReports: answers.workflows.includes('deployReports'),
    includeSlackNotifications: answers.workflows.includes('slack'),
    includeNightlyRegression: answers.workflows.includes('nightly'),
    includeHusky: answers.includeHusky,
    installDependencies: options.noInstall
      ? false
      : (answers.installDependencies ?? true),
  }
}

async function setupWorkflows(
  config: WorkflowConfig,
  noInstall: boolean,
): Promise<void> {
  const templatesPath = join(__dirname, '..', '..', 'templates')

  // Copy .github workflows
  if (
    config.includeSanity ||
    config.includeRegression ||
    config.includeCodeQuality ||
    config.includeCleanup ||
    config.includeDeployReports ||
    config.includeSlackNotifications ||
    config.includeNightlyRegression
  ) {
    console.log(chalk.yellow('📋 Setting up GitHub Actions workflows...'))

    const githubPath = join(templatesPath, '.github')
    if (existsSync(githubPath)) {
      cpSync(githubPath, '.github', {recursive: true, force: true})
    }

    // Remove unwanted workflows
    const workflowsDir = '.github/workflows'
    if (!config.includeSanity && existsSync(join(workflowsDir, 'sanity.yml'))) {
      unlinkSync(join(workflowsDir, 'sanity.yml'))
    }
    if (
      !config.includeRegression &&
      existsSync(join(workflowsDir, 'nightly-regression.yml'))
    ) {
      unlinkSync(join(workflowsDir, 'nightly-regression.yml'))
    }
    if (
      !config.includeCodeQuality &&
      existsSync(join(workflowsDir, 'code-quality.yml'))
    ) {
      unlinkSync(join(workflowsDir, 'code-quality.yml'))
    }
    if (
      !config.includeCleanup &&
      existsSync(join(workflowsDir, 'cleanup-artifacts.yml'))
    ) {
      unlinkSync(join(workflowsDir, 'cleanup-artifacts.yml'))
    }
    if (
      !config.includeDeployReports &&
      existsSync(join(workflowsDir, 'deploy-reports.yml'))
    ) {
      unlinkSync(join(workflowsDir, 'deploy-reports.yml'))
    }
    if (
      !config.includeSlackNotifications &&
      existsSync(join(workflowsDir, 'slack-notifications.yml'))
    ) {
      unlinkSync(join(workflowsDir, 'slack-notifications.yml'))
    }
    if (
      !config.includeNightlyRegression &&
      existsSync(join(workflowsDir, 'nightly-regression.yml'))
    ) {
      unlinkSync(join(workflowsDir, 'nightly-regression.yml'))
    }
  }

  // Copy .husky
  if (config.includeHusky) {
    console.log(chalk.yellow('🔧 Setting up Husky git hooks...'))
    const huskyPath = join(templatesPath, '.husky')
    if (existsSync(huskyPath)) {
      cpSync(huskyPath, '.husky', {recursive: true, force: true})
    }
  }

  // Update package.json
  console.log(chalk.yellow('📦 Updating package.json...'))
  const packageJsonPath = 'package.json'
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

    // Add scripts
    if (!packageJson.scripts) packageJson.scripts = {}

    if (config.includeCodeQuality) {
      packageJson.scripts['lint:check'] =
        'eslint src/**/*.ts --max-warnings 0 --no-warn-ignored'
      packageJson.scripts['format:check'] = 'prettier --check src/**/*.ts'
      packageJson.scripts.check =
        'npm run lint:check && npm run format:check && npx tsc'
      packageJson.scripts.fix =
        'prettier --write src/**/*.ts && eslint src/**/*.ts --fix --no-warn-ignored'
    }

    if (config.includeHusky) {
      packageJson.scripts['pre-commit'] = 'lint-staged'
      packageJson.scripts.prepare = 'husky'
    }

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  }

  // Install dependencies
  if (config.installDependencies) {
    console.log(chalk.yellow('📦 Installing dependencies...'))
    const deps = []

    if (config.includeCodeQuality) {
      deps.push(
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'prettier',
      )
    }

    if (config.includeHusky) {
      deps.push('husky', 'lint-staged')
    }

    if (deps.length > 0) {
      try {
        execSync(`npm install --save-dev ${deps.join(' ')}`, {stdio: 'inherit'})
      } catch {
        console.log(
          chalk.yellow('⚠️  Dependency installation failed. Install manually.'),
        )
      }
    }

    if (config.includeHusky) {
      try {
        execSync('npm run prepare', {stdio: 'inherit'})
      } catch {
        console.log(
          chalk.yellow(
            '⚠️  Husky setup failed. Run "npm run prepare" manually.',
          ),
        )
      }
    }
  }

  // Guide for GitHub Actions
  console.log(chalk.green.bold('\n✅ Setup completed!'))
  console.log(chalk.white('\nTo make GitHub Actions work:'))
  console.log(chalk.gray('1. Ensure your repository is on GitHub'))
  console.log(chalk.gray('2. Go to repository Settings > Actions > General'))
  console.log(
    chalk.gray(
      '3. Under "Workflow permissions", select "Read and write permissions"',
    ),
  )
  console.log(
    chalk.gray(
      '4. For report deployment, go to Settings > Pages and set Source to "GitHub Actions"',
    ),
  )
  console.log(
    chalk.gray(
      '5. Add required repository secrets (Settings > Secrets and variables > Actions):',
    ),
  )
  console.log(
    chalk.gray('   - BASE_URL: Your application URL (e.g., https://your-app.com)'),
  )
  if (config.includeSlackNotifications) {
    console.log(
      chalk.gray('   - SLACK_WEBHOOK_URL: For Slack notifications'),
    )
  }
  console.log(
    chalk.gray(
      '6. For branch protection (recommended): Go to Settings > Branches and require "Code Quality Check"',
    ),
  )
  console.log(
    chalk.gray(
      '7. Ensure your package.json has the correct test scripts (npm run test:sanity, npm run test:regression, npm run check)',
    ),
  )

  console.log(chalk.white('\nNext steps:'))
  if (!config.installDependencies) {
    console.log(chalk.gray('  npm install'))
  }
  console.log(chalk.gray('  git add .'))
  console.log(
    chalk.gray('  git commit -m "Add workflows and code quality setup"'),
  )
  console.log(chalk.gray('  git push'))

  console.log(chalk.white('\nHappy coding! 🚀'))
}

program.parse()
