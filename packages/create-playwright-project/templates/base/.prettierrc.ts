import type {Config} from 'prettier'

const config: Config = {
  // Basic formatting
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',

  // Indentation and spacing
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,

  // Arrays and objects
  trailingComma: 'all',
  bracketSpacing: false,
  bracketSameLine: true,

  // Functions
  arrowParens: 'avoid',

  // Line endings
  endOfLine: 'lf',

  // TypeScript specific
  parser: 'typescript',

  // File overrides for different file types
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
        trailingComma: 'none',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        printWidth: 100,
      },
    },
    {
      files: '*.yml',
      options: {
        parser: 'yaml',
        tabWidth: 2,
      },
    },
  ],
}

export default config
