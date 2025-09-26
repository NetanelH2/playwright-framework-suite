#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from "fs";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ProjectConfig {
  projectName: string;
  useGit: boolean;
  includeSampleTests: boolean;
  installDependencies: boolean;
}

const program = new Command();

program
  .name("@netanelh2/create-playwright-project")
  .description("Create a new Playwright TypeScript project with the framework")
  .version("1.0.0");

program
  .argument("[project-name]", "name of the project")
  .option("-y, --yes", "skip prompts and use defaults")
  .option("--no-install", "skip dependency installation")
  .option("--no-git", "skip git initialization")
  .action(async (projectName: string | undefined, options) => {
    console.log(chalk.blue.bold("🎭 Create Playwright Project"));
    console.log(
      chalk.gray("Scaffolding a new Playwright TypeScript project...\n"),
    );

    const config = await getProjectConfig(projectName, options);
    await createProject(config);
  });

async function getProjectConfig(
  projectName: string | undefined,
  options: any,
): Promise<ProjectConfig> {
  if (options.yes && projectName) {
    return {
      projectName,
      useGit: !options.noGit,
      includeSampleTests: true,
      installDependencies: !options.noInstall,
    };
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: projectName || "my-playwright-project",
      validate: (input: string) => {
        if (!input.trim()) return "Project name is required";
        if (!/^[a-z0-9-_]+$/i.test(input)) {
          return "Project name can only contain letters, numbers, hyphens, and underscores";
        }
        return true;
      },
    },
    {
      type: "confirm",
      name: "useGit",
      message: "Initialize git repository?",
      default: true,
      when: () => !options.noGit,
    },
    {
      type: "confirm",
      name: "includeSampleTests",
      message: "Include sample tests and pages?",
      default: true,
    },
    {
      type: "confirm",
      name: "installDependencies",
      message: "Install dependencies?",
      default: true,
      when: () => !options.noInstall,
    },
  ]);

  return {
    useGit: options.noGit ? false : (answers.useGit ?? true),
    installDependencies: options.noInstall
      ? false
      : (answers.installDependencies ?? true),
    ...answers,
  };
}

async function createProject(config: ProjectConfig): Promise<void> {
  const { projectName, useGit, includeSampleTests, installDependencies } =
    config;
  const projectPath = join(process.cwd(), projectName);

  // Check if directory already exists
  if (existsSync(projectPath)) {
    console.log(chalk.red(`❌ Directory ${projectName} already exists!`));
    process.exit(1);
  }

  console.log(chalk.yellow(`📁 Creating project directory: ${projectName}`));
  mkdirSync(projectPath, { recursive: true });

  // Copy template files
  const templatesPath = join(__dirname, "..", "templates");

  console.log(chalk.yellow("📋 Copying template files..."));

  // Copy base template
  if (existsSync(join(templatesPath, "base"))) {
    cpSync(join(templatesPath, "base"), projectPath, { recursive: true });
  }

  if (includeSampleTests && existsSync(join(templatesPath, "with-examples"))) {
    console.log(chalk.yellow("📝 Adding sample tests..."));
    cpSync(join(templatesPath, "with-examples"), projectPath, {
      recursive: true,
    });
  }

  // Update package.json
  console.log(chalk.yellow("📦 Configuring package.json..."));
  const packageJsonPath = join(projectPath, "package.json");
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = projectName;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Initialize git
  if (useGit) {
    console.log(chalk.yellow("🔧 Initializing git repository..."));
    try {
      execSync("git init", { cwd: projectPath, stdio: "ignore" });
      execSync("git add .", { cwd: projectPath, stdio: "ignore" });
      execSync('git commit -m "Initial commit"', {
        cwd: projectPath,
        stdio: "ignore",
      });
    } catch (error) {
      console.log(
        chalk.yellow(
          "⚠️  Git initialization failed, but project was created successfully",
        ),
      );
    }
  }

  // Install dependencies
  if (installDependencies) {
    console.log(chalk.yellow("📦 Installing dependencies..."));
    try {
      execSync("npm install", { cwd: projectPath, stdio: "inherit" });
      console.log(chalk.yellow("🎭 Installing Playwright browsers..."));
      execSync("npx playwright install", {
        cwd: projectPath,
        stdio: "inherit",
      });
    } catch (error) {
      console.log(
        chalk.yellow(
          '⚠️  Dependency installation failed. Run "npm install" manually.',
        ),
      );
    }
  }

  // Success message
  console.log(chalk.green.bold("\n✅ Project created successfully!"));
  console.log(chalk.white("\nNext steps:"));
  console.log(chalk.gray(`  cd ${projectName}`));

  if (!installDependencies) {
    console.log(chalk.gray("  npm install"));
    console.log(chalk.gray("  npx playwright install"));
  }

  console.log(chalk.gray("  npm test"));
  console.log(chalk.white("\nHappy testing! 🎭"));
}

program.parse();
