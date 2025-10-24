#!/usr/bin/env node

/**
 * @netanelh2/create-workflows-package CLI
 * Scaffolds GitHub Actions workflows and code quality setup
 */

import {execSync} from 'node:child_process'
import {
	cpSync,
	existsSync,
	readFileSync,
	unlinkSync,
	writeFileSync,
} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import chalk from 'chalk'
import {Command} from 'commander'
import inquirer from 'inquirer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface WorkflowConfig {
	includeSanity: boolean
	includeRegression: boolean
	includeCodeQuality: boolean
	includeCleanup: boolean
	includeDeployReports: boolean
	includeSlackNotifications: boolean
	includeHusky: boolean
	installDependencies: boolean
	createCodeowners: boolean
	githubUsername?: string
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
	.action(async (options) => {
		console.log(chalk.blue.bold('🚀 Create Workflows Package'))
		console.log(
			chalk.gray('Setting up GitHub Actions workflows and code quality...\n'),
		)

		const config = await getWorkflowConfig(options)
		await setupWorkflows(config)
	})

async function getWorkflowConfig(options: CliOptions): Promise<WorkflowConfig> {
	if (options.yes) {
		return {
			includeSanity: true,
			includeRegression: true,
			includeCodeQuality: true,
			includeCleanup: true,
			includeDeployReports: true,
			includeSlackNotifications: false,
			includeHusky: true,
			installDependencies: !options.noInstall,
			createCodeowners: false,
		}
	}

	const answers = await inquirer.prompt([
		{
			type: 'checkbox',
			name: 'workflows',
			message: 'Which GitHub Actions workflows would you like to include?',
			choices: [
				{
					name: 'Sanity Tests (runs every 2 hours)',
					value: 'sanity',
					checked: false,
				},
				{
					name: 'Regression Tests',
					value: 'regression',
					checked: false,
				},
				{
					name: 'Code Quality (linting, formatting)',
					value: 'codeQuality',
					checked: false,
				},
				{
					name: 'Artifact Cleanup (storage management)',
					value: 'cleanup',
					checked: false,
				},
				{
					name: 'Deploy Reports (GitHub Pages)',
					value: 'deployReports',
					checked: false,
				},
				{name: 'Slack Notifications', value: 'slack', checked: false},
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
			name: 'createCodeowners',
			message: 'Create a CODEOWNERS file for code ownership?',
			default: false,
		},
		{
			type: 'input',
			name: 'githubUsername',
			message: 'Your GitHub username for CODEOWNERS:',
			when: (answers: unknown) =>
				(answers as Record<string, unknown>).createCodeowners as boolean,
			validate: (input: string): string | boolean => {
				if (!input.trim()) return 'GitHub username is required'
				if (
					!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(input)
				) {
					return 'Please enter a valid GitHub username'
				}
				return true
			},
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
		includeHusky: answers.includeHusky,
		installDependencies: options.noInstall
			? false
			: (answers.installDependencies ?? true),
		createCodeowners: answers.createCodeowners,
		githubUsername: answers.githubUsername,
	}
}

async function setupWorkflows(config: WorkflowConfig): Promise<void> {
	const templatesPath = join(__dirname, '..', '..', 'templates')

	// Copy .github workflows
	if (
		config.includeSanity ||
		config.includeRegression ||
		config.includeCodeQuality ||
		config.includeCleanup ||
		config.includeDeployReports ||
		config.includeSlackNotifications
	) {
		console.log(chalk.yellow('📋 Setting up GitHub Actions workflows...'))

		const githubPath = join(templatesPath, '.github')
		if (existsSync(githubPath)) {
			cpSync(githubPath, '.github', {recursive: true, force: true})
		}

		// Remove unwanted core workflows
		const workflowsDir = '.github/workflows'
		if (
			!config.includeCodeQuality &&
			existsSync(join(workflowsDir, 'core-code-quality.yml'))
		) {
			unlinkSync(join(workflowsDir, 'core-code-quality.yml'))
		}
		if (
			!config.includeCleanup &&
			existsSync(join(workflowsDir, 'core-cleanup-artifacts.yml'))
		) {
			unlinkSync(join(workflowsDir, 'core-cleanup-artifacts.yml'))
		}
		if (
			!config.includeSanity &&
			!config.includeRegression &&
			existsSync(join(workflowsDir, 'core-test-runner.yml'))
		) {
			unlinkSync(join(workflowsDir, 'core-test-runner.yml'))
		}

		// Remove unwanted test workflows
		if (
			!config.includeSanity &&
			existsSync(join(workflowsDir, 'tests-sanity.yml'))
		) {
			unlinkSync(join(workflowsDir, 'tests-sanity.yml'))
		}

		// Remove unwanted deployment workflows
		if (
			!config.includeDeployReports &&
			existsSync(join(workflowsDir, 'deployment-deploy-reports.yml'))
		) {
			unlinkSync(join(workflowsDir, 'deployment-deploy-reports.yml'))
		}
		if (
			!config.includeSlackNotifications &&
			existsSync(join(workflowsDir, 'deployment-slack-notifications.yml'))
		) {
			unlinkSync(join(workflowsDir, 'deployment-slack-notifications.yml'))
		}
	} // Copy .husky
	if (config.includeHusky) {
		console.log(chalk.yellow('🔧 Setting up Husky git hooks...'))
		const huskyPath = join(templatesPath, '.husky')
		if (existsSync(huskyPath)) {
			cpSync(huskyPath, '.husky', {recursive: true, force: true})
		}
	}

	// Create CODEOWNERS file
	if (config.createCodeowners && config.githubUsername) {
		console.log(chalk.yellow('👥 Creating CODEOWNERS file...'))
		const codeownersPath = '.github/CODEOWNERS'
		const codeownersContent = `# Global code ownership

# This file defines code owners for the repository

# Code owners are automatically requested for review when someone opens a pull request that modifies code that they own

# Make @${config.githubUsername} the owner of all files in the repository

* @${config.githubUsername}
`
		// Ensure .github directory exists
		const githubDir = '.github'
		if (!existsSync(githubDir)) {
			execSync(`mkdir -p ${githubDir}`)
		}

		writeFileSync(codeownersPath, codeownersContent)
	}

	// Update package.json
	console.log(chalk.yellow('📦 Updating package.json...'))
	const packageJsonPath = 'package.json'
	if (existsSync(packageJsonPath)) {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

		// Add scripts
		if (!packageJson.scripts) packageJson.scripts = {}

		if (config.includeCodeQuality) {
			packageJson.scripts.check = 'npx @biomejs/biome check --write && npx tsc'
			packageJson.scripts['type-check'] = 'tsc --noEmit'
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
			deps.push('@biomejs/biome')
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
		chalk.gray(
			'   - BASE_URL: Your application URL (e.g., https://your-app.com)',
		),
	)
	if (config.includeSlackNotifications) {
		console.log(chalk.gray('   - SLACK_WEBHOOK_URL: For Slack notifications'))
	}
	console.log(
		chalk.gray(
			'6. For branch protection (recommended): Go to Settings > Rules > Rulesets',
		),
	)
	console.log(chalk.gray('   - Click "New ruleset" > "New branch ruleset"'))
	console.log(chalk.gray('   - Name: "Main Branch Protection" (or similar)'))
	console.log(
		chalk.gray(
			'   - Target branches: Select "Default branch" or specify "main"',
		),
	)
	console.log(chalk.gray('   - Enforcement status: Active'))
	console.log(chalk.gray('   - Rules to enable:'))
	console.log(chalk.gray('     ✓ Restrict deletions'))
	console.log(chalk.gray('     ✓ Require a pull request before merging'))
	console.log(chalk.gray('       - Required approvals: 1'))
	console.log(chalk.gray('       - Dismiss stale reviews on push: Enabled'))
	console.log(chalk.gray('       - Require review from Code Owners: Enabled'))
	console.log(chalk.gray('       - Require conversation resolution: Enabled'))
	console.log(chalk.gray('     ✓ Require status checks to pass'))
	console.log(chalk.gray('       - Require branches to be up to date: Enabled'))
	console.log(
		chalk.gray(
			'       - Add status check: "code-quality" (from Code Quality Check workflow)',
		),
	)
	console.log(chalk.gray('     ✓ Block force pushes'))

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
