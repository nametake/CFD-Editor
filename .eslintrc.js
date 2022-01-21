const rules = {
  'no-console': ['error'],
  'no-restricted-imports': [
    'error',
    {
      patterns: ['../*'],
    },
  ],
  'sort-imports': [
    'error',
    {
      ignoreDeclarationSort: true,
    },
  ],
  'import/prefer-default-export': 'off',
  'import/no-default-export': 'error',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      pathGroups: [
        {
          pattern: 'react**',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'parent',
        },
      ],
      'newlines-between': 'always',
      pathGroupsExcludedImportTypes: ['react'],
    },
  ],
  'react/prop-types': 'off',
  'react/require-default-props': 'off',
  'react-hooks/exhaustive-deps': [
    'error',
    {
      additionalHooks:
        '^use(Async|AsyncFn|AsyncRetry|Debounce|UpdateEffect|IsomorphicLayoutEffect|DeepCompareEffect|ShallowCompareEffect|IpcRecieve)$',
    },
  ],
  '@typescript-eslint/no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'error',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],
};

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:storybook/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  rules,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    'import/core-modules': ['electron'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:eslint-comments/recommended',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'prettier', // Must be last
      ],
      plugins: ['@typescript-eslint', 'unused-imports'],
      rules,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      settings: {
        'import/resolver': {
          webpack: {
            config: './webpack.renderer.config.js',
          },
        },
      },
    },
    {
      files: ['*.test.{js,jsx,ts,tsx}'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
};
