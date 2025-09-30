const config = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",

  // Indentation and spacing
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,

  // Arrays and objects
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,

  // Functions
  arrowParens: "avoid",

  // Line endings
  endOfLine: "lf",

  // TypeScript specific
  parser: "typescript",

  // File overrides for different file types
  overrides: [
    {
      files: "*.json",
      options: {
        parser: "json",
        trailingComma: "none",
      },
    },
    {
      files: "*.md",
      options: {
        parser: "markdown",
        printWidth: 100,
      },
    },
    {
      files: "*.yml",
      options: {
        parser: "yaml",
        tabWidth: 2,
      },
    },
  ],
};

export default config;
