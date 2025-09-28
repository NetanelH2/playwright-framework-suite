#!/usr/bin/env node
/* eslint-disable no-console */

import chalk from 'chalk'
import {execSync} from 'child_process'
import {Command} from 'commander'
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs'
import inquirer from 'inquirer'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Files that are safe to overwrite or coexist with
const SAFE_FILES = new Set([
  '.git',
  '.gitignore',
  'README.md',
  'README.txt',
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
  '.DS_Store',
  'Thumbs.db',
])

function isDirSafeToScaffold(dirPath: string): boolean {
  if (!existsSync(dirPath)) {
    return true
  }

  try {
    const files = readdirSync(dirPath)
    // Directory is safe if it's empty or only contains safe files
    return files.every((file) => SAFE_FILES.has(file))
  } catch {
    return false
  }
}

function getDirContents(dirPath: string): string[] {
  try {
    return existsSync(dirPath) ? readdirSync(dirPath) : []
  } catch {
    return []
  }
}

interface ProjectConfig {
  projectName: string
  useGit: boolean
  includeSampleTests: boolean
  installDependencies: boolean
}

interface CliOptions {
  yes?: boolean
  noInstall?: boolean
  noGit?: boolean
  force?: boolean
}

const program = new Command()

program
  .name('@netanelh2/create-playwright-project')
  .description('Create a new Playwright TypeScript project with the framework')
  .version('2.3.1')

program
  .argument('[project-name]', 'name of the project')
  .option('-y, --yes', 'skip prompts and use defaults')
  .option('--no-install', 'skip dependency installation')
  .option('--no-git', 'skip git initialization')
  .option('-f, --force', 'force scaffolding into existing directory')
  .action(async (projectName: string | undefined, options) => {
    console.log(chalk.blue.bold('🎭 Create Playwright Project'))
    console.log(
      chalk.gray('Scaffolding a new Playwright TypeScript project...\n'),
    )

    const config = await getProjectConfig(projectName, options)
    await createProject(config, options.force || false)
  })

async function getProjectConfig(
  projectName: string | undefined,
  options: CliOptions,
): Promise<ProjectConfig> {
  if (options.yes && projectName) {
    return {
      projectName,
      useGit: !options.noGit,
      includeSampleTests: true,
      installDependencies: !options.noInstall,
    }
  }

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: projectName || 'my-playwright-project',
      validate: (input: string) => {
        if (!input.trim()) return 'Project name is required'
        if (!/^[a-z0-9-_]+$/i.test(input)) {
          return 'Project name can only contain letters, numbers, hyphens, and underscores'
        }
        return true
      },
    },
    {
      type: 'confirm',
      name: 'useGit',
      message: 'Initialize git repository?',
      default: true,
      when: () => !options.noGit,
    },
    {
      type: 'confirm',
      name: 'includeSampleTests',
      message: 'Include sample tests and pages?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'installDependencies',
      message: 'Install dependencies?',
      default: true,
      when: () => !options.noInstall,
    },
  ])

  return {
    useGit: options.noGit ? false : (answers.useGit ?? true),
    installDependencies: options.noInstall
      ? false
      : (answers.installDependencies ?? true),
    ...answers,
  }
}

async function createProject(
  config: ProjectConfig,
  force: boolean = false,
): Promise<void> {
  const {projectName, useGit, includeSampleTests, installDependencies} = config
  const projectPath = join(process.cwd(), projectName)

  // Check if directory already exists
  if (existsSync(projectPath)) {
    const isDirectorySafe = isDirSafeToScaffold(projectPath)
    const dirContents = getDirContents(projectPath)

    if (!force && !isDirectorySafe) {
      console.log(chalk.red(`❌ Directory ${projectName} already exists!`))
      console.log(chalk.yellow('Contents:'), dirContents.join(', '))
      console.log(
        chalk.gray(
          'Use --force to scaffold into this directory anyway, or choose a different name.',
        ),
      )
      process.exit(1)
    }

    if (!force && isDirectorySafe) {
      const {shouldProceed} = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldProceed',
          message: `Directory ${projectName} exists but appears safe to scaffold into. Continue?`,
          default: false,
        },
      ])

      if (!shouldProceed) {
        console.log(chalk.yellow('Operation cancelled.'))
        process.exit(0)
      }
    }

    if (force || isDirectorySafe) {
      console.log(chalk.yellow(`📁 Using existing directory: ${projectName}`))
    }
  } else {
    console.log(chalk.yellow(`📁 Creating project directory: ${projectName}`))
    mkdirSync(projectPath, {recursive: true})
  }

  // Copy template files
  const templatesPath = join(__dirname, '..', 'templates')

  console.log(chalk.yellow('📋 Copying template files...'))

  // Copy base template
  if (existsSync(join(templatesPath, 'base'))) {
    cpSync(join(templatesPath, 'base'), projectPath, {recursive: true})
  }

  if (includeSampleTests && existsSync(join(templatesPath, 'with-examples'))) {
    console.log(chalk.yellow('📝 Adding sample tests...'))
    cpSync(join(templatesPath, 'with-examples'), projectPath, {
      recursive: true,
    })
  }

  // Update package.json
  console.log(chalk.yellow('📦 Configuring package.json...'))
  const packageJsonPath = join(projectPath, 'package.json')
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    packageJson.name = projectName
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  }

  // Initialize git
  if (useGit) {
    console.log(chalk.yellow('🔧 Initializing git repository...'))
    try {
      execSync('git init', {cwd: projectPath, stdio: 'ignore'})
      execSync('git add .', {cwd: projectPath, stdio: 'ignore'})
      execSync('git commit -m "Initial commit"', {
        cwd: projectPath,
        stdio: 'ignore',
      })
    } catch (error) {
      console.log(
        chalk.yellow(
          '⚠️  Git initialization failed, but project was created successfully',
        ),
      )
    }
  }

  // Install dependencies
  if (installDependencies) {
    console.log(chalk.yellow('📦 Installing dependencies...'))
    try {
      execSync('npm install', {cwd: projectPath, stdio: 'inherit'})
      console.log(chalk.yellow('🎭 Installing Playwright browsers...'))
      execSync('npx playwright install', {
        cwd: projectPath,
        stdio: 'inherit',
      })
    } catch (error) {
      console.log(
        chalk.yellow(
          '⚠️  Dependency installation failed. Run "npm install" manually.',
        ),
      )
    }
  }

  // Success message
  console.log(chalk.green.bold('\n✅ Project created successfully!'))
  console.log(chalk.white('\nNext steps:'))
  console.log(chalk.gray(`  cd ${projectName}`))

  if (!installDependencies) {
    console.log(chalk.gray('  npm install'))
    console.log(chalk.gray('  npx playwright install'))
  }

  console.log(chalk.gray('  npm test'))
  console.log(chalk.white('\nHappy testing! 🎭'))
}

program.parse()
